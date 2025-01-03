import { useState} from "react";
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
import wlinked from "../../assets/wlinked.png";
import delete_img from "../../assets/delete_img.png";
import flag from "../../assets/flag.png";
import { useNavigate} from "react-router-dom";
import axios from "axios";

function WorkspaceArea() {
  const [isDarkMode, setIsDarkMode] = useState(false);  //Theme toggle state
  const [elements, setElements] = useState([]);  //Dynamic elements state
  const [isLinkCopied, setIsLinkCopied] = useState(false);  //Link copied state
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");

  const handleSaveWorkspace = async () => {
    const token = localStorage.getItem("token");
    console.log("Retrieved Token:", token);
    const workspaceData = {
      workspaceName: workspaceName || "Untitled Workspace",
      elements,
      createdBy: "USER_ID", 
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/workspace/save`,
        workspaceData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
      alert("Workspace saved successfully!");
    } catch (error) {
      console.error("Error saving workspace:", error);
      alert("Failed to save the workspace. Please try again.");
    }
  };

  

   //Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? styles.lightTheme : styles.darkTheme;  //Apply body styles
  };

   //Handle adding a new element with bubble input textbox
  const handleAddElement = (label) => {
    let count = 1;
    const updatedLabel = (existingLabel) => {
      const filteredElements = elements.filter((element) =>
        element.label.startsWith(existingLabel)
      );
      if (filteredElements.length > 0) {
        count = filteredElements.length + 1;
      }
      return `${existingLabel} ${count}`;
    };

    const newLabel = updatedLabel(label);

    setElements((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label: newLabel,
        hasInput: true,
        isRequired:true,
      
      },
    ]);
  };

   
  const handleInputButtonElement = (label, description) => {
    let count = 1;
    const updatedLabel = (existingLabel) => {
      const filteredElements = elements.filter((element) =>
        element.label.startsWith(existingLabel)
      );
      if (filteredElements.length > 0) {
        count = filteredElements.length + 1;
      }
      return `${existingLabel} ${count}`;
    };

    const newLabel = updatedLabel(label);

    setElements((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label: newLabel,
        hasInput: false,
        description,
      },
    ]);
  };

   //Close button
  const handleCloseButton = () => {
    navigate("/workspace");
  };
  
  const handleResponseButton = () => {
    navigate("/workspace/response");
  };
   //Handle deleting an element
  const handleDeleteElement = (id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

   //Handle share button click
  const handleShareButton = async () => {
    const workspaceLink = `${window.location.origin}/workspace/area`;
    try {
      await navigator.clipboard.writeText(workspaceLink);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 3000);  // linked button hide after 3 seconds
      alert("Link copied to clipboard: " + workspaceLink);
    } catch (error) {
      alert("Failed to copy the link. Please try again.");
    }
  };
  

  return (
    <div
      className={`${styles.mainContainer} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.navBar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          className={styles.navInput}
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <button type="button" className={styles.flowButton}>
          <img src={wflow} alt="Flow" className={styles.flowImg} />
        </button>
        <button type="button" className={styles.responseButton} onClick={handleResponseButton}>
          Response
        </button>
        <div className={styles.toggleContainer}>
          <span className={styles.wlabel}>Light</span>
          <div
            className={`${styles.toggleSwitch} ${
              isDarkMode ? styles.dark : styles.light
            }`}
            onClick={toggleTheme}
          >
            <div className={styles.toggleCircle}></div>
          </div>
          <span className={styles.wlabel}>Dark</span>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.shareButton}
            onClick={handleShareButton}
          >
            Share
          </button>
          <button type="button" className={styles.saveButton} onClick={handleSaveWorkspace} >
            <img src={wsave} alt="Save" className={styles.saveImg} />
          </button>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCloseButton}
          >
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
            <button type="button" className={styles.bvideoButton}>
              <img src={wvideo} alt="Video" className={styles.videoImg} />
            </button>
            <button type="button" className={styles.bgifButton}>
              <img src={wgif} alt="GIF" className={styles.gifImg} />
            </button>
          </div>
          <p className={styles.itext}>Inputs</p>
          <div className={styles.inputsButton}>
            <button
              type="button"
              className={styles.itextButton}
              onClick={() => handleInputButtonElement("Input Text", "Hint : User will input a text on his form")}
            >
              <img src={wwtext} alt="Input Text" className={styles.itextImg} />
            </button>
            <button
              type="button"
              className={styles.numberButton}
              onClick={() => handleInputButtonElement("Input Number", "Hint : User will input a number on his form")}
            >
              <img
                src={wnumber}
                alt="Input Number"
                className={styles.numberImg}
              />
            </button>
            <button
              type="button"
              className={styles.emailButton}
              onClick={() => handleInputButtonElement("Input Email", "Hint : User will input a email on his form")}
            >
              <img src={wemail} alt="Input Email" className={styles.emailImg} />
            </button>
            <button
              type="button"
              className={styles.phoneButton}
              onClick={() => handleInputButtonElement("Input Phone", "Hint : User will input a phone on his form")}
            >
              <img src={wphone} alt="Input Phone" className={styles.phoneImg} />
            </button>
            <button
              type="button"
              className={styles.dateButton}
              onClick={() => handleInputButtonElement("Input Date", "Hint : User will select a date")}
            >
              <img src={wdate} alt="Input Date" className={styles.dateImg} />
            </button>
            <button
              type="button"
              className={styles.ratingButton}
              onClick={() => handleInputButtonElement("Input Rate", "Hint : User will tap to rate out of 5")}
            >
              <img
                src={wrating}
                alt="Input Rate"
                className={styles.ratingImg}
              />
            </button>
            <button
              type="button"
              className={styles.wButton}
              onClick={() => handleInputButtonElement("Input Button")}
            >
              <img
                src={wbutton}
                alt="Input Button"
                className={styles.buttonImg}
              />
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          {isLinkCopied && (
            <button type="button" className={styles.linkedButton}>
              <img
                src={wlinked}
                alt="Linked Button"
                className={styles.linkedImg}
              />
            </button>
          )}
           <img src={flag} alt="Flag" className={styles.flagImg}/>
           <h2 className={styles.htext}>Start</h2>
{elements.map((element) => (
  <div key={element.id} className={styles.elementContainer}>
    <button className={styles.deletebutton}>
      <img
        src={delete_img}
        alt="Delete Element"
        className={styles.deleteImg}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteElement(element.id);
        }}
      />
    </button>
    <label className={styles.label}>{element.label}</label>
    {element.hasInput ? (
      <input
        type="text"
        className={styles.textBox}
        placeholder="click here to edit"
      />
    ) : (
      <p className={styles.Inputdescription}>
        {element.description}
      </p>
    )}
    {element.isRequired && (
      <span className={styles.requiredField}>Required Field</span>
    )}
  </div>
))}
</div>
      </div>
    </div>
  );
}

export default WorkspaceArea;

