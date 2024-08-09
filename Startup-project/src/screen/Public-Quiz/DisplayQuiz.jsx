import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// style
import "../../style/displayQuiz.scss";

export default function DisplayQuiz() {
  let location = useLocation();
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [count, setCount] = useState(0);
  let [flag, setFlag] = useState(true);
  let [flag1, setFlag1] = useState(false);
  let [flag2, setFlag2] = useState(true);
  let [score, setScore] = useState(0);

  useEffect(() => {
    setData(location.state);
  }, [0]);

  console.log("score", score);

  const nextQuestion = () => {
    setFlag2(true);
    let liItem = document.querySelectorAll(".options ul li");
    liItem.forEach((e) => {
      e.style.background = "transparent";
      e.style.color = "#0c0015";
    });

    if (count < data.questions.length - 1) {
      setCount(count + 1);
      setFlag(true);
      console.log(count);
    } else {
      setFlag1(true);
      console.log("condition неправильно");
    }
  };

  const checkAnswer = (e) => {
    setFlag2(false);
    if (data.questions[count].answer === e) {
      console.log("правильно");

      setFlag(false);
      setScore(score + 1);

      let liItem = document.getElementsByClassName(e)[0];
      liItem.style.background = "green";
      liItem.style.color = "#fff";
    } else {
      let liItem = document.getElementsByClassName(e)[0];
      liItem.style.background = "red";
      liItem.style.color = "#fff";

      console.log("score:", score);
      console.log("неправильно");
      setFlag(false);
    }
  };

  const startUp = () => {
    setCount(0);
    setFlag(true);
    setFlag1(false);
    setScore(0);
  };

  console.log(count);

  return (
    <section className="displayQuiz">
      {!flag1 && (
        <div className="heading">
          <h1>Тест начался</h1>
        </div>
      )}

      {flag1 ? (
        <div className="result">
          <div className="heading">
            <h1>Хорошо сыграно 🙌🤗</h1>
            <p>Посмотрим твои результаты</p>
          </div>
          <div className="result1">
            <div className="heading">
              <h2>Результаты</h2>
            </div>

            <h4>
              Общее количество вопросов:{" "}
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {data.totalQuestion < 10
                  ? `${data.totalQuestion}`
                  : data.totalQuestion}
              </span>
            </h4>
            <h4>
              Время:{" "}
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {" "}
                {data.totalTime < 10 ? `${data.totalTime}` : data.totalTime}
              </span>
            </h4>
            <h4>
              Максимальная оценка:{" "}
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {data.totalMark < 10 ? `${data.totalMark}` : data.totalMark}
              </span>
            </h4>
            <h4>
              Твоя оценка:{" "}
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {(Number(data.totalMark) / data.totalQuestion) * score < 10
                  ? `${Number(data.totalMark / data.totalQuestion) * score}`
                  : Number(data.totalMark / data.totalQuestion) * score}
              </span>
            </h4>
            <h4>
              Неправильных ответов:{" "}
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {Number(data.totalQuestion) - score < 10
                  ? `${Number(data.totalQuestion) - score}`
                  : Number(data.totalQuestion) - score}
              </span>
            </h4>
            <h4>
              Правильных ответов:
              <span style={{ color: "rgb(164, 58, 248)" }}>
                {score < 10 ? `${score}` : score}
              </span>
            </h4>

            <button className="again" onClick={startUp}>Попробуй заново</button>
            <button className="goToQuiz" onClick={() => navigate("/quiz")}>Перейти к тестам</button>

          </div>
        </div>
      ) : (
        <div className="quiz-form">
          <div className="questions">
            <div className="question">
              <p>
                Вопрос#{count + 1}:{" "}
                {data && data.questions && data.questions[count].question}?
              </p>
            </div>
            <div className="options">
              <ul>
                {data &&
                  data.questions &&
                  data.questions[count].option.map((value, index) => {
                    return (
                      <li
                        className={value}
                        key={index}
                        onClick={() => {
                          if (flag) {
                            checkAnswer(value);
                          }
                        }}
                      >
                        {index + 1}: {value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <button onClick={nextQuestion} disabled={flag2}>
            Следующий вопрос
          </button>
        </div>
      )}
    </section>
  );
}
