import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/FirebaseMethods";

// style
import "../../../style/createQuizHome.scss";

export default function CreateQuizHome() {
  let [currentValue, setCurrentValue] = useState({
    category: "",
    description: "",
  });
  let [flag, setFlag] = useState("");
  let [image, setImage] = useState("");
  let [id, setId] = useState(null);
  let navigate = useNavigate();

  const currentV = (e) => {
    let { value, name } = e.target;
    setCurrentValue((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  const categoryValue = (e) => {
    setFlag("Waiting...");
    e.preventDefault();
    console.log(currentValue);
    console.log(image);
    uploadImage(image, "category", currentValue, "quiz")
      .then((_) => {
        setId(_);
        navigate(`add-level/${_}`, { state: id });
        setFlag("");
      })
      .catch((_) => setFlag(_));
  };

  return (
    <section className="add-category">
      <div className="heading">
        <h1>Добавить тест</h1>
      </div>

      <p>
        Здесь вы можете добавить свои тест.
        Веб-платформа предлагает пользователям
        удобный и интуитивно понятный интерфейс
        для создания собственных обучающих курсов.
        На этой странице пользователи могут легко
        добавлять и настраивать содержание курса,
        включая уроки, тесты и другие учебные материалы.
      </p>

      <form onSubmit={categoryValue}>
        <input
          type="text"
          name="category"
          placeholder="Введите категорию"
          onChange={currentV}
        />
        <br />
        <textarea
          name="description"
          cols="30"
          rows="10"
          onChange={currentV}
          placeholder="Введите описание"
        ></textarea>
        <br />

        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        {flag ? <button>{flag}</button> : <button>Добавить категорию</button>}
      </form>
    </section>
  );
}
