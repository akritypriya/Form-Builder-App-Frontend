import React from 'react'
import styles from "./LandingPage.module.css";
import icon from "../../assets/icon.png";
import image from "../../assets/image.png";
import Footer_container from "../../assets/Footer_container.png";
import orangeBg from "../../assets/orangeBg.png";
import blueBg from "../../assets/blueBg.png";
import semicircle from "../../assets/semicircle.png";
import triangle_front from "../../assets/triangle_front.png";
import {Link} from 'react-router-dom'


function LandingPage() {
  return (
    <div className={styles.headContainer}>
      <div className={styles.header}>
        <img src={icon} alt="formbot" className={styles.icon} />
        <Link to='/login'>
        <button type="button" className={styles.button1}>
        Sign in
        </button>
        </Link>
        <Link to='/register'>
        <button type="button" className={styles.button2}>
        Create a FormBot
        </button>
        </Link>
        </div>
        <div className={styles.mainSection}>
        <h2 className={styles.text}> 
        <span>Build advanced chatbots</span>
        <span>visually</span>
        </h2>
          <p>
          <span>Typebot gives you powerful blocks to create unique chat experiences. Embed them</span>
          <span>anywhere on your web/mobile apps and start collecting results like magic.</span>
          </p>
          <Link to='/register'>
        <button type="button" className={styles.button3}>
        Create a FormBot  for free
        </button>
        </Link>
        <img src={triangle_front} alt="triangle" className={styles.triangle} />
        <img src={semicircle} alt="semicircle" className={styles.semicircle} />
        <img src={orangeBg} alt="orangeBg" className={styles.orangeBg} />
        <img src={blueBg} alt="blueBg" className={styles.blueBg} />
        <img src={image} alt="section" className={styles.image} />
      </div>
     <footer className={styles.footer}>
     <img src={Footer_container} alt="footer" className={styles.Footer_container} />
     </footer>
    </div>
  )
}

export default LandingPage