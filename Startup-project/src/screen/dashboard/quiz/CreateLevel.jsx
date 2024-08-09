// Чтобы построение кода для уровней "Intermediate" и "Advanced" было таким же, как у "Basic", следует повторить ту же структуру и логику.Вот как можно изменить код:

import { useState } from "react";
import { useParams } from "react-router-dom";
import { addItem } from "../../../config/FirebaseMethods";
import toast from "react-hot-toast";

// style
import "../../../style/createLevel.scss";

export default function AddLevel() {
  let [level1, setLevel1] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });
  let [level2, setLevel2] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });
  let [level3, setLevel3] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });

  let [obj, setObj] = useState({});

  let [flag1, setFlag1] = useState(false);
  let [flag2, setFlag2] = useState(false);
  let [flag3, setFlag3] = useState(false);

  let [question1Add, setQuestion1Add] = useState({
    question: "",
    answer: "",
  });

  let [optionValue, setOptionValue] = useState("");
  let [optionValue1, setOptionValue1] = useState("");
  let [optionValue2, setOptionValue2] = useState("");

  let [question1AddOption, setQuestion1AddOption] = useState([]);
  let [question2AddOption, setQuestion2AddOption] = useState([]);
  let [question3AddOption, setQuestion3AddOption] = useState([]);

  let [totalQuestion, setTotalQuestion] = useState([]);
  let [totalQuestion1, setTotalQuestion1] = useState([]);
  let [totalQuestion2, setTotalQuestion2] = useState([]);

  let { id } = useParams();

  const currentV = (e) => {
    let { value, name } = e.target;
    setLevel1((val) => {
      return { ...val, [name]: value };
    });
    console.log("currentV");
  };

  const basicLevel = (e) => {
    e.preventDefault();
    level1.questions = totalQuestion;
    level1.name = "Базовый уровень";
    console.log(level1);
    setFlag1(true);
    setObj((prev) => ({ ...prev, level01: level1 }));
    obj.level01 = level1;
  };

  const currentV1 = (e) => {
    let { value, name } = e.target;
    setLevel2((val) => {
      return { ...val, [name]: value };
    });
  };

  const intermediateLevel = (e) => {
    e.preventDefault();
    level2.questions = totalQuestion1;
    level2.name = "Средний уровень";
    console.log(level2);
    setFlag2(true);
    setObj((prev) => ({ ...prev, level02: level2 }));
    obj.level02 = level2;
  };

  const currentV2 = (e) => {
    let { value, name } = e.target;
    setLevel3((val) => {
      return { ...val, [name]: value };
    });
  };

  const advanceLevel = (e) => {
    e.preventDefault();
    level3.questions = totalQuestion2;
    level3.name = "Продвинутый уровень";
    console.log(level3);
    setFlag3(true);
    setObj((prev) => ({ ...prev, level03: level3 }));
    obj.level03 = level3;
  };

  const completeData = () => {
    addItem(obj, `levels/${id}`)
      .then((_) => toast.success(_))
      .catch((_) => console.log(_));
  };

  const addQuestion = () => {
    question1Add.option = question1AddOption;
    setTotalQuestion((val) => [...val, question1Add]);
    console.log(totalQuestion);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue("");
    setQuestion1AddOption([]);
  };

  const addOptionInArr = () => {
    setQuestion1AddOption((val) => [...val, optionValue]);
    console.log("question add");
  };

  const addQuestion1 = () => {
    question1Add.option = question2AddOption;
    setTotalQuestion1((val) => [...val, question1Add]);
    console.log(totalQuestion1);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue1("");
    setQuestion2AddOption([]);
  };

  const addOptionInArr1 = () => {
    setQuestion2AddOption((val) => [...val, optionValue1]);
    console.log("question add");
  };

  const addOptionInArr2 = () => {
    setQuestion3AddOption((val) => [...val, optionValue2]);
    console.log("question add");
  };

  const addQuestion2 = () => {
    question1Add.option = question3AddOption;
    setTotalQuestion2((val) => [...val, question1Add]);
    console.log(totalQuestion2);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue2("");
    setQuestion3AddOption([]);
  };

  return (
    <section className="add-level" style={{ overflowX: "hidden" }}>
      <div className="heading">
        <h1>Добавление уровней</h1>
      </div>

      {/* basic level */}
      <div className="basic">
        <div className="heading">
          <h3>Добавить уровень: 01</h3>
          <h4>Базовый уровень</h4>
        </div>
        <div className="questionAdd">
          <form>
            <input
              type="text"
              placeholder="Введите вопрос"
              name="question"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag1}
            />
            <input
              type="text"
              placeholder="Введите верный ответ"
              name="answer"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag1}
            />
            <br />
            <div className="displayQuestion">
              <ul>
                {question1AddOption &&
                  question1AddOption.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="Введите вариант ответа"
              name="addOption"
              onChange={(e) => {
                setOptionValue(e.target.value);
              }}
              disabled={flag1}
            />
            <button type="button" onClick={addOptionInArr} disabled={flag1}>
              Добавить вариант
            </button>

            <div className="buttons">
              <button type="button" onClick={addQuestion} disabled={flag1}>
                Добавить вопрос
              </button>
            </div>

            <ul>
              {totalQuestion &&
                totalQuestion.map((value, index) => {
                  return (
                    <li key={index}>
                      <p>{value.question}</p>
                      <p>{value.answer}</p>
                      <ul>
                        {value.option &&
                          value.option.map((value, index) => {
                            return <li key={index}>{value}</li>;
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>

          </form>
        </div>
        <form onSubmit={basicLevel}>
          <input
            type="number"
            placeholder="Количество вопросов"
            name="totalQuestion"
            onChange={currentV}
            disabled={flag1}
          />
          <input
            type="number"
            placeholder="Время прохождения"
            name="totalTime"
            onChange={currentV}
            disabled={flag1}
          />
          <input
            type="number"
            placeholder="Максимальная оценка"
            name="totalMark"
            onChange={currentV}
            disabled={flag1}
          />

          <button type="submit" disabled={flag1}>
            Add
          </button>
        </form>
      </div>

      {/* intermediate level */}
      <div className="intermediate">
        <div className="heading">
          <h3>Добавить уровень: 02</h3>
          <h4>Средний уровень</h4>
        </div>
        <div className="questionAdd">
          <form>
            <input
              type="text"
              placeholder="Введите вопрос"
              name="question"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag2}
            />
            <input
              type="text"
              placeholder="Введите верный ответ"
              name="answer"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag2}
            />
            <br />
            <div className="displayQuestion">
              <ul>
                {question2AddOption &&
                  question2AddOption.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="Введите вариант ответа"
              name="addOption"
              onChange={(e) => {
                setOptionValue1(e.target.value);
              }}
              disabled={flag2}
            />
            <button type="button" onClick={addOptionInArr1} disabled={flag2}>
              Добавить вариант
            </button>

            <div className="buttons">
              <button type="button" onClick={addQuestion1} disabled={flag2}>
                Добавить вопрос
              </button>
            </div>

            <ul>
              {totalQuestion1 &&
                totalQuestion1.map((value, index) => {
                  return (
                    <li key={index}>
                      <p>{value.question}</p>
                      <p>{value.answer}</p>
                      <ul>
                        {value.option &&
                          value.option.map((value, index) => {
                            return <li key={index}>{value}</li>;
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </form>
        </div>
        <form onSubmit={intermediateLevel}>
          <input
            type="number"
            placeholder="Количество вопросов"
            name="totalQuestion"
            onChange={currentV1}
            disabled={flag2}
          />
          <input
            type="number"
            placeholder="Время прохождения"
            name="totalTime"
            onChange={currentV1}
            disabled={flag2}
          />
          <input
            type="number"
            placeholder="Максимальная оценка"
            name="totalMark"
            onChange={currentV1}
            disabled={flag2}
          />

          <button type="submit" disabled={flag2}>
            Add
          </button>
        </form>
      </div>

      {/* advance level */}
      <div className="advance">
        <div className="heading">
          <h3>Добавить уровень: 03</h3>
          <h4>Продвинутый уровень</h4>
        </div>
        <div className="questionAdd">
          <form>
            <input
              type="text"
              placeholder="Введите вопрос"
              name="question"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag3}
            />
            <input
              type="text"
              placeholder="Введите верный ответ"
              name="answer"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag3}
            />
            <br />
            <div className="displayQuestion">
              <ul>
                {question3AddOption &&
                  question3AddOption.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="Введите вариант ответа"
              name="addOption"
              onChange={(e) => {
                setOptionValue2(e.target.value);
              }}
              disabled={flag3}
            />
            <button type="button" onClick={addOptionInArr2} disabled={flag3}>
              Добавить вариант
            </button>

            <div className="buttons">
              <button type="button" onClick={addQuestion2} disabled={flag3}>
                Добавить вопрос
              </button>
            </div>

            <ul>
              {totalQuestion2 &&
                totalQuestion2.map((value, index) => {
                  return (
                    <li key={index}>
                      <p>{value.question}</p>
                      <p>{value.answer}</p>
                      <ul>
                        {value.option &&
                          value.option.map((value, index) => {
                            return <li key={index}>{value}</li>;
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </form>
        </div>
        <form onSubmit={advanceLevel}>
          <input
            type="number"
            placeholder="Количество вопросов"
            name="totalQuestion"
            onChange={currentV2}
            disabled={flag3}
          />
          <input
            type="number"
            placeholder="Время прохождения"
            name="totalTime"
            onChange={currentV2}
            disabled={flag3}
          />
          <input
            type="number"
            placeholder="Максимальная оценка"
            name="totalMark"
            onChange={currentV2}
            disabled={flag3}
          />

          <button type="submit" disabled={flag3}>
            Добавить
          </button>
        </form>
      </div>

      <button onClick={completeData}>Подтвердить</button>
    </section>
  );
}