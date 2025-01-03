import  { useState} from "react";
import wsave from "../../assets/wsave.png";
import wlinked from "../../assets/wlinked.png";
import wclose from "../../assets/wclose.png";
import { useNavigate} from "react-router-dom";
import wflow from "../../assets/wflow.png";
import styles from "./Response.module.css";
const Response = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);  //Theme toggle state
  const [isLinkCopied, setIsLinkCopied] = useState(false);  //Link copied state
  const navigate = useNavigate();

   //Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? styles.lightTheme : styles.darkTheme;  //Apply body styles
  };
     //Close button
     const handleCloseButton = () => {
      navigate("/workspace");
    };
    
    const handleFlowButton = () => {
      navigate("/workspace/area");
    };
  
     //Handle share button click
    const handleShareButton = async () => {
      const responsLink = `${window.location.origin}/workspace/response`;
      try {
        await navigator.clipboard.writeText(responsLink);
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 3000);  // linked button hide after 3 seconds
        alert("Link copied to clipboard: " + responsLink);
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
        <button type="button" className={styles.flowButton} onClick={handleFlowButton}>
          <img src={wflow} alt="Flow" className={styles.flowImg} />
        </button>
        <button type="button" className={styles.responseButton} >
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
          <button
            type="button"
            className={styles.shareButton}
            onClick={handleShareButton}
          >
            Share
          </button>
          <button type="button" className={styles.saveButton} >
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
      {isLinkCopied && (
            <button type="button" className={styles.linkedButton}>
              <img
                src={wlinked}
                alt="Linked Button"
                className={styles.linkedImg}
              />
            </button>
          )}
      </div>
      {/* <hr />
      {isDataAvailable ? (
        <div className="body1">
          <div className="workspace">
            <div className="stats-container">
              <div className="stat">
                Views <span>{views}</span>
              </div>
              <div className="stat">
                Starts <span>{starts}</span>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Submitted At</th>
                    <th>Button 1</th>
                    <th>Email</th>
                    <th>Text</th>
                    <th>Button 2</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.button1}</td>
                      <td>{row.email || "-"}</td>
                      <td>{row.text || "-"}</td>
                      <td>{row.button2 || "-"}</td>
                      <td>{row.rating || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="completion-chart">
              <Doughnut data={chartData} key={JSON.stringify(chartData)} />
              <div className="chart-overlay">
                <div className="completed-count">Completed</div>
                <div className="completion-rate">{completion}</div>
              </div>
              <div className="rate1">
                <div className="completion-rate1">
                  {`completionRate ${completionRate}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="body">
          <p className="letssee" style={{ color: "#696969" }}>
            No Response yet collected
          </p>
        </div>
      )}*/}
    </div> 
  );
};

export default Response;
