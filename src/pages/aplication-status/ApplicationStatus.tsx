import "./assets/application-status.css";

import sendIcon from "../../assets/send.png";
import eyeIcon from "../../assets/eye.png";
import loaderIcon from "../../assets/loader.png";
import creditCardIcon from "../../assets/credit-card.png";
import checkSquareIcon from "../../assets/check-square.png";
import checkIcon from "../../assets/checked.png";

const ApplicationStatus = () => {
    const steps = [
        {
            title: "Заявка отправлена",
            description: "23.11.2024 / 17:35",
            completed: true,
            icon: sendIcon,
        },
        {
            title: "Проверка финансовых данных",
            description:
                "Банк проверяет вашу кредитную историю и скоро даст ответ",
            completed: false,
            icon: eyeIcon,
        },
        {
            title: "Получение кредитного лимита",
            description:
                "Кредитный лимит это сумма, которую банк одобрил вам в качестве кредита",
            completed: false,
            icon: loaderIcon,
        },
        {
            title: "Выбор карты и суммы",
            description:
                "Подтвердите сумму кредита и укажите карту, на которую будут зачислены деньги",
            completed: false,
            icon: creditCardIcon,
        },
        {
            title: "Проверка карты",
            description:
                "Зачисление денег возможно только на карту, открытую на ваше имя",
            completed: true,
            icon: checkSquareIcon,
        },
        {
            title: "Получение кредита",
            description:
                "Выбранная сумма кредита будет зачислена на вашу карту в течение 2-х часов",
            completed: true,
            icon: checkIcon,
        },
    ];

    return (
        <section className="status-container ">
            <div className="status-container-wrapper ">
                <h2 className="main-height-container">Заявка №654 в процессе</h2>
                <div className="steps">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${steps?.length === index + 1 ? "completed" : ""}`}
                        >
                            <div className="icon">
                                <img width={20} height={20} src={step.icon} alt=""/>
                            </div>
                            <div className={`content ${index === 1 ? "active" : ""}`}>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="status-container-footer">
                    <p className="notification">
                        Вы получите SMS о новом статусе вашей заявки
                    </p>
                    <button className="close-button">Закрыть</button>
                </div>
            </div>
        </section>
    );
};

export default ApplicationStatus;