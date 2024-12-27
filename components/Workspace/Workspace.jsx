import styles from './Workspace.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  folder_img from '../../assets/folder_img.png'
import React from 'react';

function Workspace() {
  const [selectedValue, setSelectedValue] = useState('/workspace'); // Header dropdown
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [isDarkMode, setIsDarkMode] = useState(); // Theme toggle state
  const [folders, setFolders] = useState([]); // State to track folders
  const [typebots, setTypebots] = useState([]); // State to track typebots
  const [isFolderPopupVisible, setIsFolderPopupVisible] = useState(false); // Folder popup visibility
  const [newFolderName, setNewFolderName] = useState(''); // New folder name input
  const [isEditView,setEditView]=useState('edit');
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

  // Open folder creation popup
  const openFolderPopup = () => {
    setIsFolderPopupVisible(true);
  };

  // Close folder creation popup
  const closeFolderPopup = () => {
    setIsFolderPopupVisible(false);
    setNewFolderName('');
  };

  // Create a new folder
  const createFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName]);
      closeFolderPopup();
    }
  };

  // Create a new typebot
  const createTypebot = () => {
    const typebotName = `Typebot ${typebots.length + 1}`;
    setTypebots([...typebots, typebotName]);
  };

  // Handle edit/viewdropdown change
  const handleEditViewChange = (event) => {
    setSelectedValue(event.target.value);
    
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
            <option value="/workspace">Ram's workspace</option>
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
            <div className={styles.editViewDropdown}>
          <select
            value={selectedValue}
            onChange={handleEditViewChange}
            className={styles.editView}>
            <option value="/edit">edit</option>
            <option value="/view">view</option>
            
          </select>
        </div>
            <h3 className={styles.textEmail}> Invite by Email</h3>

            <input type="text" placeholder="Enter email id" className={styles.input} />
            <button className={styles.primaryButton}>Send Invite</button>
            <h3 className={styles.textlink}>Invite by Link</h3>
            <button className={styles.primaryButton}>Copy Link</button>
          </div>
        </div>
      )}

              {/* Folder Creation and Typebot Section */}
      <div className={styles.sectionContainer}>
        <div className={styles.folderCreation}>
          <button onClick={openFolderPopup} className={styles.folder} ><img src={folder_img} alt="folder" className={styles.folderImg}/>Create a folder</button>
          <ul className={styles.folderList}>
            {folders.map((folder, index) => (
              <li key={index} className={styles.folderItem}>
                {folder}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formCreation}>
          <button onClick={createTypebot} className={styles.typebot}>
            <p className={styles.text}>+
            <span>Create a Typebot </span></p>
          </button>
          <ul className={styles.typebotList}>
            {typebots.map((typebot, index) => (
              <li key={index} className={styles.typebotItem}>
                {typebot}
              </li>
            ))}
          </ul>
        </div>
      </div>
            {/* Folder Popup */}
            {isFolderPopupVisible && (
        <div className={styles.folderpopup}>
          <div className={styles.folderpopupContent}>
            <h3>Create New Folder</h3>
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className={styles.input}
            />
            <div className={styles.buttonContainer}>
            <button className={styles.button1} onClick={createFolder}>
              Done
            </button>
            <div className={styles.borderline}></div>
            <button className={styles.button2} onClick={closeFolderPopup}>
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workspace;

