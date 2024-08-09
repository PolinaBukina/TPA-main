import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../config/FirebaseMethods"; // Используем метод для добавления данных в Firestore
import toast from "react-hot-toast";

// style
// import "../../../style/createReview.scss";

export default function CreateReview() {
    let [review, setReview] = useState({
        name: "",
        text: ""
    });
    let [flag, setFlag] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
        let { value, name } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFlag("Отправка...");
        addItem(review, "reviews") // Добавляем отзыв в коллекцию "reviews"
            .then(() => {
                setFlag("");
                toast.success("Отзыв успешно отправлен!");
                navigate("/thank-you"); // Перенаправляем пользователя на страницу благодарности
            })
            .catch((error) => {
                setFlag("");
                toast.error("Ошибка при отправке отзыва. Попробуйте снова.");
                console.error("Error adding review: ", error);
            });
    };

    return (
        <section className="add-review">
            <div className="heading">
                <h1>Оставить отзыв</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={review.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <textarea
                    name="text"
                    cols="30"
                    rows="10"
                    placeholder="Ваш отзыв"
                    value={review.text}
                    onChange={handleChange}
                    required
                ></textarea>
                <br />
                {flag ? <button disabled>{flag}</button> : <button type="submit">Отправить отзыв</button>}
            </form>
        </section>
    );
}
