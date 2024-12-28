import React, { useState } from "react";
import styles from "./Settings.module.css";
import { update } from "../../services";
import username_img from '../../assets/username_img.png';
import view_img from '../../assets/view_img.png';
import logout from '../../assets/logout.png';
import lock from '../../assets/lock.png';

export default function Settings() {
  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { username,email, oldPassword, newPassword } = updateFormData;

    // Basic frontend validation
    if (!email || !oldPassword || !newPassword) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    try {
      const res = await update(updateFormData);

      if (res.status === 200) {
        setSuccess("Password updated successfully!");
        setError("");
        setUpdateFormData({
          username:"",
          email: "",
          oldPassword: "",
          newPassword: "",
        });
      } else {
        setError("Incorrect old email or password.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className={styles.header}>
      <p className={styles.headline}>Settings</p>
      <div className={styles.form}>
        <form onSubmit={handleUpdate}>
          <div className={styles.formText}>
            <img src={username_img} className={styles.username}/>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={updateFormData.username}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, username: e.target.value })
              }
            />
          </div>

          <div className={styles.formText}>
          <img src={lock} className={styles.lock}/>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updateFormData.email}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, email: e.target.value })
              }
            />
            <img src={view_img} className={styles.view}/>
          </div>

          <div className={styles.formPassword}>
          <img src={lock} className={styles.lock}/>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={updateFormData.oldPassword}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, oldPassword: e.target.value })
              }
            />
            <img src={view_img} className={styles.view}/>
          </div>

          <div className={styles.formPassword}>
          <img src={lock} className={styles.lock}/>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={updateFormData.newPassword}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, newPassword: e.target.value })
              }
            />
            <img src={view_img} className={styles.view}/>
          </div>

          <button type="submit" className={styles.updateButton}>
            Update
          </button>
        </form>

        {/* Display error or success messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </div>
      <a href="/home" className={styles.logouttext}><img src={logout} className={styles.logout}/>
      Log out</a>
    </div>
  );
}
