import React, { useState, useEffect } from "react";
import HeaderLink from "./Header/HeaderLink";
import AuthModal from "./Header/AuthModal";
import Button from "./ui/Button";
import headerLogo from "../images/header-logo.svg";
import headerUser from "../images/header-user.svg";

const NAV_MENU = ["Who we are", "Contacts", "Menu"];

const Header = ({ currentUser, onLogin, onRegister, onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleAuthSubmit = (formData) => {
    if (isLogin) {
      if (onLogin(formData)) setShowModal(false);
      else alert("Wrong data");
    } else {
      onRegister(formData);
      setShowModal(false);
    }
  };

  return (
    <header className="header">
      <div className="container container-header">
        <img className="header-logo" src={headerLogo} alt="logo" />

        <ul className="header-list">
          {NAV_MENU.map((item, index) => (
            <HeaderLink key={index} label={item} />
          ))}
        </ul>

        {!currentUser ? (
          <Button className="header-button" onClick={() => setShowModal(true)}>Sign Up</Button>
        ) : (
          <Button className="header-button" onClick={onLogout}>{currentUser.username}</Button>
        )}

        <img className="header-user" src={headerUser} alt="user" />

        {showModal && (
          <AuthModal isLogin={isLogin} setIsLogin={setIsLogin} onSubmit={handleAuthSubmit} onClose={() => setShowModal(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;