import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateItem } from "../../../config/FirebaseMethods";

export default function UpdateEnrolledStudent() {
  let [data, setData] = useState([]);
  let location = useLocation();

  useEffect(() => {
    setData(location.state);
  }, []);

  const currentV = (e) => {
    let { value, name } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const userInfo = (e) => {
    e.preventDefault();
    console.log(data);
    updateItem(data, "enrolledStudent", data.key)
      .then((_) => console.log(_))
      .catch((_) => console.log(_));
  };

  return (
    <section className="UpdateEnrolledStudent">
      <div className="heading">
        <h1>Update Enrolled Student</h1>
      </div>

      <form onSubmit={userInfo}>
        <input
          type="text"
          placeholder="Введите ваше имя"
          name="firstName"
          value={data.firstName}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Введите вашу фамилию"
          name="lastName"
          value={data.lastName}
          onChange={currentV}
        />
        <input
          type="email"
          placeholder="Введите ваш email"
          name="email"
          value={data.email}
          onChange={currentV}
        />
        <input
          type="number"
          placeholder="Введите ваш номер"
          name="phone"
          value={data.phone}
          onChange={currentV}
        />
        <textarea
          name="address"
          cols="30"
          rows="10"
          placeholder="Введите ваш адрес"
          value={data.address}
          onChange={currentV}
        ></textarea>
        <input
          type="text"
          placeholder="enter city Name"
          name="city"
          value={data.city}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter Zip code"
          name="zipCode"
          value={data.zipCode}
          onChange={currentV}
        />

        <input
          type="text"
          name="course"
          placeholder="Введите название курса"
          value={data.course}
          onChange={currentV}
        />

        <button>update</button>
      </form>
    </section>
  );
}
