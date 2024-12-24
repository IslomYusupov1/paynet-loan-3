import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
// import CustomCalendar from "../../components/ui/cxalendar/CustomCalendar.tsx";
import ModalPopUp from "../../components/ui/modal/ModalPopUp.tsx";
import {Field, Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";

// styles
import "./assets/loan.css";

// images
import backIcon from "../../assets/back.png";
import calendarIcon from "../../assets/calendar.png";
import downIcon from "../../assets/down.png";
import vector from "./../../assets/vector.png";
import {useNavigate} from "react-router";
import LoaderSpin from "../../components/loader/LoaderSpin.tsx";
import {useKeyboardAwareScroll} from "../../helpers/UseActiveElementCheck.ts";


function LoanWrapper() {
    const [loading, setLoading] = useState<boolean>(false);
    const [isCalendar, setIsCalendar] = useState<boolean>(false);
    const [isRelation, setIsRelation] = useState<boolean>(false);
    const [isRelation2, setIsRelation2] = useState<boolean>(false);
    const [relations, setRelations] = useState({first: "", second: ""});
    const [relationsValid, setRelationsValid] = useState({ first: false, second: false });
    const [month, setMonth] = useState<number>(3);
    const [paymentDate, setPaymentDate] = useState<number | any>(null);

    const {LoanApi} = useLoanContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useKeyboardAwareScroll();
    const formatNumber = (num: string) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const cleanNumber = (num: string) => {
        return num.replace(/\s/g, "");
    };

    const initialValues = useMemo(() => {
        return {
            amount: "",
            isAnnuity: true,
            period: 3,
            firstContactPersonFirstName: "",
            firstContactPersonLastName: "",
            firstContactPersonMiddleName: "",
            secondContactPersonLastName: "",
            secondContactPersonFirstName: "",
            secondContactPersonMiddleName: "",
            firstContactPersonPhoneNumber: "+998",
            firstContactPersonRelationship: "",
            secondContactPersonPhoneNumber: "+998",
            secondContactPersonRelationship: "",
            agreementId: ""
        }
    }, [])

    const validationSchemaStep =
        () =>
            Yup.object().shape({
                amount: Yup.string().nullable().required("Обязательное поле"),
                firstContactPersonFirstName: Yup.string().nullable().required("Обязательное поле"),
                firstContactPersonLastName: Yup.string().nullable().required("Обязательное поле"),
                firstContactPersonMiddleName: Yup.string().nullable().required("Обязательное поле"),
                firstContactPersonPhoneNumber: Yup.string().min(13).required("Обязательное поле"),
                secondContactPersonFirstName: Yup.string().nullable().required("Обязательное поле"),
                secondContactPersonLastName: Yup.string().nullable().required("Обязательное поле"),
                secondContactPersonMiddleName: Yup.string().nullable().required("Обязательное поле"),
                secondContactPersonPhoneNumber: Yup.string().min(13).required("Обязательное поле"),
            })

    const progressOfSlider = useMemo(() => {
            return month === 3 ? 0 + "%" : ((month) / 36) * 100 + '%'
        }, [month])
    const createLoanApplication = useCallback((values: FormikValues) => {
        if (!relations.first || !relations.second) {
            if (!relations.first) {
                setRelationsValid({ ...relationsValid, first: true })
            }
            if (!relations.second) {
                setRelationsValid({ ...relationsValid, second: true })
            }
            return
        }
        setLoading(true);
        const amount: string = values.amount?.replace(/\s/g, "")
        LoanApi.createLoanApplication({
            applicationId: params?.get("applicationId") as string,
            period: Number(values.period),
            amount: Number(amount) * 100,
            firstContactPersonFirstName: values.firstContactPersonFirstName,
            firstContactPersonLastName: values.firstContactPersonLastName,
            firstContactPersonMiddleName: values.firstContactPersonMiddleName,
            secondContactPersonLastName: values.secondContactPersonLastName,
            secondContactPersonFirstName: values.secondContactPersonFirstName,
            secondContactPersonMiddleName: values.secondContactPersonMiddleName,
            firstContactPersonPhoneNumber: values.firstContactPersonPhoneNumber,
            firstContactPersonRelationship: relations?.first,
            paymentDate: paymentDate,
            secondContactPersonPhoneNumber: values.secondContactPersonPhoneNumber,
            secondContactPersonRelationship: relations?.second,
            agreementId: values.agreementId,
            isAnnuity: true,
        }).then(() => {
            setLoading(false);
            navigate(`/status/process?applicationId=${params?.get("applicationId")}`)
        }).catch(() => {
            navigate("/status/error");
            setLoading(false);
        })
    }, [relations])

    return (
        <section className="loan-page-layout">
            <Formik initialValues={initialValues}
                    onSubmit={(e) => createLoanApplication(e)}
                    validationSchema={validationSchemaStep}
                    enableReinitialize={false}
            >
                {({handleSubmit, values, setFieldValue, errors, touched}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="loan-page-wrapper">
                            {params?.get("step") === "2" ? <>
                                <div className="loan-page-header main-height-container">
                                    <img src={backIcon} alt="backIcon" onClick={() => setSearchParams({
                                        ...Object.fromEntries(searchParams),
                                        step: "1"
                                    })}/>
                                    <p>Дополнительная информация</p>
                                </div>
                                <div className="loan-page-body-contact">
                                    <div className="loan-page-body-contact-content">
                                        <p>Контактное лицо 1</p>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.firstContactPersonFirstName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Имя контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="firstContactPersonFirstName"
                                                className={`styled-input ${touched.firstContactPersonFirstName && errors.firstContactPersonFirstName ? "required" : ""}`}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.firstContactPersonLastName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Фамилия контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="firstContactPersonLastName"
                                                className={`styled-input ${touched.firstContactPersonLastName && errors.firstContactPersonLastName ? "required" : ""}`}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.firstContactPersonMiddleName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Отчество контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="firstContactPersonMiddleName"
                                                className={`styled-input ${touched.firstContactPersonMiddleName && errors.firstContactPersonMiddleName ? "required" : ""}`}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label className={`label active`}>
                                                Номер телефона
                                            </label>
                                            <Field
                                                type="text"
                                                name="firstContactPersonPhoneNumber"
                                                value={values.firstContactPersonPhoneNumber}
                                                className={`styled-input ${touched.firstContactPersonPhoneNumber && errors.firstContactPersonPhoneNumber ? "required" : ""}`}
                                                placeholder=" "
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 13) {
                                                        setFieldValue("firstContactPersonPhoneNumber", value)
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className={`month-field ${relationsValid.first && "required"}`}
                                             onClick={() => setIsRelation(true)}>
                                            <div className="month-label">
                                                <label className={`label ${relations.first ? "active" : ""}`}>Кем
                                                    приходится</label>
                                                <span>{relations?.first}</span>
                                                <img src={downIcon} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="loan-page-body-contact-content">
                                        <p>Контактное лицо 2</p>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.secondContactPersonFirstName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Имя контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="secondContactPersonFirstName"
                                                className={`styled-input ${touched.secondContactPersonFirstName && errors.secondContactPersonFirstName ? "required" : ""}`}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.secondContactPersonLastName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Фамилия контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="secondContactPersonLastName"
                                                className={`styled-input ${touched.secondContactPersonLastName && errors.secondContactPersonLastName ? "required" : ""}`}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="filled-input-wrapper">
                                            <label
                                                className={`label ${values.secondContactPersonMiddleName ? "active" : ""}`}>
                                                {/*<label className={`label active`}>*/}
                                                Отчество контактного лица
                                            </label>
                                            <Field
                                                type="text"
                                                name="secondContactPersonMiddleName"
                                                className={`styled-input ${touched.secondContactPersonMiddleName && errors.secondContactPersonMiddleName ? "required" : ""}`}
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
                                                inputMode="numeric"
                                                name="secondContactPersonPhoneNumber"
                                                value={values?.secondContactPersonPhoneNumber}
                                                className={`styled-input ${touched.secondContactPersonPhoneNumber && errors.secondContactPersonPhoneNumber ? "required" : ""}`}
                                                placeholder=" "
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 13) {
                                                        setFieldValue("secondContactPersonPhoneNumber", value)
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className={`month-field ${relationsValid.second && "required"}`}
                                             onClick={() => setIsRelation2(true)}>
                                            <div className="month-label">
                                                <label className={`label ${relations?.second ? "active" : ""}`}>Кем
                                                    приходится</label>
                                                <span>{relations?.second}</span>
                                                <img src={downIcon} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : params?.get("step") === "1" ? <>
                                <div className="loan-page-header main-height-container">
                                    <img src={backIcon} alt="backIcon" onClick={() => navigate("/")}/>
                                    <p>Получить кредит</p>
                                </div>
                                <div className="loan-page-body">
                                    <div className={`filled-input-wrapper`}>
                                        <label className={`label ${values.amount ? "active" : ""}`}>
                                            {/*<label className={`label active`}>*/}
                                            Сумма микрозайма
                                        </label>
                                        <Field
                                            type="string"
                                            inputMode="numeric"
                                            name="amount"
                                            onChange={(e: any) => {
                                                const inputValue = e.target.value
                                                const cleanedValue = cleanNumber(inputValue)
                                                if (/^\d*$/.test(cleanedValue)) {
                                                    setFieldValue("amount", formatNumber(cleanedValue))
                                                }
                                            }}
                                            className={`styled-input ${touched.amount && errors.amount ? "required" : ""}`}
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
                                            <label className={`label ${paymentDate ? "active" : ""}`}>Желаемая дата
                                                погашения</label>
                                            <span>{paymentDate}</span>
                                            <img src={calendarIcon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </> : <></>}
                            <div className="loan-page-footer">
                                <div className={`checkbox-block ${params?.get("step") === "2" ? "" : "hidden"}`}>
                                    <label className="custom-checkbox" htmlFor="check-btn">
                                        <input type="checkbox" id="check-btn"
                                               onChange={(e) => setFieldValue("agreementId", e.target.checked ? 1 : "")}/>
                                        <span className="checkbox-mark"></span>
                                        <p id="check-btn" className="checkbox-text">Даю согласие на обработку
                                            персональных и
                                            финансовых
                                            данных</p>
                                    </label>
                                </div>
                                {params?.get("step") === "1" ?
                                    <button type="button" onClick={() =>
                                        setSearchParams({...Object.fromEntries(searchParams), step: "2"})}
                                            disabled={!paymentDate || !values?.amount}>Продолжить</button> :
                                    <button type="submit"
                                            disabled={!values?.agreementId || loading}
                                            className="">
                                        <span>Продолжить</span>
                                        {loading && <LoaderSpin/>}
                                    </button>
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            {/*<ModalPopUp bodyScroll={true} name="calendar" overlay={true} close={() => setIsCalendar(false)}*/}
            {/*            isOpen={isCalendar}>*/}
            {/*    <div className="loan-day-picker">*/}
            {/*        {Array.from({length: 19}, (_, i) => (*/}
            {/*            <h3 key={i + 1}>*/}
            {/*                {i + 1}*/}
            {/*            </h3>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</ModalPopUp>*/}
            <div onClick={() => setIsCalendar(false)} className={`overlay ${isCalendar ? "open" : ""}`}/>
            <div>
                <div className={`select-options ${isCalendar ? "open" : ""}`}>
                    <img src={vector} alt=""/>
                    <div className="modal-body" style={{ overflow: "auto" }}>
                        {Array.from({length: 20}, (_, i) => (
                            <label id="" className={i === 0 ? "mt" : ""} key={i} onClick={() => {
                                setPaymentDate(i + 1);
                                setIsCalendar(false);
                            }}>
                                <span style={{ marginLeft: "10px" }}>{i + 1}</span>
                                <div className="custom-radio">
                                    <input checked={paymentDate === i + 1} id={`check-${i + 1}`} type="radio"
                                           name="option"/>
                                    <span className="radio-circle"></span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <ModalPopUp name="relation" overlay={true} close={() => {
                setIsRelation(false);
                setIsRelation2(false)
            }} isOpen={isRelation || isRelation2}>
                <div className="relation-content-popup">
                    <div onClick={() => {
                        setRelations(isRelation ? {...relations, first: "Мать"} : {
                            ...relations,
                            second: "Мать"
                        })
                        setIsRelation(false);
                        setIsRelation2(false);
                        setRelationsValid(isRelation ? {...relationsValid, first: false} : {
                            ...relationsValid,
                            second: false
                        });
                    }}>
                      <span>
                        Мать
                      </span>
                    </div>
                    <div onClick={() => {
                        setRelations(isRelation ? {...relations, first: "Отец"} : {
                            ...relations,
                            second: "Отец"
                        })
                        setIsRelation(false);
                        setIsRelation2(false);
                        setRelationsValid(isRelation ? {...relationsValid, first: false} : {
                            ...relationsValid,
                            second: false
                        });
                    }}>
                        <span>
                            Отец
                        </span>
                    </div>
                    <div onClick={() => {
                        setRelations(isRelation ? {...relations, first: "Брат или сестра"} : {
                            ...relations,
                            second: "Брат или сестра"
                        })
                        setIsRelation(false);
                        setIsRelation2(false);
                        setRelationsValid(isRelation ? {...relationsValid, first: false} : {
                            ...relationsValid,
                            second: false
                        });
                    }}>
                        <span>
                            Брат или сестра
                        </span>
                    </div>
                    <div onClick={() => {
                        setRelations(isRelation ? {...relations, first: "Супруг/супруга"} : {
                            ...relations,
                            second: "Супруг/супруга"
                        })
                        setIsRelation(false);
                        setIsRelation2(false);
                        setRelationsValid(isRelation ? {...relationsValid, first: false} : {
                            ...relationsValid,
                            second: false
                        });
                    }}>
                        <span>
                            Супруг/супруга
                        </span>
                    </div>
                </div>
            </ModalPopUp>
        </section>
    );
}

export default LoanWrapper;