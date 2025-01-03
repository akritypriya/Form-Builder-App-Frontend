import { register } from "../../services";
import { useState } from "react";
import styles from "./Register.module.css";
import arrow_back from "../../assets/arrow_back.png";
import down_ellipse from "../../assets/down_ellipse.png";
import Google_Icon from "../../assets/Google_Icon.svg";
import side_ellipse from "../../assets/side_ellipse.png";
import triangle from "../../assets/triangle.png";


export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submission to true

    const { username, email, password, confirmPassword } = formData;

    // Password match validation
    if (password !== confirmPassword) {
      setError("enter same password in both fields");

      return;
    }
    
    try {
      const res = await register(formData);

      if (res.status === 200) {
        alert("Registered successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }); 
     
        //setError("");
              
      
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className={styles.header}>
      <a href="/home">
        <img src={arrow_back} alt="back_button" className={styles.backButton} />
      </a>
      <div>
        <img src={triangle} alt="triangle" className={styles.triangle} />
        <img src={side_ellipse} alt="side_icon" className={styles.sideIcon} />
      </div>

      <div className={styles.form}>
        <form onSubmit={handleRegister}>
          <div className={styles.formText}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className={styles.formText}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.formPassword}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

       <div
        className={`${styles.formPassword} ${
          formSubmitted &&
          formData.password !== formData.confirmPassword
            ? styles.errorBorder
            : ''
        }`}
      >
        <label
          htmlFor="confirmPassword"
          className={`${
            formSubmitted &&
            formData.password !== formData.confirmPassword
              ? styles.errorLabel
              : ''
          }`}
        >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="**********"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            {formSubmitted && error && <p className={styles.error}>{error}</p>}
          </div>
          <button type="submit" className={styles.formButton1}> 
            Sign Up
          </button>
        </form>
        <p className={styles.textOR}>OR</p>

        <button type="button" className={styles.formButton2}>
          <img src={Google_Icon} alt="icon" className={styles.GoogleIcon} />
          Sign Up with Google
        </button>

        <p className={styles.text}>
          Already have an account?
          <a href="/login" className={styles.link}>
            Login
          </a>
        </p>

        <img src={down_ellipse} alt="down_icon" className={styles.downIcon} />
      </div>
    </div>
  );
}
