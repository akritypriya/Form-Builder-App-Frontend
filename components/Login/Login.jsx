import { login } from "../../services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import arrow_back from "../../assets/arrow_back.png";
import down_ellipse from "../../assets/down_ellipse.png";
import Google_Icon from "../../assets/Google_Icon.svg";
import side_ellipse from "../../assets/side_ellipse.png";
import triangle from "../../assets/triangle.png";

export default function Login() {
  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/workspace");
    }
  }, [navigate]);

  const [loginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await login(loginformData);
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        alert("Logged in successfully");
        navigate("/workspace");
      } else {
        setError("Invalid email or password"); // Handle non-200 response
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again."); // Handle network or server errors
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
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <div className={styles.formText}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginformData.email}
              onChange={(e) =>
                setLoginformData({ ...loginformData, email: e.target.value })
              }
            />
          </div>
          <div className={styles.formPassword}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              value={loginformData.password}
              onChange={(e) =>
                setLoginformData({ ...loginformData, password: e.target.value })
              }
            />
            {error && <p className={styles.error}>{error}</p>}{" "}
            {/* Display error message */}
          </div>

          <button type="submit" className={styles.formButton1}>
            Log In
          </button>
        </form>
        <p className={styles.textOR}>OR</p>

        <button type="button" className={styles.formButton2}>
          <img src={Google_Icon} alt="icon" className={styles.GoogleIcon} />
          Sign in with Google
        </button>

        <p className={styles.text}>
          Don’t have an account?
          <a href="/register" className={styles.link}>
            Register now
          </a>
        </p>

        <img src={down_ellipse} alt="down_icon" className={styles.downIcon} />
      </div>
    </div>
  );
}
