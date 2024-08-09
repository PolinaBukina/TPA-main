import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { user_is_signin, signOutUser } from "../config/FirebaseMethods";
import toast from "react-hot-toast";


// style
import "../style/navbar.scss";

export default function Navbar() {
  let [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    user_is_signin()
      .then((_) => {
        setFlag(true);
      })
      .catch((_) => console.log(_));
  }, [0]);

  const logoutUser = () => {
    signOutUser()
      .then((_) => toast.success(_))
      .catch((_) => console.log(_));
    setFlag(false);
  };

  const showMobileNav = () => {
    let show = document.querySelector(".hamburgerNavbar");
    let body = document.querySelector("body");

    if (show.style.transform === "translateX(-700px)") {
      show.style.transform = "translateX(0px)";
      body.style.overflow = "hidden";
    } else {
      show.style.transform = "translateX(-700px)";
      body.style.overflow = "auto";
    }
  };

  return (
    <section
      className="navbar"
      style={{
        display: window.location.pathname.slice(0, 10) === "/dashboard" ? "none" : "block",
      }}
    >
      <div className="topPart">
        <div className="top1">
          <div className="rightSide">
            <p>+375 29 000 00 00</p>
          </div>
          <div className="leftSide">
            <Link to="student-register-form">Регистрация учащегося</Link>
            <Link to="trainer-register-form">Регистрация преподавателя</Link>
          </div>
        </div>
      </div>

      <div className="bottomPart">
        <div className="bottom1">
          <div className="logo">
            <h1 onClick={() => navigate("/")}>Lademy</h1>
            <p>Веб-платформа для размещения обучающих курсов</p>
          </div>

          <div className="nav">
            <ul>
              {flag ? (
                <>
                  <li>
                    <Link to="/course">Курсы</Link>
                  </li>
                  <li>
                    <Link to="/quiz">Тесты</Link>
                  </li>
                  <li>
                    <Link onClick={logoutUser}>Выйти</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Панель</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Войти</Link>
                  </li>
                  <li>
                    <Link to="/signUp">Регистрация</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="hamburger" onClick={showMobileNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>

        <div className="hamburgerNavbar">
          <div className="HamburgerNav">
            <ul>
              <li>
                <Link to="/course">Course</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/result">Result</Link>
              </li>
              {flag ? (
                <>
                  <li>
                    <Link onClick={logoutUser}>Log Out</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">dashboard</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signUp">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
