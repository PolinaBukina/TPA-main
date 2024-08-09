import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";

// style
import "../../style/quizLevel.scss";

export default function QuizLevel() {
  let navigate = useNavigate();
  let { id } = useParams();
  let [data, setData] = useState([]);

  useEffect(() => {
    getItem("levels", id)
      .then((_) => setData(Object.values(_)))
      .catch((_) => console.log(_));
  }, [0]);

  return (
    <section className="quizLevel">
      <div className="heading">
        <h1>Уровни тестов</h1>
      </div>

      {data.map((value, index) => {
        return (
          <div className="box" key={index}>
            <div className="box1">
              <div className="description">
                <h1>{value.level01.name}</h1>
                <h4>
                  Общее количество вопросов:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalQuestion) < 10
                      ? `${value.level01.totalQuestion}`
                      : value.level01.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Допустимое количество ошибок:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalMark) < 10
                      ? `${value.level01.totalMark}`
                      : value.level01.totalMark}
                  </span>
                </h4>
                <h4>
                  Количество времени:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalTime) < 10
                      ? `${value.level01.totalTime}`
                      : value.level01.totalTime}
                  </span>
                </h4>
                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level01,
                    })
                  }
                >
                  Начать тест
                </button>
              </div>
            </div>
            <div className="box1">
              <div className="description">
                <h1>{value.level02.name}</h1>
                <h4>
                  Общее количество вопросов:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalQuestion) < 10
                      ? `${value.level02.totalQuestion}`
                      : value.level02.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Допустимое количество ошибок:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalMark) < 10
                      ? `${value.level02.totalMark}`
                      : value.level02.totalMark}
                  </span>
                </h4>
                <h4>
                  Количество времени:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalTime) < 10
                      ? `${value.level02.totalTime}`
                      : value.level02.totalTime}
                  </span>
                </h4>

                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level02,
                    })
                  }
                >
                  Начать тест
                </button>
              </div>
            </div>
            <div className="box1">
              <div className="description">
                <h1>{value.level03.name}</h1>
                <h4>
                  Общее количество ошибок:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalQuestion) < 10
                      ? `${value.level03.totalQuestion}`
                      : value.level03.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Допустимое количество ошибок:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalMark) < 10
                      ? `${value.level03.totalMark}`
                      : value.level03.totalMark}
                  </span>
                </h4>
                <h4>
                  Количество времени:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalTime) < 10
                      ? `${value.level03.totalTime}`
                      : value.level03.totalTime}
                  </span>
                </h4>

                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level03,
                    })
                  }
                >
                  Начать тест
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}


// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getItem } from "../../config/FirebaseMethods";

// // style
// import "../../style/quizLevel.scss";

// export default function QuizLevel() {
//   let navigate = useNavigate();
//   let { id } = useParams();
//   let [data, setData] = useState([]);

//   useEffect(() => {
//     getItem("levels", id)
//       .then((_) => setData(Object.values(_)))
//       .catch((_) => console.log(_));
//   }, [id]);

//   const renderLevel = (level, navigateTo) => {
//     if (!level) {
//       return null;
//     }

//     return (
//       <div className="box1">
//         <div className="description">
//           <h1>{level.name}</h1>
//           <h4>
//             Общее количество вопросов:{" "}
//             <span style={{ color: "#a43af8" }}>
//               {Number(level.totalQuestion) < 10
//                 ? `0${level.totalQuestion}`
//                 : level.totalQuestion}
//             </span>
//           </h4>
//           <h4>
//             Допустимое количество ошибок:{" "}
//             <span style={{ color: "#a43af8" }}>
//               {Number(level.totalMark) < 10
//                 ? `0${level.totalMark}`
//                 : level.totalMark}
//             </span>
//           </h4>
//           <h4>
//             Количество времени:{" "}
//             <span style={{ color: "#a43af8" }}>
//               {Number(level.totalTime) < 10
//                 ? `0${level.totalTime}`
//                 : level.totalTime}
//             </span>
//           </h4>
//           <button
//             onClick={() =>
//               navigate("/quiz/display-quiz", {
//                 state: level,
//               })
//             }
//           >
//             Начать тест
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="quizLevel">
//       <div className="heading">
//         <h1>Уровни тестов</h1>
//       </div>

//       {data.map((value, index) => (
//         <div className="box" key={index}>
//           {renderLevel(value.level01, "/quiz/display-quiz")}
//           {renderLevel(value.level02, "/quiz/display-quiz")}
//           {renderLevel(value.level03, "/quiz/display-quiz")}
//         </div>
//       ))}
//     </section>
//   );
// }
