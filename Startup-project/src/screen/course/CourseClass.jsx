import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";
import toast from "react-hot-toast";

import "../../style/courseClass.scss";

export default function CourseClass() {
    let [data, setData] = useState(null);
    let [courseData, setCourseData] = useState(null);
    let [count, setCount] = useState(0);
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        getItem(`courseClass/${id}`)
            .then((_) => {
                let arr = Object.values(_);
                setData(arr);
                console.log(arr);
            })
            .catch((_) => console.log(_));

        getItem(`course/${id}`)
            .then((_) => {
                let arr = Object.values(_);
                setCourseData(arr);
                console.log(arr);
            })
            .catch((_) => console.log(_));
    }, [id]);

    const handleNextLesson = () => {
        if (count < 4) {
            setCount(count + 1);
            document.documentElement.scrollTop = 0
        } else {
            toast.success("Это последний урок!");
            navigate(`success`)
        }
    };

    const handlePrevLesson = () => {
        if (count < 4 && count >= 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="courseClass">
            <div className="box">
                {data && data.length > 0 && courseData && courseData.length > 0 ? (
                    // <div className="box1">
                    <div className="description">
                        <img src={courseData[4]} alt="image not found" />
                        <div className="heading">
                            <h1>Урок {count + 1}</h1>
                        </div>

                        <div className="class">
                            <h1>{data[0].lessons[count].content}</h1>
                            {/* <p>{data[0].lessons[count].title}</p> */}
                            <p dangerouslySetInnerHTML={{ __html: data[0].lessons[count].title.replace(/\n/g, '<br/>') }} />

                            <div className="buttons">
                                <button onClick={handlePrevLesson}>Предыдущий урок</button>
                                <button onClick={handleNextLesson}>Следующий урок</button>
                            </div>
                        </div>
                    </div>
                    // </div>
                ) : (
                    <p>Загрузка урока</p>
                )}

            </div>

        </div>
    );
}
