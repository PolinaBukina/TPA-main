import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../../config/FirebaseMethods";

import "../../../../style/studentRegisterForm.scss";

export default function StudentRegistrationListHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("StudentRegistration")
      .then((_) => {
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, []);

  const updateStudentRegistrationForm = (value) => {
    navigate("update-student-registration-form", { state: value });
  };

  const deleteStudentRegistration = (value, index) => {
    deleteItem("StudentRegistration", value.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, inx) => inx !== index));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="courseList">
      <div className="heading">
        <h1>Зарегистрированные пользователи</h1>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Имя родителя</th>
              <th>Возраст</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.fatherName}</td>
                    <td>{value.age}</td>
                    <td>{value.registrationDate}</td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
