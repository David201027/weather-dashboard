import { useState, useEffect } from "react";

import headerLogo from "../images/header-logo.svg";
import headerUser from "../images/header-user.svg";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ загрузка пользователя
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));

    if (saved) {
      setUser(saved);
    }
  }, []);

  // ✅ блокировка скролла
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // ✅ ESC закрытие
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showModal]);

  // ✅ input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ регистрация
  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) return;

    localStorage.setItem("user", JSON.stringify(form));

    setUser(form);

    setShowModal(false);

    setForm({
      username: "",
      email: "",
      password: "",
    });
  };

  // ✅ логин
  const handleLogin = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("user"));

    if (
      saved &&
      saved.email === form.email &&
      saved.password === form.password
    ) {
      setUser(saved);

      setShowModal(false);

      setForm({
        username: "",
        email: "",
        password: "",
      });
    } else {
      alert("Wrong email or password");
    }
  };

  // ✅ logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);
  };

  // ✅ backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <header className="header">
      <div className="container container-header">

        <img
          className="header-logo"
          src={headerLogo}
          alt="logo"
        />

        <ul className="header-list">
          <li className="header-item">
            <a className="header-link" href="/">
              Who we are
            </a>
          </li>

          <li className="header-item">
            <a className="header-link" href="/">
              Contacts
            </a>
          </li>

          <li className="header-item">
            <a className="header-link" href="/">
              Menu
            </a>
          </li>
        </ul>

        {/* USER */}
        {!user ? (
          <button
            className="header-button"
            onClick={() => setShowModal(true)}
          >
            Sign Up
          </button>
        ) : (
          <button
            className="header-button"
            onClick={handleLogout}
          >
            {user.username}
          </button>
        )}

        <img
          className="header-user"
          src={headerUser}
          alt="user"
        />

        {/* MODAL */}
        {showModal && (
          <div
            className="modal-backdrop"
            onClick={handleBackdropClick}
          >
            <div className="modal-content">

              <h3 className="modal-title">
                {isLogin ? "Log In" : "Sign Up"}
              </h3>

              <form
                className="header-form"
                onSubmit={isLogin ? handleLogin : handleRegister}
              >

                {/* USERNAME */}
                {!isLogin && (
                  <div>
                    <label htmlFor="username">
                      Username
                    </label>

                    <input
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {/* EMAIL */}
                <div>
                  <label htmlFor="email">
                    E-Mail
                  </label>

                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                {/* BUTTON */}
                <button
                  className="modal-header-button"
                  type="submit"
                >
                  {isLogin ? "Log In" : "Register"}
                </button>

              </form>

              {/* SWITCH */}
              <p
                className="have-account"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  cursor: "pointer",
                  marginTop: "15px",
                }}
              >
                {isLogin
                  ? "No account? Sign Up"
                  : "Already have account? Log In"}
              </p>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;