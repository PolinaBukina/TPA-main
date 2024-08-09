import { useEffect, useState } from "react";
import SMDropDown from "../../components/SMDropDown";
import SMInput from "../../components/SMInput";
import { addItem, getItem } from "../../config/FirebaseMethods";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../../style/studentRegisterForm.scss";

export default function StudentRegisterForm() {
  let [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    contact: "",
    // cnic: "",
    fatherName: "",
    // fatherCnic: "",
    fatherContact: "",
    // emergyContact: "",
    dateOfBirth: "",
  });
  let [course, setCourse] = useState([]);
  let [section, setSection] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getItem("Section&Course")
      .then((_) => {
        console.log(_);
        setCourse(_.courseList);
        setSection(_.sectionList);
      })
      .catch((_) => console.log(_));
  }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setUserInfo((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();

    let date = new Date();

    userInfo.age =
      date.getFullYear() - Number(userInfo.dateOfBirth.slice(0, 4));

    userInfo.registrationDate = date.toLocaleDateString();
    userInfo.registrationYear = String(date.getFullYear());

    userInfo.isFeeSubmited = false;
    userInfo.isApproved = false;
    userInfo.active = false;

    console.log(userInfo);

    addItem(userInfo, "StudentRegistration")
      .then((_) => {
        console.log(_);
        toast.success("Успешно зарегистрирован");
        navigate("/")
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="StudentRegisterForm">
      <div className="heading">
        <h1>Форма регистрации учащегося 👨‍🎓👩‍🎓</h1>
      </div>

      <form onSubmit={userData}>
        <div className="takeValue">
          <SMInput
            type="text"
            name="firstName"
            fnName={currentV}
            placeholder="Введите ваше имя"
            condition={true}
          />
          <SMInput
            type="text"
            name="lastName"
            fnName={currentV}
            placeholder="Введите вашу фамилию"
          />
          <SMDropDown
            option={course ?? "not available"}
            name="course"
            fnName={currentV}
            condition={true}
          />
          <SMDropDown
            option={section ?? "not available"}
            name="section"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="number"
            placeholder="Введите ваш номер"
            name="contact"
            fnName={currentV}
            condition={true}
          />
          {/* <SMInput
            type="number"
            placeholder="Enter CNIC"
            name="cnic"
            fnName={currentV}
            condition={true}
          /> */}
          <SMInput
            type="text"
            name="fatherName"
            placeholder="Введите имя родителя"
            fnName={currentV}
            condition={true}
          />
          {/* <SMInput
            type="number"
            name="fatherCnic"
            placeholder="Enter father CNIC"
            fnName={currentV}
          /> */}
          <SMInput
            type="number"
            placeholder="Введите номер телефона родителя"
            name="fatherContact"
            fnName={currentV}
            condition={true}
          />
          {/* <SMInput
            type="number"
            placeholder="Экстернный номер родителя"
            name="emergyContact"
            fnName={currentV}
            condition={true}
          /> */}
          <SMInput type="date" name="dateOfBirth" fnName={currentV} />
        </div>

        <div className="buttons">
          <button>
            Подтвердить
          </button>
        </div>
      </form>
    </section>
  );
}
