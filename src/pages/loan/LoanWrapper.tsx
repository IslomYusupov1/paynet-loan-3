import {ChangeEvent, useMemo, useState} from "react";

// styles
import "./assets/loan.css";

// images
import backIcon from "../../assets/back.png";
import calendarIcon from "../../assets/calendar.png";
import {useSearchParams} from "react-router-dom";

function LoanWrapper() {
    const [changeElement, setChangeElement] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(3);

    const [params] = useSearchParams();

    const progressOfSlider = useMemo(() => {
        return month === 3 ? 0 + "%" : ((month) / 36) * 100 + '%'
    }, [month])
    return (
        <section className="loan-page-layout">
            <div className="loan-page-wrapper">
                {params?.get("step") === "2" ? <>
                    <div className="loan-page-header main-height-container">
                        <img src={backIcon} alt="backIcon"/>
                        <p>Дополнительная информация</p>
                    </div>
                    <div className="loan-page-body-contact">
                        <div className="loan-page-body-contact-content">
                            <p>Контактное лицо 1</p>
                            <div className="filled-input-wrapper">
                                <label className={`label ${changeElement ? "active" : ""}`}>
                                    {/*<label className={`label active`}>*/}
                                    ФИО контактного лица
                                </label>
                                <input
                                    type="text"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="filled-input-wrapper">
                                <label className={`label active`}>
                                    {/*<label className={`label active`}>*/}
                                    Номер телефона
                                </label>
                                <input
                                    type="text"
                                    value="+998"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="filled-input-wrapper">
                                <label className={`label ${changeElement ? "active" : ""}`}>
                                    {/*<label className={`label active`}>*/}
                                    Кем приходится
                                </label>
                                <input
                                    type="text"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                        </div>
                        <div className="loan-page-body-contact-content">
                            <p>Контактное лицо 2</p>
                            <div className="filled-input-wrapper">
                                <label className={`label ${changeElement ? "active" : ""}`}>
                                    {/*<label className={`label active`}>*/}
                                    ФИО контактного лица
                                </label>
                                <input
                                    type="text"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="filled-input-wrapper">
                                <label className={`label active`}>
                                    {/*<label className={`label active`}>*/}
                                    Номер телефона
                                </label>
                                <input
                                    type="text"
                                    value="+998"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                            <div className="filled-input-wrapper">
                                <label className={`label ${changeElement ? "active" : ""}`}>
                                    {/*<label className={`label active`}>*/}
                                    Кем приходится
                                </label>
                                <input
                                    type="text"
                                    // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                    onChange={(e: any) => setChangeElement(e.target.value)}
                                    className="styled-input"
                                    placeholder=" "
                                />
                            </div>
                        </div>
                    </div>
                </> : params?.get("step") === "1" ? <>
                    <div className="loan-page-header main-height-container">
                        <img src={backIcon} alt="backIcon"/>
                        <p>Получить кредит</p>
                    </div>
                    <div className="loan-page-body">
                        <div className="filled-input-wrapper">
                            <label className={`label ${changeElement ? "active" : ""}`}>
                                {/*<label className={`label active`}>*/}
                                Сумма микрозайма
                            </label>
                            <input
                                type="text"
                                // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                onChange={(e: any) => setChangeElement(e.target.value)}
                                className="styled-input"
                                placeholder=" "
                            />
                            <p className="input-info-text">Укажите сумму от 300 000 до 100 000 000 сум</p>
                        </div>
                        <div className="slider-container">
                            <label htmlFor="slider" className="slider-label">Срок кредита</label>
                            <div className="slider-value">{month} мес.</div>
                            <input type="range"
                                   className="slider"
                                   style={{background: `linear-gradient(to right, #00b04f 0%, #00b04f calc(${progressOfSlider} - 20px), #ddd calc(${progressOfSlider} - 20px), #ddd 100%)`}}
                                   onChange={(e: ChangeEvent<HTMLInputElement> | any) => setMonth(e.target.value)}
                                   id="slider" min="3" max="36" step="1" value={month}/>
                            <div className="slider-range">
                                <span>3 мес.</span>
                                <span>36 мес.</span>
                            </div>
                        </div>
                        <div className="month-field">
                            <div className="month-label">
                                <label className="label">Желаемая дата погашения</label>
                                <img src={calendarIcon} alt=""/>
                            </div>
                            <ul className="month-field-select">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </div>
                    </div>
                </> : <></>}
                <div className="loan-page-footer">
                    <div className="checkbox-block">
                        <label className="custom-checkbox" htmlFor="check-btn">
                            <input type="checkbox" id="check-btn"/>
                            <span className="checkbox-mark"></span>
                            <p id="check-btn" className="checkbox-text">Даю согласие на обработку персональных и
                                финансовых
                                данных</p>
                        </label>
                    </div>
                    <button className="">Продолжить</button>
                </div>
            </div>
        </section>
    );
}

export default LoanWrapper;