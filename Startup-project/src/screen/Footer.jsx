import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../config/FirebaseMethods";
import "../style/footer.scss";

export default function Footer() {
  let navigate = useNavigate();

  return (
    <section className="footer"
      style={{
        display: window.location.pathname.slice(0, 10) === "/dashboard" ? "none" : "flex",
      }}
    >
      <div className="parentFooter">
        <div className="box11">
          <div className="logo">
            <h1 onClick={() => navigate("/")}>Lademy</h1>
            <p>Веб-платформа для размещения обучающих курсов</p>
          </div>
          <p>+375 29 000 00 00</p>
        </div>
        <div className="box12">
          <h1>Страницы</h1>
          <ul>
            <li>
              <Link to={"course"}>Курсы</Link>
            </li>
            <li>
              <Link to={"quiz"}>Тесты</Link>
            </li>
            <li>
              <Link to={"result"}>Результат</Link>
            </li>
            <li>
              <Link to={"login"}>Войти</Link>
            </li>
            <li>
              <Link to={"signUp"}>Регистрация</Link>
            </li>
          </ul>
        </div>
        <div className="box13">
          <h1>Формы Регистрации</h1>
          <ul>
            <li>
              <Link to={"student-register-form"}>
                Регистрация учащегося
              </Link>
            </li>
            <li>
              <Link to={"trainer-register-form"}>
                Регистрация преподавателя
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="childFooter">
        <h4>Copyright © 2024 - Реализовано Букиной Полиной - Lademy</h4>

        <div className="goToTop">
          <a href="#"><i className="fa-solid fa-angle-up"></i></a>
        </div>
      </div>
    </section>
  );
}
