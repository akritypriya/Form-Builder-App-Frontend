import styles from './Workspace.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Workspace() {
  const [selectedValue, setSelectedValue] = useState('/workspace'); // Header dropdown
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle state
  const navigate = useNavigate();

  // Handle dropdown change
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value) {
      navigate(value); // Navigate to the selected dropdown value
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? styles.lightTheme : styles.darkTheme; // Apply body styles
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className={`${styles.mainContainer} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.header}>
        {/* Dropdown */}
        <div className={styles.dropdown}>
          <select
            value={selectedValue}
            onChange={handleChange}
            className={`${styles.select} ${isDarkMode ? styles.darkDropdown : styles.lightDropdown}`}
          >
            <option value="/workspace">{}'s workspace</option>
            <option value="/settings">Settings</option>
            <option value="/home">Log Out</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <div className={styles.toggleContainer}>
          <span className={styles.label}>Light</span>
          <div
            className={`${styles.toggleSwitch} ${isDarkMode ? styles.dark : styles.light}`}
            onClick={toggleTheme}
          >
            <div className={styles.toggleCircle}></div>
          </div>
          <span className={styles.label}>Dark</span>
        </div>

        {/* Share Button */}
        <button type="button" className={styles.shareButton} onClick={togglePopup}>
          Share
        </button>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={togglePopup}>
              X
            </button>
            <h3>Invite by Email</h3>
            <input type="text" placeholder="Enter email id" className={styles.input} />
            <button className={styles.primaryButton}>Send Invite</button>
            <h3>Invite by Link</h3>
            <button className={styles.primaryButton}>Copy Link</button>
          </div>
        </div>
      )}

      {/*create folders and form*/}
    </div>
  );
}

export default Workspace;
