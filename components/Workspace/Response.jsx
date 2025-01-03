import  { useState, useEffect} from "react";
import wsave from "../../assets/wsave.png";
import wlinked from "../../assets/wlinked.png";
import wclose from "../../assets/wclose.png";
import { useNavigate} from "react-router-dom";
import wflow from "../../assets/wflow.png";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import styles from "./Response.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title,);

const Response = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);  //Theme toggle state
  const [isLinkCopied, setIsLinkCopied] = useState(false);  //Link copied state
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [views, setViews] = useState(0);
  const [starts, setStarts] = useState(0);
  const [Complete, setComplete] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with actual backend call
      const response = {
        data: [
          {
            date: "Jul 17, 03:23 PM",
            button1: "Hi!",
            email: "abc@g.com",
            text: "alpha",
            button2: "Studio App",
            rating: 5,
          },
          {
            date: "Jul 17, 02:48 PM",
            button1: "Hi!",
            email: "",
            text: "",
            button2: "",
            rating: 3,
          },
        ],
        stats: { views: 6, starts: 100, completed: 33 },
      };

      setData(response.data);
      setViews(response.stats.views);
      setStarts(response.stats.starts);
      setComplete(response.stats.completed);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        data: [33, 67],
        backgroundColor: ["#3B82F6", "#909090"], // Blue and Grey colors
        hoverBackgroundColor: ["#3B82F6", "#909090"], // Blue and Grey on hover
      },
    ],
  };

  const completionRate = starts ? Math.round((Complete / starts) * 100) : 0;
  
  
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Tooltip format to show percentage on hover
          },
        },
      },
      legend: {
        display: false, 
      },
    },
    cutout: 90, 
  };

  

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
      const responseLink = `${window.location.origin}/workspace/response`;
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(responseLink);
          setIsLinkCopied(true);
          setTimeout(() => setIsLinkCopied(false), 3000);
        } catch (error) {
          alert("Failed to copy the link.");
        }
      } else {
        alert("Clipboard API not supported.");
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
          <div className={styles.statsContainer}>
              <div className={styles.stat}>
                Views <span>{views}</span>
              </div>
              <div className={styles.stat}>
                Starts <span>{starts}</span>
              </div>
            </div>
         <table className={styles.responseTable}>
            <thead>
              <tr>
                <th></th>
                <th>
                   <div className={styles.flexAlign}>
                    Submitted at</div>
                 </th>
                <th>Button 1</th>
                <th>Email 1</th>
                <th>Text 1</th>
                <th>Button 2</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
      {[
        {
          submittedAt: "Jul 17, 02:23 PM",
          button1: "Hi",
          email: "abc@gmail.com",
          text: "alpha",
          description: "Studio App to Manage Clients, Tracking App for Clients",
          rating: "5",
        },
        {
          submittedAt: "Jul 17, 02:48 PM",
          button1: "Hi",
          email: "---",
          text: "---",
          description: "---",
          rating: "---",
        },
        {
          submittedAt: "Jul 14, 04:25 PM",
          button1: "Hi",
          email: "---",
          text: "---",
          description: "---",
          rating: "---",
        },
      ].map((row, index) => (
        <tr key={index}>
          <td>{index + 1}</td> {/* Line number */}
          <td>{row.submittedAt}</td>
          <td>{row.button1}</td>
          <td>{row.email}</td>
          <td>{row.text}</td>
          <td>{row.description}</td>
          <td>{row.rating}</td>
        </tr>
      ))}
    </tbody>
          </table>
           {/* Chart Section */}
        <div className={styles.chartContainer}>
        <Pie data={chartData} options={options} />
        </div>       
        <div className={styles.completionRate}>
                  {`Completion Rate  ${completionRate}%`}
                </div>
      </div>
    </div> 
  );
};

export default Response;
