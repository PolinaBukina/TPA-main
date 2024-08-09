import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/FirebaseMethods";
import toast from "react-hot-toast";

import "../../../style/createCourse.scss";

export default function CreateCourseHome() {
    let [currentValue, setCurrentValue] = useState({
        courseName: "",
        courseDuration: "",
        noOfQuiz: "",
        price: "",
        leadTrainer: "",
        isPubliclyOpen: "yes",
        admissionStart: "",
        admissionEnd: "",
    });
    let [flag, setFlag] = useState("");
    let [image, setImage] = useState("");
    let [id, setId] = useState(null);
    let navigate = useNavigate();

    const currentV = (e) => {
        let { value, name } = e.target;
        setCurrentValue((val) => {
            return { ...val, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFlag("Waiting...");
        uploadImage(image, "images", currentValue, "course")
            .then((_) => {
                setId(_);
                navigate(`add-class/${_}`, { state: { id: _ } });
                setFlag("");
                toast.success("Курс успешно добавлен");
            })
            .catch((error) => {
                setFlag("");
                toast.error("Ошибка загрузки: " + error.message);
            });
    };

    return (
        <section className="add-category">
            <div className="heading">
                <h1>Добавить курс</h1>
            </div>

            <p>
                Здесь вы можете добавить свой авторский курс. Наша
                веб-платформа предлагает пользователям
                удобный и интуитивно понятный интерфейс
                для создания собственных обучающих курсов.
                На этой странице пользователи могут легко
                добавлять и настраивать содержание курса,
                включая уроки, тесты и другие учебные материалы.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Введите название курса"
                    onChange={currentV}
                />
                <input
                    type="number"
                    name="courseDuration"
                    placeholder="Введите длительность курса"
                    onChange={currentV}
                />
                <input
                    type="number"
                    name="noOfQuiz"
                    placeholder="Введите количество уроков"
                    onChange={currentV}
                />
                <input
                    type="text"
                    name="leadTrainer"
                    placeholder="Ведущий курса"
                    onChange={currentV}
                />
                {/* <input
                    type="number"
                    name="price"
                    placeholder="Введите цену"
                    onChange={currentV}
                /> */}
                <h4>Открый доступ к курсу?</h4>
                <select name="isPubliclyOpen" onChange={currentV}>
                    <option value="yes">да</option>
                    <option value="no">нет</option>
                </select>
                <h4>Дата начала</h4>
                <input type="date" name="admissionStart" onChange={currentV} />
                <h4>Дата окончания</h4>
                <input type="date" name="admissionEnd" onChange={currentV} />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {flag ? (
                    <button>{flag}</button>
                ) : (
                    <button className="addCourse">Добавить курс</button>
                )}
            </form>
        </section>
    );
}
