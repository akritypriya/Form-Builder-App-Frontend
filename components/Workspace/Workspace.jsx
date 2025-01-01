import styles from "./Workspace.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import folder_img from "../../assets/folder_img.png";
import delete_img from "../../assets/delete_img.png";
import axios from "axios";
const API_URL = "http://localhost:3000";

function Workspace() {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [isDarkMode, setIsDarkMode] = useState("isDarkMode"); // Theme toggle state
  const [folders, setFolders] = useState([]); // State to track folders
  const [files, setFiles] = useState([]); // State to track files
  const [isFolderPopupVisible, setIsFolderPopupVisible] = useState(false); // Folder popup visibility
  const [isFormPopupVisible, setIsFormPopupVisible] = useState(false); // Form popup visibility
  const [newFolderName, setNewFolderName] = useState(""); // New folder name input
  const [newFormName, setNewFormName] = useState(""); // New form name input
  const [editViewMode, setEditViewMode] = useState("edit"); // State to track "edit/view" mode
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false); // Delete Folder popup visibility
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null); // Folder index to delete
  const [isFormDeletePopupVisible, setIsFormDeletePopupVisible] =
    useState(false); // Delete Folder popup visibility
  const [selectedFormIndex, setSelectedFormIndex] = useState(null); // Form index to delete
  const [selectedValue, setSelectedValue] = useState(""); //  dropdown
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }

    const savedFolders = JSON.parse(localStorage.getItem("folders"));
    const savedFiles = JSON.parse(localStorage.getItem("files"));

    if (savedFolders) setFolders(savedFolders);
    if (savedFiles) setFiles(savedFiles);

    // Fetch data from backend if not found in localStorage (if needed)
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const user = await response.json();
            setUserName(user.name);
            localStorage.setItem("username", user.name);

            const dataResponse = await fetch(`${API_URL}/api/user`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (dataResponse.ok) {
              const data = await dataResponse.json();
              setFolders(data.folders || []);
              setFiles(data.files || []);
              localStorage.setItem(
                "folders",
                JSON.stringify(data.folders || [])
              );
              localStorage.setItem("files", JSON.stringify(data.files || []));
            }
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    if (!savedFolders || !savedFiles) {
      fetchUsername();
    }
  }, []);

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

  // Open folder creation popup
  const openFolderPopup = () => {
    setIsFolderPopupVisible(true);
  };

  // Close folder creation popup
  const closeFolderPopup = () => {
    setIsFolderPopupVisible(false);
    setNewFolderName("");
  };

  // Create a new folder

  const createFolder = async () => {
    if (newFolderName.trim()) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("You must be logged in to create a folder.");
          return;
        }

        const response = await axios.post(
          `${API_URL}/api/user/folders`,
          { name: newFolderName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 && response.data.folder) {
          const newFolder = response.data.folder;

          setFolders((prevFolders) => {
            const updatedFolders = [...prevFolders, newFolder];
            localStorage.setItem("folders", JSON.stringify(updatedFolders)); // Save to localStorage
            return updatedFolders;
          });

          setNewFolderName("");
          setIsFolderPopupVisible(false);
        } else {
          alert("Failed to create folder. Please try again.");
        }
      } catch (error) {
        console.error("Error creating folder:", error);
        alert("Error creating folder. Please try again.");
      }
    } else {
      alert("Please enter a folder name.");
    }
  };

  // Open form creation popup
  const openFormPopup = () => {
    setIsFormPopupVisible(true);
  };

  // Close form creation popup
  const closeFormPopup = () => {
    setIsFormPopupVisible(false);
    setNewFormName("");
  };

  // Create a new typebot (form)
  const createTypebot = async () => {
    if (newFormName.trim()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to create a form.");
          return;
        }

        const response = await axios.post(
          `${API_URL}/api/user/files`,
          { name: newFormName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 && response.data.file) {
          const newFile = response.data.file;

          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, newFile];
            localStorage.setItem("files", JSON.stringify(updatedFiles)); // Save to localStorage
            return updatedFiles;
          });

          setNewFormName("");
          setIsFormPopupVisible(false);
        } else {
          alert("Failed to create form. Please try again.");
        }
      } catch (error) {
        console.error("Error creating form:", error);
        alert("An error occurred while creating the form.");
      }
    } else {
      alert("Please enter a form name.");
    }
  };

  // Function to open the folder delete confirmation popup
  const openDeletePopup = (index) => {
    setIsDeletePopupVisible(true);
    setSelectedFolderIndex(index);
  };

  // Function to close the folder delete confirmation popup
  const closeDeletePopup = () => {
    setSelectedFolderIndex(null); // Reset selected index
    setIsDeletePopupVisible(false);
  };

  // Function to delete a folder
  const deleteFolder = async () => {
    if (selectedFolderIndex !== null) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to delete a folder.");
          return;
        }

        const folderId = folders[selectedFolderIndex]?._id; // Safely access folder ID
        if (!folderId) {
          alert("Folder ID not found.");
          return;
        }

        // Perform DELETE request
        const response = await axios.delete(
          `${API_URL}/api/user/folders/${folderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setFolders((prevFolders) => {
            const updatedFolders = prevFolders.filter(
              (_, i) => i !== selectedFolderIndex
            );
            localStorage.setItem("folders", JSON.stringify(updatedFolders)); // Update localStorage
            return updatedFolders;
          });
          closeDeletePopup(); // Close the popup
        } else {
          alert("Failed to delete folder. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting folder:", error);
        alert("Error deleting folder. Please try again.");
      }
    }
  };

  //form
  // Function to open the form delete confirmation popup
  const openFormDeletePopup = (index) => {
    setIsFormDeletePopupVisible(true);
    setSelectedFormIndex(index);
  };

  // Function to close the form delete confirmation popup
  const closeFormDeletePopup = () => {
    setSelectedFormIndex(null); // Reset selected index
    setIsFormDeletePopupVisible(false);
  };

  // Function to delete a file
  const deleteForm = async () => {
    if (selectedFormIndex !== null) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to delete a file.");
          return;
        }

        const fileId = files[selectedFormIndex]?._id; // Correctly access the file ID
        if (!fileId) {
          alert("File ID not found.");
          return;
        }

        // Use DELETE method
        const response = await axios.delete(
          `${API_URL}/api/user/files/${fileId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter(
              (_, i) => i !== selectedFormIndex
            );
            localStorage.setItem("files", JSON.stringify(updatedFiles)); // Update localStorage
            return updatedFiles;
          });
          closeFormDeletePopup();
          //alert("File deleted successfully!");
        } else {
          alert("Failed to delete the file. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting the file:", error);
        alert("Error deleting the file. Please try again.");
      }
    }
  };

  const handleItemClick = () => {
    navigate("/workspace/area"); // Navigate to the workshopge page for the selected bot
  };

  // Handle edit/view mode change
  const handleEditViewChange = (event) => {
    setEditViewMode(event.target.value);
  };
  //share
  const shareTogglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSendInvite = () => {
    const link = `${window.location.href}?mode=${editViewMode}`; // Append edit/view mode to the link
    navigator.clipboard.writeText(link); // Copy the link to clipboard
    alert(`Invite link sent! Share this link: ${link}`); // Display the link sent message
    setIsPopupVisible(false); // Close the Share Popup
  };

  const handleCopyLink = () => {
    const link = `${window.location.href}?mode=${editViewMode}`; // Append edit/view mode to the link
    navigator.clipboard.writeText(link); // Copy the link to clipboard
    alert("Link copied to clipboard!");
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.header}>
        {/* Dropdown */}
        <div className={styles.dropdown}>
          <select
            value={selectedValue}
            onChange={handleChange}
            className={`${styles.select} ${
              isDarkMode ? styles.darkDropdown : styles.lightDropdown
            }`}
          >
            <option value="/workspace" className={styles.doption}>
              {userName ? `${userName}'s workspace` : "Loading..."}
            </option>
            <option value="/settings" className={styles.doption}>
              Settings
            </option>
            <option value="/home" className={styles.dlogout}>
              Log Out
            </option>
          </select>
        </div>

        {/* Theme Toggle */}
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

        {/* Share Button */}
        <button
          type="button"
          className={styles.shareButton}
          onClick={shareTogglePopup}
        >
          Share
        </button>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={shareTogglePopup}>
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
            <input
              type="text"
              placeholder="Enter email id"
              className={styles.input}
              //disabled // Optional: Disable email input for demonstration
            />
            <button className={styles.primaryButton} onClick={handleSendInvite}>
              Send Invite
            </button>
            <h3>Invite by Link</h3>
            <button className={styles.primaryButton} onClick={handleCopyLink}>
              Copy Link
            </button>
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
              <li
                key={index}
                className={styles.folderItem}
                onClick={() => handleItemClick(folder._id, "folder")}
              >
                {folder.name} {/* Display folder name */}
                {editViewMode === "edit" && (
                  <button className={styles.deletebutton}>
                    <img
                      src={delete_img}
                      alt="deletefolder"
                      className={styles.deleteImg}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeletePopup(index);
                      }}
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formCreation}>
          <button onClick={openFormPopup} className={styles.typebot}>
            <p className={styles.typebottext}>
              +<span className={styles.typebottextline}>Create a Typebot</span>
            </p>
          </button>
          <ul className={styles.typebotList}>
            {files.map((file, index) => (
              <li
                key={index}
                className={styles.typebotItem}
                onClick={() => handleItemClick(file._id, "file")}
              >
                {file.name}
                {editViewMode === "edit" && (
                  <button className={styles.deletebutton}>
                    <img
                      src={delete_img}
                      alt="deleteform"
                      className={styles.formdeleteImg}
                      onClick={(e) => {
                        e.stopPropagation();
                        openFormDeletePopup(index);
                      }}
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
      {/* Delete folder Button Popup */}
      {isDeletePopupVisible && (
        <div className={styles.deletepopup}>
          <div className={styles.deletepopupContent}>
            <h2 className={styles.deleteText}>
              Are you sure you want to delete this folder?
            </h2>
            <div className={styles.deletebuttonContainer}>
              <button className={styles.deletebutton1} onClick={deleteFolder}>
                Confirm
              </button>
              <div className={styles.deleteborderline}></div>
              <button
                className={styles.deletebutton2}
                onClick={closeDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete form Button Popup */}
      {isFormDeletePopupVisible && (
        <div className={styles.deletepopup}>
          <div className={styles.deletepopupContent}>
            <h2 className={styles.deleteText}>
              Are you sure you want to delete this folder?
            </h2>
            <div className={styles.deletebuttonContainer}>
              <button className={styles.deletebutton1} onClick={deleteForm}>
                Confirm
              </button>
              <div className={styles.deleteborderline}></div>
              <button
                className={styles.deletebutton2}
                onClick={closeFormDeletePopup}
              >
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
