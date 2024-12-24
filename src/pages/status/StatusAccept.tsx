import "./assets/status.css";
import "../loan/assets/loan.css";

import downloadImage from "../../assets/download.png";
import doneImage from "../../assets/done.png";
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ApplicationIssuedDTo} from "../../api/loan/LoanDTO.ts";
import Skeleton from "react-loading-skeleton";
import {useIdentifyContext} from "../../api/identify/IdentifyContext.ts";
import {useNavigate} from "react-router";
import ModalPopUp from "../../components/ui/modal/ModalPopUp.tsx";
import identify from "../../assets/identify.png";
import LoaderSpin from "../../components/loader/LoaderSpin.tsx";

// import LoaderSpin from "../../components/loader/LoaderSpin.tsx";

function StatusAccept() {
    const {LoanApi} = useLoanContext();
    const {IdentifyApi} = useIdentifyContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [data, setData] = useState<ApplicationIssuedDTo | Record<string, any>>({});
    const [openSelect, setOpenSelect] = useState(false);

    const formatNumber = (num: string) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const cleanNumber = (num: string) => {
        return num.replace(/\s/g, "");
    };

    const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const cleanedValue = cleanNumber(inputValue)
        if (Number(cleanedValue) < 1000 || Number(cleanedValue) > (data?.offer?.offerAmount / 100)) {
            setError(true);
        } else {
            setError(false)
        }
        if (/^\d*$/.test(cleanedValue)) {
            setAmount(formatNumber(cleanedValue))
        }
    }

    const getSessionId = async () => {
        setLoadingBtn(true);
        await IdentifyApi.getSessionId({applicationId: params?.get("applicationId") as string}).then(res => {
            setLoadingBtn(false);
            navigate(`/card?&applicationId=${params?.get("applicationId")}&sessionId=${res.data.sessionId}&birthDate=${res.data.birthDate}&pinfl=${res.data.pinfl}&locale=${res.data.locale}&type=accept&amount=${amount}&offerType=${data?.offer?.offerType}`);
        }).catch(() => {
            navigate("/status/error");
            setLoadingBtn(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        LoanApi.getApplicationIssued({applicationId: params.get("applicationId")}).then(res => {
            if (res.data?.offer.offerAmount > 0 || res.data?.requestedAmount > 0) {
                if (res?.data?.offer.offerAmount < res?.data?.requestedAmount) {
                    setAmount(formatNumber(String(res?.data?.offer.offerAmount / 100)))
                } else {
                    setAmount(formatNumber(String(res.data.requestedAmount / 100)))
                }
            }
            setData(res?.data);
            setLoading(false);
        }).catch(() => {
            // navigate("/status/error");
            setLoading(false)
        })
    }, []);

    return (
        <div className="status-page-layout">
            <div className="status-page-wrapper">
                <div className="status-page-header main-height-container">
                    <h1>Заявка №{data?.id} в процессе</h1>
                    <div className="status-page-header-amount">
                        <img src={doneImage} alt="done"/>
                        <span>Поздравляем!</span>
                        {data?.offer?.offerType !== 1 &&
                            <span>Вам одобрен лимит до {data?.offer?.offerAmount > 0 ? (data?.offer?.offerAmount / 100).toLocaleString("ru") : 0} сум</span>}
                        {data?.offer?.offerType === 1 &&
                            <span>Вам одобрен лимит до {data?.offer?.offerAmount > 0 ? (data?.offer?.offerAmount / 100).toLocaleString("ru") : 0} сум с</span>
                        }
                        {data?.offer?.offerType === 1 && <span>увеличенным сроком погашения</span>}
                    </div>
                </div>
                <div className="status-page-body">
                    <p className="body-title">Подтвердите сумму в рамках полученного лимита</p>
                    <div className={`filled-input-wrapper`}>
                        <label className={`label active`}>
                            {/*<label className={`label active`}>*/}
                            Сумма микрозайма
                        </label>
                        <input
                            type="string"
                            inputMode="numeric"
                            name="amount"
                            onChange={onChangeAmount}
                            value={amount}
                            className={`styled-input ${error ? "required" : ""}`}
                            placeholder=" "
                        />
                        <p className="input-info-text">От 1 000
                            до {data?.offer?.offerAmount > 0 ? (data?.offer?.offerAmount / 100).toLocaleString("ru") : 0} сум</p>
                    </div>
                    <div className="body-loan-info">
                        <h3>Информация о кредите</h3>
                        <div className="body-loan-info-body">
                            <div className="body-loan-info-body-wrapper">
                                <div className="body-loan-info-body-wrapper-content">
                                    <span>Сумма</span>
                                    {loading ? <Skeleton/> : <p
                                        className='summ'>{data?.offer?.monthlyPayment > 0 ? (data?.offer?.monthlyPayment / 100).toLocaleString("ru") : 0} сум</p>}
                                </div>
                                <div className="body-loan-info-body-wrapper-content">
                                    <span>Годовой процент</span>
                                    {loading ? <Skeleton/> :
                                        <p className='summ'>{data?.offer?.rate > 0 ? data?.offer?.rate * 100 : 0}%
                                            годовых</p>}
                                </div>
                            </div>
                            <div className="body-loan-info-body-wrapper">
                                <div className="body-loan-info-body-wrapper-content">
                                    <span>Срок</span>
                                    {loading ? <Skeleton/> :
                                        <p className={`summ ${data?.offer?.offerType === 1 ? "active-term" : ""}`}>{data?.offer?.term} меc</p>}
                                </div>
                                <div className="body-loan-info-body-wrapper-content">
                                    <span>Дата погашения</span>
                                    {loading ? <Skeleton/> : <p className='summ'>{data?.paymentDay}</p>}
                                </div>
                            </div>
                            <div className="body-loan-info-body-wrapper">
                                <div className="body-loan-info-body-wrapper-content">
                                    <span>Номер телефона</span>
                                    {loading ? <Skeleton/> : <p className='summ'>+{data?.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body-loan-footer">
                        <span>Информационный лист</span>
                        <img src={downloadImage} alt=""/>
                    </div>
                </div>
                <div className="status-page-footer loan-page-footer">
                    <div className={`checkbox-block`}>
                        <label className="custom-checkbox" htmlFor="check-btn">
                            <input type="checkbox" id="check-btn"
                                // onChange={(e) => setFieldValue("agreementId", e.target.checked ? 1 : "")}
                            />
                            <span className="checkbox-mark"></span>
                            <p id="check-btn" className="checkbox-text">Прочитал и согласен с условиями страхового
                                договора</p>
                        </label>
                    </div>
                    <button type="button" onClick={() => setOpenSelect(true)}
                            disabled={error || loadingBtn}
                            className="">
                        <span>Продолжить</span>
                        {/*{loading && <LoaderSpin/>}*/}
                    </button>
                </div>
            </div>
            <ModalPopUp overlay={true} close={() => setOpenSelect(false)} isOpen={openSelect}>
                <div className="identify-popup-content">
                    <img src={identify} alt=""/>
                    <h2>Пройдите быструю идентификацию в MyID</h2>
                    <p>Для продолжения нам необходимо убедится что это действительно вы</p>
                    <button disabled={loadingBtn} onClick={getSessionId}>
                        <span>Пройти идентификацию</span>
                        {loadingBtn && <LoaderSpin/>}
                    </button>
                </div>
            </ModalPopUp>
        </div>
    )
}

export default StatusAccept;