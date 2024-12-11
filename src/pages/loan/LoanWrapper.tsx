import {ChangeEvent, useMemo, useState} from "react";
// import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
import CustomCalendar from "../../components/ui/calendar/CustomCalendar.tsx";
import ModalPopUp from "../../components/ui/modal/ModalPopUp.tsx";
import {Field, Form, Formik} from "formik";

// styles
import "./assets/loan.css";

// images
import backIcon from "../../assets/back.png";
import calendarIcon from "../../assets/calendar.png";


function LoanWrapper() {
    const [changeElement, setChangeElement] = useState<boolean>(false);
    const [isCalendar, setIsCalendar] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(3);
    const [paymentDate, setPaymentDate] = useState<number | any>(null);

    // const { LoanApi } = useLoanContext();
    const [params] = useSearchParams();

    console.log(paymentDate, 'f')
    const initialValues = useMemo(() => {
        return {
            amount: "",
            // "isAnnuity": true,
            period: 3,
            firstContactPerson: "",
            firstContactPersonPhoneNumber: "",
            firstContactPersonRelationship: "",
            secondContactPerson: "",
            secondContactPersonPhoneNumber: "",
            secondContactPersonRelationship: "",
            // "agreementId": ""

        }
    }, [])
    const progressOfSlider = useMemo(() => {
        return month === 3 ? 0 + "%" : ((month) / 36) * 100 + '%'
    }, [month])

    // const createLoanApplication = useCallback((values: FormikValues) => {
    //     LoanApi.createLoanApplication({
    //         applicationId: params?.get("applicationId") as string,
    //         period: values.period,
    //         amount: values.amount,
    //         firstContactPerson: values.firstContactPerson,
    //         firstContactPersonPhoneNumber: values.firstContactPersonPhoneNumber,
    //         firstContactPersonRelationship: values.firstContactPersonRelationship,
    //         paymentDate: values.paymentDate,
    //         secondContactPerson: values.secondContactPerson,
    //         secondContactPersonPhoneNumber: values.secondContactPersonPhoneNumber,
    //         secondContactPersonRelationship: values.secondContactPersonRelationship,
    //         agreementId: values.agreementId,
    //         isAnnuity: true,
    //     }).then(res => {
    //         console.log(res, 'res')
    //     })
    // }, [])
    return (
        <section className="loan-page-layout">
            <Formik initialValues={initialValues} onSubmit={(e) => console.log(e)}>
                {({ handleSubmit, values, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
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
                                            <label className={`label ${values.amount ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                ФИО контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="amount"
                                                className="styled-input"
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label className={`label active`}>
                                                {/*<label className={`label active`}>*/}
                                                Номер телефона
                                            </label>
                                            <Field
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
                                            <Field
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
                                            <Field
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
                                            <Field
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
                                            <Field
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
                                        <label className={`label ${values.amount ? "active" : ""}`}>
                                            {/*<label className={`label active`}>*/}
                                            Сумма микрозайма
                                        </label>
                                        <Field
                                            type="text"
                                            name="amount"
                                            // value={value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} // Форматирование пробелами
                                            className="styled-input"
                                            placeholder=" "
                                        />
                                        <p className="input-info-text">Укажите сумму от 300 000 до 100 000 000 сум</p>
                                    </div>
                                    <div className="slider-container">
                                        <label htmlFor="slider" className="slider-label">Срок кредита</label>
                                        <div className="slider-value">{values.period} мес.</div>
                                        <Field type="range"
                                               className="slider"
                                               name="period"
                                               style={{background: `linear-gradient(to right, #00b04f 0%, #00b04f calc(${progressOfSlider} - 20px), #ddd calc(${progressOfSlider} - 20px), #ddd 100%)`}}
                                               onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
                                                   setFieldValue("period", e.target.value);
                                                   setMonth(e.target.value)
                                               }}
                                               id="slider" min="3" max="36" step="1"/>
                                        <div className="slider-range">
                                            <span>3 мес.</span>
                                            <span>36 мес.</span>
                                        </div>
                                    </div>
                                    <div className="month-field" onClick={() => setIsCalendar(true)}>
                                        <div className="month-label">
                                            <label className={`label ${paymentDate ? "active" : ""}`}>Желаемая дата погашения</label>
                                            <span>{paymentDate}</span>
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
                                        <p id="check-btn" className="checkbox-text">Даю согласие на обработку
                                            персональных и
                                            финансовых
                                            данных</p>
                                    </label>
                                </div>
                                <button className="">Продолжить</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <ModalPopUp name="calendar" close={() => setIsCalendar(false)} isOpen={isCalendar}>
                <div className="calendar-popup">
                    <CustomCalendar close={() => setIsCalendar(false)} setDate={setPaymentDate}/>
                </div>
            </ModalPopUp>
        </section>
    );
}

export default LoanWrapper;