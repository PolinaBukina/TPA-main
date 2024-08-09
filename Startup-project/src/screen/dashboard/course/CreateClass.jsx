import { useState } from "react";
import { useParams } from "react-router-dom";
import { addItem } from "../../../config/FirebaseMethods";
import toast from "react-hot-toast";

import "../../../style/createLevel.scss";

export default function CreateClass() {
    const [lessons, setLessons] = useState([
        { title: "", content: "" },
        { title: "", content: "" },
        { title: "", content: "" },
        { title: "", content: "" },
        { title: "", content: "" }
    ]);

    const { id } = useParams();

    const handleLessonChange = (index, field, value) => {
        const updatedLessons = lessons.map((lesson, i) => {
            if (i === index) {
                return { ...lesson, [field]: value };
            }
            return lesson;
        });
        setLessons(updatedLessons);
    };

    const handleSubmit = () => {
        addItem({ lessons }, `courseClass/${id}`)
            .then((_) => toast.success("Уроки успешно добавлены!"))
            .catch((_) => toast.error("Ошибка при добавлении уроков."));
    };

    return (
        <section className="add-level" style={{ overflowX: "hidden" }}>
            <div className="heading">
                <h1>Добавление уроков</h1>
            </div>
            {lessons.map((lesson, index) => (
                <div key={index} className="lesson">
                    <h3>Урок {index + 1}</h3>
                    <div className="lessonName">
                        <input
                            type="text"
                            placeholder="Название урока"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                        />
                        <textarea
                            placeholder="Материал урока"
                            value={lesson.content}
                            onChange={(e) => handleLessonChange(index, "content", e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit}>Подтвердить</button>
        </section>
    );
}
