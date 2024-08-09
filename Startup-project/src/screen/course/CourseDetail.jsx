import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";
import "../../style/courseDetail.scss";

export default function CourseDetail() {
  let [data, setData] = useState(null);
  let [item, setItem] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    course: "",
  });
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setData(location.state);
    console.log(location.state)
  }, [location.state]);

  const userInfo = (e) => {
    e.preventDefault();

    item.course = data.courseName;
    item.admissionStart = data.admissionStart;
    item.admissionEnd = data.admissionEnd;

    addItem(item, "enrolledStudent")
      .then((_) => console.log(_))
      .catch((_) => console.log(_));
  };

  return (
    <section className="courseDetail">
      {data ? (
        <div className="detail">
          <div className="courseDescription">
            <div className="course-detail">
              <h1>{data.courseName}</h1>
              <p>
                Наша цель - сделать IT образование максимально практическим и прикладным,
                чтобы уже после курсов студенты получили знания и навыки достаточные для
                трудоустройства в IT компании Беларуси и мира.
              </p>
            </div>

            <div className="courseDuration">
              <h4>
                Длительность курсов:{" "}
                <span style={{ color: "#a43af8" }}>
                  {data.courseDuration} месяцев{" "}
                </span>
              </h4>
            </div>

            <div className="noOfQuiz">
              <h4>
                Тесты:{" "}
                <span style={{ color: "#a43af8" }}>
                  {Number(data.noOfQuiz) < 10
                    ? `${data.noOfQuiz}`
                    : data.noOfQuiz}
                </span>
              </h4>
            </div>

            <div className="leadTrainer">
              <h4>
                Ведущий курса:{" "}
                <span style={{ color: "#a43af8" }}>{data.leadTrainer}</span>
              </h4>
            </div>

            <button className="btnStart" onClick={() => navigate(`course-class/${data.key}`)}>
              Начать обучение
            </button>
          </div>
          <div className="courseImage">
            <img src={data.image} alt="image not found" />
          </div>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </section>
  );
}
