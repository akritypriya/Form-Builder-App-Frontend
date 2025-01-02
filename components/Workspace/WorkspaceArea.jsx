import { useState } from "react";
import styles from "./WorkspaceArea.module.css";
import wflow from "../../assets/wflow.png";
import wsave from "../../assets/wsave.png";
import wclose from "../../assets/wclose.png";
import wtext from "../../assets/wtext.png";
import wimg from "../../assets/wimg.png";
import wgif from "../../assets/wgif.png";
import wvideo from "../../assets/wvideo.png";
import wwtext from "../../assets/wwtext.png";
import wnumber from "../../assets/wnumber.png";
import wemail from "../../assets/wemail.png";
import wphone from "../../assets/wphone.png";
import wdate from "../../assets/wdate.png";
import wrating from "../../assets/wrating.png";
import wbutton from "../../assets/wbutton.png";

function WorkspaceArea() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle state
  const [elements, setElements] = useState([]); // Dynamic elements state

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? styles.lightTheme : styles.darkTheme; // Apply body styles
  };

  // Handle adding a new element
  const handleAddElement = (label) => {
    setElements((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label,
      },
    ]);
  };

  return (
    <div className={`${styles.mainContainer} ${isDarkMode ? styles.dark : styles.light}`}>
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

      <div className={styles.sectionContainer}>
        <div className={styles.leftSection}>
          <p className={styles.ptext}>Bubbles</p>
          <div className={styles.BubblesButton}>
            <button
              type="button"
              className={styles.btextButton}
              onClick={() => handleAddElement("Text")}
            >
              <img src={wtext} alt="Text" className={styles.btextImg} />
            </button>
            <button
              type="button"
              className={styles.bimgButton}
              onClick={() => handleAddElement("Image")}
            >
              <img src={wimg} alt="Image" className={styles.bimage} />
            </button>
            <button
              type="button"
              className={styles.bvideoButton}
              onClick={() => handleAddElement("Video")}
            >
              <img src={wvideo} alt="Video" className={styles.videoImg} />
            </button>
            <button
              type="button"
              className={styles.bgifButton}
              onClick={() => handleAddElement("GIF")}
            >
              <img src={wgif} alt="GIF" className={styles.gifImg} />
            </button>
          </div>
          <p className={styles.itext}>Inputs</p>
          <div className={styles.inputsButton}>
            <button
              type="button"
              className={styles.itextButton}
              onClick={() => handleAddElement("Input Text")}
            >
              <img src={wwtext} alt="Input Text" className={styles.itextImg} />
            </button>
            <button
              type="button"
              className={styles.numberButton}
              onClick={() => handleAddElement("Number")}
            >
              <img src={wnumber} alt="Input Number" className={styles.numberImg} />
            </button>
            <button
              type="button"
              className={styles.emailButton}
              onClick={() => handleAddElement("Email")}
            >
              <img src={wemail} alt="Input Email" className={styles.emailImg} />
            </button>
            <button
              type="button"
              className={styles.phoneButton}
              onClick={() => handleAddElement("Phone")}
            >
              <img src={wphone} alt="Input Phone" className={styles.phoneImg} />
            </button>
            <button
              type="button"
              className={styles.dateButton}
              onClick={() => handleAddElement("Date")}
            >
              <img src={wdate} alt="Input Date" className={styles.dateImg} />
            </button>
            <button
              type="button"
              className={styles.ratingButton}
              onClick={() => handleAddElement("Rating")}
            >
              <img src={wrating} alt="Input Rating" className={styles.ratingImg} />
            </button>
            <button
              type="button"
              className={styles.wButton}
              onClick={() => handleAddElement("Button")}
            >
              <img src={wbutton} alt="Button" className={styles.buttonImg} />
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h2 className={styles.htext}>Start</h2>
          {elements.map((element) => (
            <div key={element.id} className={styles.elementContainer}>
              <label className={styles.label}>{element.label}</label>
              <input
                type="text"
                className={styles.textBox}
                placeholder="click here to edit"
              />Required Field
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceArea;
