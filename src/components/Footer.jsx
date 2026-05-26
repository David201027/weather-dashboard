import React from "react";
import Instagram from "../images/inst.svg";
import FaceBook from "../images/facebook.svg";
import WatsApp from "../images/watsapp.svg";
import FooterLogo from "../images/footer-logo.svg";

const Footer = () => {
  const socialsConfig = [
    { id: "instagram", icon: Instagram, alt: "Instagram", url: "https://instagram.com" },
    { id: "facebook", icon: FaceBook, alt: "Facebook", url: "https://facebook.com" },
    { id: "whatsapp", icon: WatsApp, alt: "WhatsApp", url: "https://wa.me/380000000000" },
  ];

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <img src={FooterLogo} alt="Footer Logo" />

        <div className="address">
          <h3>Address</h3>
          <p>Svobody str. 35</p>
          <p>Kyiv</p>
          <p>Ukraine</p>
        </div>

        <div className="socials">
          <h3>Contact us</h3>
          <div className="icons">
            {socialsConfig.map((social) => (
              <a 
                key={social.id} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={social.icon} alt={social.alt} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;