import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../config/FirebaseMethods";
import "../style/Home.scss";

export default function Home() {
  let [course, setCourse] = useState();
  let [quiz, setQuiz] = useState();
  let [studentRegistration, setStudentRegistration] = useState();
  let [trainerRegistration, setTrainerRegistration] = useState();
  let [data, setData] = useState([]);
  let [data1, setData1] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((_) => {
        setCourse(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("quiz")
      .then((_) => {
        setQuiz(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("StudentRegistration")
      .then((_) => {
        setStudentRegistration(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("TrainerRegistration")
      .then((_) => {
        setTrainerRegistration(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("course")
      .then((_) => {
        let arr = Object.values(_).filter((value, index) => {
          if (value.isPubliclyOpen === "yes") {
            return value;
          }
        });
        setData(arr);
      })
      .catch((_) => console.log(_));

    getItem("quiz")
      .then((_) => setData1(Object.values(_)))
      .catch((_) => console.log(_));
  }, []);

  return (
    <main>
      <section className="home">
        <div className="hero">
          <div className="leftSide">
            <h1>Научим программировать и поможем стать ITшником</h1>
            <p>
              Lademy - это школа программирования, где мы научим
              тебя востребованным сегодня знаниям. Все наши программы
              нацелены на получение качественного результата.
            </p>
            <button onClick={() => navigate("/course")}>Перейти к курсам</button>
          </div>
          <div className="rightSide1">
            <div className="image"></div>
          </div>
        </div>
        <div className="goToDown">
          <a href="#coursesSection"><i className="fa-solid fa-angle-down"></i></a>
        </div>
      </section>

      <div className="shortInfo">
        <div className="course1">
          <h1 className="heading">Курсы</h1>
          <p>Общее количество размещенных курсов</p>
          <h1>
            {course &&
              (course.length > 0) & (course.length < 10) &&
              "0" + course.length}
          </h1>
          <h1>{course && course.length >= 10 && course.length}</h1>
        </div>

        <div className="quiz">
          <h1 className="heading">Тесты</h1>
          <p>Общее количество размещенных тестов</p>
          <h1>
            {quiz &&
              (quiz.length > 0) & (quiz.length < 10) &&
              "0" + quiz.length}
          </h1>
          <h1>{quiz && quiz.length >= 10 && quiz.length}</h1>
        </div>

        <div className="studentRegister">
          <h1 className="heading">Пользователи</h1>
          <p>Общее количество пользователей</p>
          <h1>
            {studentRegistration &&
              (studentRegistration.length > 0) &
              (studentRegistration.length < 10) &&
              "0" + studentRegistration.length}
          </h1>
          <h1>
            {studentRegistration &&
              studentRegistration.length >= 10 &&
              studentRegistration.length}
          </h1>
        </div>

        {/* <div className="studentRegister">
          <h1 className="heading">Учащиеся</h1>
          <p>Общее количество учащихся</p>
          <h1>
            {studentRegistration &&
              (studentRegistration.length > 0) &
              (studentRegistration.length < 10) &&
              "0" + studentRegistration.length}
          </h1>
          <h1>
            {studentRegistration &&
              studentRegistration.length >= 10 &&
              studentRegistration.length}
          </h1>
        </div> */}

        {/* <div className="trainer">
          <h1 className="heading">Преподаватели</h1>
          <p>Общее количество учащихся</p>
          <h1>
            {trainerRegistration &&
              (trainerRegistration.length > 0) &
              (trainerRegistration.length < 10) &&
              "0" + trainerRegistration.length}
          </h1>
          <h1>
            {trainerRegistration &&
              trainerRegistration.length >= 10 &&
              trainerRegistration.length}
          </h1>
        </div> */}
      </div>

      <div className="home">
        <div className="distOb">
          <div className="dist">
            <h1>О дистанционном обучении</h1>
            <p>
              Мифы о дистанционном образовании
              приказали долго жить еще во времена пандемии.
              Сегодня сложно найти человека, который бы не
              верил, что на «дистанте» можно освоить
              интересную и «дорогую» профессию.
              Онлайн-обучение вступило в схватку
              с университетскими парами и ранними подъемами,
              и теперь берет над всем этим верх.
            </p>
            <button>Узнать больше</button>
          </div>
          <div className="image"></div>
        </div>
      </div>

      <div className="courses" id="coursesSection">
        <div className="heading">
          <h1>Самые востребованные курсы</h1>
        </div>

        <div className="box">
          {data && data.length > 0 ? (
            data.map((value, index) => {
              return (
                <div
                  key={index}
                  className="box1"
                  onClick={() =>
                    navigate("course/course-detail", { state: value })
                  }
                >
                  <img src={value.image} alt="image not found" width="300px" />
                  <div className="description">
                    <h1>{value.courseName}</h1>
                    <p>Длительность курса: {value.courseDuration} м</p>
                    <p>Тесты: {value.noOfQuiz}</p>
                    <h2>Бесплатно</h2>
                    <button className="tocourse">Перейти к курсу</button>
                    {/* <h2>RS {value.price}</h2> */}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Список курсов пуст</p>
          )}
        </div>
      </div>

      <div className="quiz12">
        <div className="heading">
          <h1>Тесты</h1>
        </div>

        <div className="box">
          {data1 &&
            data1.map((value, index) => {
              return (
                <div className="box1" key={index}>
                  <img src={value.image} alt="image not found" width="300px" />
                  <div className="description">
                    <h1>{value.category}</h1>
                    <p>{value.description}</p>

                    <button
                      onClick={() => navigate(`quiz/quiz-level/${value.key}`)}
                    >
                      Начать тест
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="quiz12">
        <div className="heading">
          <h1>Отзывы </h1>
        </div>
        <div className="box">
          {data1 &&
            data1.map((value, index) => {
              return (
                <div className="box1" key={index}>
                  {/* <img src={value.image} alt="image not found" width="300px" /> */}
                  <div className="description">
                    <h1>Александра</h1>
                    <p>
                      Очень удобная платформа с курсами!
                      Быстрое и удобное дабовление курсов, рекомендую
                    </p>

                    <p>
                      23-11-2023
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* <div className="footer">
        
      </div> */}

      {/* </section> */}

    </main >
  );
}
