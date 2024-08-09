import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../config/FirebaseMethods";
import toast from "react-hot-toast";
import "../../style/login.scss";

export default function Login() {
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
    signInUser(currentValue)
      .then((_) => {
        toast.success(_);
        setError("");
        navigate("/");
        // window.onload(() => {console.log("page load")});
      })
      .catch((_) => {
        setError(_);
        toast.error("Вы ввели неверный пароль")
        setLoading("");
      });
  };

  return (
    <section className="login">
      <div className="heading">
        <h1>Вход в профиль</h1>
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

        {loading ? <button>{loading}</button> : <button>Войти</button>}
      </form>

      <div className="switchPage">
        Все ещё нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </div>
    </section>
  );
}

