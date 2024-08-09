import { useState } from "react";
import SMInput from "../../components/SMInput";
import { addItem } from "../../config/FirebaseMethods";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// style
import "../../style/trainerRgisterForm.scss";

export default function TrainerRegisterForm() {
  let [trainerInfo, setTrainerInfo] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    contact: "",
    otherQualification: [],
  });
  let [listOfQualification, setListOfQualification] = useState("");
  let [arr, setArr] = useState([]);
  const navigate = useNavigate()

  const currentV = (e) => {
    let { value, name } = e.target;
    setTrainerInfo((val) => {
      return { ...val, [name]: value };
    });
  };

  const addQuali = () => {
    setArr((val) => [...val, listOfQualification]);
  };

  const allData = () => {
    trainerInfo.otherQualification = arr;
    trainerInfo.coursesAllowed = "false";

    addItem(trainerInfo, "TrainerRegistration")
      .then((_) => {
        toast.success("Регистрация прошла успешно");
        navigate("/")
      })
      .catch((_) => console.log(_));
  };

  const deleteItem = (e) => {
    setArr((val) => val.filter((value, index) => index !== e));
  };

  return (
    <section className="TrainerRegisterForm">
      <div className="heading">
        <h1>Форма регистрации преподавателя 👩‍🏫👨‍🏫</h1>
      </div>

      <form onSubmit={allData}>
        <div className="takeValue">
          <SMInput
            type="text"
            placeholder="Введите ваше имя"
            name="firstName"
            fnName={currentV}
          />
          <SMInput
            type="text"
            placeholder="Введите вашу фамилию"
            name="lastName"
            fnName={currentV}
          />
          <SMInput
            type="text"
            placeholder="Введите квалификацию"
            name="qualification"
            fnName={currentV}
          />
          <div className="otherQualification">

            {arr && (
              <ul>
                {arr.map((value, index) => {
                  return (
                    <div className="children" key={index}>
                      <li>{value}</li>
                      <button onClick={() => deleteItem(index)}>удалить</button>
                    </div>
                  );
                })}
              </ul>
            )}

            <SMInput
              type="text"
              placeholder="Введите другую квалификацию"
              name="listOfQualification"
              fnName={(e) => setListOfQualification(e.target.value)}
            />
            <button onClick={addQuali} type="button">
              Добавить
            </button>
          </div>

          <SMInput
            type="number"
            fnName={currentV}
            name="contact"
            placeholder="Введите ваш номер"
          />
        </div>

        <div className="buttons">
          <button>Подтвердить</button>
        </div>
      </form>
    </section>
  );
}
