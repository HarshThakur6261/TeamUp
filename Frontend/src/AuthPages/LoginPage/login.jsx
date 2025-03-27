import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { handleError, handleSucess } from "../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercontext from "../../Context/Usercontext";
import SocketContext from "../../Context/SocketContext";
import axios from "axios";

function Login() {
  const { SetloggedIn } = useContext(SocketContext);
  const { SetUserinfo } = useContext(Usercontext);
  const [logininfo, Setlogininfo] = useState({
    email: "",
    password: "",
  });

  const FetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/home/userdata/${logininfo.email}`);
      SetUserinfo(response.data.userdata);
    } catch (error) {
      console.log("error in fetching user details");
    }
  };

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    Setlogininfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    if (!email || !password) {
      handleError("Email and password required");
      return;
    }
    try {
      const URL = "http://localhost:3000/auth/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });
      const result = await response.json();
      const { success, error, message, jwt_token } = result;
      if (success) {
        sessionStorage.setItem("token", jwt_token);
        FetchUserDetails();
        try {
          SetloggedIn(true);
        } catch (error) {
          console.error("Error in SetloggedIn:", error);
        }
        handleSucess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(error ? error.details[0].message : message);
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
        <div className={styles.mainContent}>
          <div className={styles.backgroundEffects}>
            <div className={styles.purpleGlow}></div>
            <div className={styles.tealGlow}></div>
          </div>
          
          <div className={styles.contentWrapper}>
          <div className={styles.logoContainer}>
  <h2 className={styles.logoText}>TeamUp</h2>
</div>
            
            <div className={styles.formContainer}>
              <h1 className={styles.formTitle}>Welcome back</h1>
              <p className={styles.formSubtitle}>Enter your credentials to access your account.</p>
              
              <form onSubmit={handlesubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email address</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={logininfo.email}
                  onChange={handlechange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={logininfo.password}
                  onChange={handlechange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className={styles.options}>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
              
              <button type="submit" className={styles.loginButton}>
                Sign In
              </button>
            </form>
              
              <div className={styles.signupPrompt}>
                Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;