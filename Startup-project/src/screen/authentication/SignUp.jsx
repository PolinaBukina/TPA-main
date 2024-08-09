import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../config/FirebaseMethods";
import { toast } from "react-hot-toast";

// style
import "../../style/login.scss";

export default function SignUp() {
  let [currentValue, setCurrentValue] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [loading, setLoading] = useState("");
  let navigate = useNavigate();

  const currentV = (e) => {
    let { value, name } = e.target;
    setCurrentValue((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();

    setLoading("wating...");

    createUser(currentValue)
      .then((_) => {
        toast.success("Успешно создан");
        setError("");
        navigate("/login");
      })
      .catch((_) => {
        setError(_);
        toast.error("Email уже используется");
        setLoading("");
      });
  };

  return (
    <section className="SignUp">
      <div className="heading">
        <h1>Зарегистрироваться</h1>
      </div>

      <form onSubmit={userData}>
        <input
          type="email"
          placeholder="Введите Email"
          name="email"
          onChange={currentV}
          required
        />
        <input
          type="password"
          placeholder="Введите пароль"
          name="password"
          onChange={currentV}
          required
        />

        <button>Регистрация</button>
      </form>

      <div className="buttonPart">
        {loading ? <p className="loading">{loading}</p> : null}
      </div>

      <div className="switchPage">
        Уже есть аккаунт?<Link to="/login">Войти</Link>
      </div>
    </section>
  );
}
