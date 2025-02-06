import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ViewProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";

function ViewProfile() {
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [userdata, setuserdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/home/userdata/${userEmail}`
        );
        setuserdata(response.data.userdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchuserdata();
  }, [userEmail]);

  const skillColors = [
    { bg: "#FEE2E2", text: "#991B1B" }, // Light Yellow & Dark Brown
    { bg: "#FFEDD5", text: "#9A3412" }, // Light Blue & Dark Blue
    { bg: "#FEF9C3", text: "#1B5E20" }, // Light Green & Dark Green
    { bg: "#DCFCE7", text: "#166534" }, // Light Red & Dark Red
    { bg: "#DBEAFE", text: "#1E40AF" }, // Light Purple & Dark Purple
    { bg: "#E0E7FF", text: "#3730A3" }, // Light Orange & Dark Orange
    { bg: "#F3E8FF", text: "#6B21A8" }, // Sky Blue & Dark Blue
    { bg: "#FCE7F3", text: "#9D174D" }, // Light Lime & Dark Olive
    { bg: "#F3F4F6", text: "#1F2937" }, // Light Pink & Dark Pink
    { bg: "#CCFBF1", text: "#115E59" }  // Light Peach & Dark Brown
  ];

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading Profile...</p>
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <div className={styles.profileImg} onClick={openModal}>
            {userdata.profilePicture ? (
              <img
                src={userdata.profilePicture}
                alt="Profile"
                style={{ cursor: "pointer" }}
              />
            ) : (
              <img
              src="/assets/uploadpic .png"
                alt="Upload"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          {/* Modal for displaying the profile picture */}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img
                  src={userdata.profilePicture || "/assets/uploadpic .png"}
                  alt="Profile"
                  className={styles.modalImage}
                />
                <button className={styles.closeButton} onClick={closeModal}>
                  &times;
                </button>
              </div>
            </div>
          )}

          <p className={styles.name}>{userdata.name || "Provide username"}</p>
          <div className={styles.studentInfo}>
            <div className={styles.info}>
              <p className={styles.college}>{userdata.college || "not mentioned"}</p>
              <p className={styles.GraduationYear}>{userdata.GraduationYear || "not mentioned"}</p>
              <p className={styles.degree}>{userdata.degree || "not mentioned"}</p>
            </div>
            <div className={styles.bio}>
              <p>Bio</p>
              {userdata.bio || "not mentioned"}
            </div>
            <div className={styles.skills}>
              <p>Skills</p>
              <div className={styles.skillsList}>
                {userdata.skills && userdata.skills.length > 0 ? (
                  userdata.skills.map((skill, index) => {
                    const colorPair = skillColors[index % skillColors.length]; // Cycle through colors
                    return (
                      <div
                        key={index}
                        className={styles.skillItem}
                        style={{ backgroundColor: colorPair.bg, color: colorPair.text }}
                      >
                        {skill}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.noSkills}>No skills mentioned</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.linkContainer}>
            <div className={styles.githubUrl}>
              <p> <FontAwesomeIcon icon={faSquareGithub} style={{ fontSize: '20px' }} />Github</p>
              <a
                className={styles.light}
                href={userdata.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userdata.githubProfile || "not mentioned"}
              </a>
            </div>
            <div className={styles.linkedinUrl}>
              <p> <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '20px' }} />LinkedIn</p>
              <a
                className={styles.light}
                href={userdata.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userdata.linkedinProfile || "not mentioned"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProfile;