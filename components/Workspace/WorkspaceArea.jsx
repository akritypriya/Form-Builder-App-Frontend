
import styles from "./WorkspaceArea.module.css";
import wflow from "../../assets/wflow.png";
import wsave from "../../assets/wsave.png";
import wclose from "../../assets/wclose.png";
import { useState } from "react";

function WorkspaceArea() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle state

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? styles.lightTheme : styles.darkTheme; // Apply body styles
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navBar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          className={styles.navInput}
        />
        <button type="button" className={styles.flowButton}>
          <img src={wflow} alt="Flow" className={styles.flowImg} />
        </button>
        <button type="button" className={styles.responseButton}>
          Response
        </button>
        <div className={styles.toggleContainer}>
          <span className={styles.label}>Light</span>
          <div
            className={`${styles.toggleSwitch} ${
              isDarkMode ? styles.dark : styles.light
            }`}
            onClick={toggleTheme}
          >
            <div className={styles.toggleCircle}></div>
          </div>
          <span className={styles.label}>Dark</span>
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.shareButton}>
            Share
          </button>
          <button type="button" className={styles.saveButton}>
            <img src={wsave} alt="Save" className={styles.saveImg} />
          </button>
          <button type="button" className={styles.closeButton}>
            <img src={wclose} alt="Close" className={styles.closeImg} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceArea;
