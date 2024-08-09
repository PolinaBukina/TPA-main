import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getItem } from "../../config/FirebaseMethods";

// style
// import "../../../style/displayReviews.scss";

export default function DisplayReviews() {
    let [reviews, setReviews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getItem("reviews")
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Ошибка при загрузке отзывов. Попробуйте снова.");
                console.error("Error fetching reviews: ", error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="reviews-section">
            <div className="heading">
                <h1>Отзывы пользователей</h1>
            </div>
            {loading ? (
                <p>Загрузка отзывов...</p>
            ) : reviews.length > 0 ? (
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <h2>{review.name}</h2>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Отзывов пока нет.</p>
            )}
        </section>
    );
}
