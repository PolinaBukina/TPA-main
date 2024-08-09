import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/FirebaseMethods";

import "../../../style/studentRegistrationList.scss";

export default function CourseListHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((_) => {
        console.log(Object.values(_));
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, []);

  const deleteCourse = (getValue, inx) => {
    deleteItem("course", getValue.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, index) => index !== inx));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="CourseList">
      <div className="heading">
        <h1>Размещенные курсы на платформме</h1>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Название курса</th>
              <th>Продолжительность курсов</th>
              <th>Количество занятий</th>
              <th>Публичный</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.courseName}</td>
                    <td>
                      {value.courseDuration} {value.courseDuration === "1" ? "Месяц" : "Месяцев"}
                    </td>

                    <td>{value.noOfQuiz} уроков</td>
                    <td>{value.isPubliclyOpen}</td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
