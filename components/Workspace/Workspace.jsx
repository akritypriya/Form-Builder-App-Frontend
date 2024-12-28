import styles from './Workspace.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import folder_img from '../../assets/folder_img.png';
import delete_img from '../../assets/delete_img.png';
import React from 'react';

function Workspace() {
  const [selectedValue, setSelectedValue] = useState('/workspace'); // Header dropdown
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle state
  const [folders, setFolders] = useState([]); // State to track folders
  const [typebots, setTypebots] = useState([]); // State to track typebots
  const [isFolderPopupVisible, setIsFolderPopupVisible] = useState(false); // Folder popup visibility
  const [isFormPopupVisible, setIsFormPopupVisible] = useState(false); // Form popup visibility
  const [newFolderName, setNewFolderName] = useState(''); // New folder name input
  const [newFormName, setNewFormName] = useState(''); // New form name input
  const [editViewMode, setEditViewMode] = useState('edit'); // State to track "edit/view" mode
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // Delete popup visibility
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);// Folder index to delete
  const [selectedFormIndex, setSelectedFormIndex] = useState(null);// Form index to delete
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
    setIsDeletePopupVisible(!isDeletePopupVisible);
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

  // Open form creation popup
  const openFormPopup = () => {
    setIsFormPopupVisible(true);
  };

  // Close form creation popup
  const closeFormPopup = () => {
    setIsFormPopupVisible(false);
    setNewFormName('');
  };

  // Create a new typebot (form)
  const createTypebot = () => {
    if (newFormName.trim()) {
      setTypebots([...typebots, newFormName]);
      closeFormPopup();
    }
  };

  //   // Open delete popup for folder/form
  const openDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  // Close delete popup
  const closeDeletePopup = () => {
    setSelectedFolderIndex(null);
    setSelectedFormIndex(null);
    setIsDeletePopupVisible(false);
  };
  const deleteFolder = () => {
    setFolders((prevFolders) => prevFolders.filter((_, i) => i !== selectedFolderIndex));
    // setTypebots((prevForms) => prevForms.filter((_, i) => i !== selectedFormIndex));
    closeDeletePopup();
  };
    


  // Handle edit/view mode change
  const handleEditViewChange = (event) => {
    setEditViewMode(event.target.value);
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
                value={editViewMode}
                onChange={handleEditViewChange}
                className={styles.editView}
              >
                <option value="edit">Edit</option>
                <option value="view">View</option>
              </select>
            </div>
            <h3>Invite by Email</h3>
            <input type="text" placeholder="Enter email id" className={styles.input} />
            <button className={styles.primaryButton}>Send Invite</button>
            <h3>Invite by Link</h3>
            <button className={styles.primaryButton}>Copy Link</button>
          </div>
        </div>
      )}

      {/* Folder and Form Creation Section */}
      <div className={styles.sectionContainer}>
        <div className={styles.folderCreation}>
          <button onClick={openFolderPopup} className={styles.folder}>
            <img src={folder_img} alt="folder" className={styles.folderImg} />
            Create a folder
          </button>
          <ul className={styles.folderList}>
            {folders.map((folder, index) => (
              <li key={index} className={styles.folderItem}>
                {folder}
                {editViewMode === 'edit' && (
                  <button className={styles.deletebutton} >
                    <img 
                    src={delete_img} 
                    alt="deletefolder" 
                    className={styles.deleteImg} 
                    onClick={(e)=>
                    {
                      e.stopPropagation();
                      openDeletePopup(index);
                    }
                    }/>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formCreation}>
          <button onClick={openFormPopup} className={styles.typebot}>
            <p className={styles.text}>
              +
              <span>Create a Typebot</span>
            </p>
          </button>
          <ul className={styles.typebotList}>
            {typebots.map((typebot, index) => (
              <li key={index} className={styles.typebotItem}>
                {typebot}
                {editViewMode === 'edit' && (
                  <button className={styles.deletebutton} >
                    <img 
                    src={delete_img} 
                    alt="deleteform" 
                    className={styles.formdeleteImg}
                    onClick={(e)=>
                      {
                        e.stopPropagation();
                        openDeletePopup(index);
                      }
                      }
                    />
                  </button>
                )}
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

      {/* Form Popup */}
      {isFormPopupVisible && (
        <div className={styles.folderpopup}>
          <div className={styles.folderpopupContent}>
            <h3>Create New Form</h3>
            <input
              type="text"
              placeholder="Enter form name"
              value={newFormName}
              onChange={(e) => setNewFormName(e.target.value)}
              className={styles.input}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.button1} onClick={createTypebot}>
                Done
              </button>
              <div className={styles.borderline}></div>
              <button className={styles.button2} onClick={closeFormPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
          {/* Delete Button Popup */}
      {isDeletePopupVisible && (
        <div className={styles.folderpopup}>
          <div className={styles.folderpopupContent}>
            <h3>
              Are you sure you want to
              <span>delete this folder?</span>
            </h3>
            <div className={styles.buttonContainer}>
              <button className={styles.button1}>Confirm</button>
              <div className={styles.borderline}></div>
              <button className={styles.button2} onClick={closeDeletePopup}>
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

