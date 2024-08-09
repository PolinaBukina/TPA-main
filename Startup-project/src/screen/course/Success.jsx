import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";
// import "../../style/Success.scss"
import "../../style/courseClass.scss";

export default function Success() {
    let [data, setData] = useState(null);
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        getItem(`course/${id}`)
            .then((_) => {
                let arr = Object.values(_);
                setData(arr);
                console.log(arr);
            })
            .catch((_) => console.log(_));
    }, [id]);

    const handleGoToCourse = () => {
        navigate(`/course`)
    };

    const handleGoToTest = () => {
        navigate(`/quiz`)
    };

    return (
        <div className="courseClass">
            <div className="box">
                {data && data.length > 0 ? (
                    <div className="description">
                        <img src={data[4]} alt="image not found" />

                        <div className="class">
                            <h1>Вы успешно прошли наш курс "{data[3]}"</h1>

                            <div className="buttons">
                                <button onClick={handleGoToCourse}>Перейти к курсам</button>
                                <button onClick={handleGoToTest}>Перейти к тестам</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Загрузка результата</p>
                )}
            </div>
            {/* <h1>Вы успешно прошли курс</h1> */}
        </div>
    )
}
