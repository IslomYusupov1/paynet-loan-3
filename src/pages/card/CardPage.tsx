import InputMask from "react-input-mask";
import "./assets/card.css";


import backIcon from "../../assets/back.png";
import clearIcon from "../../assets/clear.png";
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router";
import LoaderSpin from "../../components/loader/LoaderSpin.tsx";

function CardPage() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [loading, setLoading] = useState(false);

    const {LoanApi} = useLoanContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const changeCardExpire = (value: string) => {
        if (value.length > 0 && Number(value.slice(0, 2)) > 12) {
            return "0" + value.slice(0, 1)
        }
    }


    const sendCardDetailsToCheck = () => {
        const pan = cardNumber.replace(/\s/g, "")
        const expiry = cardExpiry?.split("/")
        const amountFromUrl = params.get("amount")?.replace(" ", "");
        setLoading(true);
        LoanApi.loanApplicationCheck({
            amount: params.get("amount") ? Number(amountFromUrl) * 100 : null,
            pan: pan,
            expiry: expiry[1]?.replace(" ", "") + expiry[0]?.replace(" ", ""),
            applicationId: params.get("applicationId"),
            offerType: Number(params?.get("offerType"))
        }).then(() => {
            setLoading(false);
            navigate(`/sms-check?applicationId=${params?.get("applicationId")}`);
        }).catch(() => {
            setLoading(false);
        })
    }

    return (
        <div className="card-page-layout">
            <div className="card-page-wrapper">
                <div className="card-page-header main-height-container">
                    <img src={backIcon} alt="backIcon"
                        // onClick={() => setSearchParams({...Object.fromEntries(searchParams), step: "1"})}
                    />
                    <p>Получить кредит</p>
                </div>
                <div className="card-page-body">
                    <p>
                        Укажите номер дебетовой карты, на которую вы хотите получить деньги.
                    </p>
                    <p>
                        Карта должна быть открыта на ваше имя
                    </p>
                    <div className={`filled-input-wrapper`}>
                        <label className={`label active`}>
                            {/*<label className={`label active`}>*/}
                            Номер карты
                        </label>
                        <InputMask
                            className={`styled-input`}
                            maskChar={null}
                            type="tel"
                            mask="9999 9999 9999 9999"
                            value={cardNumber}
                            placeholder="0000 0000 0000 0000"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCardNumber(e.target.value)
                            }
                        />
                        <img src={clearIcon} alt=""/>
                    </div>
                    <div className={`filled-input-wrapper `}>
                        <label className={`label active`}>
                            {/*<label className={`label active`}>*/}
                            Срок действия
                        </label>
                        <InputMask
                            className="styled-input"
                            maskChar={null}
                            type="tel"
                            mask="99 / 99"
                            // ref={ref}
                            value={changeCardExpire(cardExpiry)}
                            placeholder="мм/гг"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCardExpiry(e.target.value)
                            }
                        />
                        <img src={clearIcon} alt=""/>
                    </div>
                </div>
                <div className="card-page-footer loan-page-footer">
                    <p>Вы получите SMS о новом статусе вашей заявки</p>
                    <button type="button"
                            onClick={sendCardDetailsToCheck}
                            disabled={cardNumber?.length === 0 || cardExpiry.length === 0 || loading}
                            className="">
                        <span>Продолжить</span>
                        {loading && <LoaderSpin/>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardPage;