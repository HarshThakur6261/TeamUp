import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { handleError, handleSucess } from "../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercontext from "../../Context/Usercontext";
import SocketContext from "../../Context/SocketContext";

function Signup() {
  const { Userinfo, SetUserinfo } = useContext(Usercontext);
  const navigate = useNavigate();
  const { SetloggedIn } = useContext(SocketContext);
  
  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...Userinfo };
    copyinfo[name] = value;
    SetUserinfo(copyinfo);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = Userinfo;

    if (!name || !email || !password) {
      handleError("Name, email, and password are required.");
      return;
    }

    try {
      const URL = "http://localhost:3000/auth/signup";
      const body = { name, email, password };
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      const { success, error, message, jwt_token } = result;

      if (success) {
        SetloggedIn(true);
        sessionStorage.setItem("token", jwt_token);
        handleSucess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        SetUserinfo({ name, email, password });
      } else if (error) {
        const details = error.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel with Video */}
      {/* <div className={styles.leftPanel}>
        <div className={styles.videoContainer}>
          <img src="/assets/loginbg.webp" className={styles.video} alt="" />
        </div>
      </div> */}

      {/* Right Panel with Form */}
      <div className={styles.rightPanel}>
      <div className={styles.mainContent} style={{ height: 'auto', minHeight: '100vh' }}>
          <div className={styles.backgroundEffects}>
            <div className={styles.purpleGlow}></div>
            <div className={styles.tealGlow}></div>
          </div>
          
          <div className={styles.contentWrapper}>
            <div className={styles.logoContainer}>
              <h2 className={styles.logoText}>TeamUp</h2>
            </div>
            
            <div className={styles.formContainer}>
              <h1 className={styles.formTitle}>Create your account</h1>
              <p className={styles.formSubtitle}>Join us to get started</p>
              
              <form onSubmit={handlesubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    id="name"
                    className={styles.input}
                    onChange={handlechange}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    id="email"
                    className={styles.input}
                    onChange={handlechange}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Password</label>
                  <input
                    id="password"
                    className={styles.input}
                    onChange={handlechange}
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
                
                <button type="submit" className={styles.loginButton}>
                  Sign Up
                </button>
                
                <div className={styles.divider}>or</div>
                
                <div className={styles.googlediv}>
                  <a className={styles.googleButton} href="http://localhost:3000/google/auth/signup">
                    <img className={styles.googleIcon} src="/assets/googles.png" alt="Google logo" /> 
                    Sign up with Google
                  </a>
                </div>
                
                <div className={styles.signupPrompt}>
                  Already have an account? <Link to="/login" className={styles.signupLink}>Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;