import React from "react";
import Instagram from "../images/inst.svg"
import FaceBook from "../images/facebook.svg"
import WatsApp from "../images/watsapp.svg"
import FooterLogo from "../images/footer-logo.svg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <img src={FooterLogo} alt="" />

        <div className="address">
          <h3>Address</h3>
          <p>Svobody str. 35</p>
          <p>Kyiv</p>
          <p>Ukraine</p>
        </div>

        <div className="socials">
          <h3>Contact us</h3>
          <div className="icons">
            <img src={Instagram} alt="" />
            <img src={FaceBook} alt="" />
            <img src={WatsApp} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;