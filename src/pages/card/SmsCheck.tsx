import backIcon from "../../assets/back.png";
import resendIcon from "../../assets/resend.png";
import "./assets/card.css";

import OtpInput from "react-otp-input";
import {useEffect, useState} from "react";
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
import Loader from "../../components/loader/Loader.tsx";
import {useNavigate} from "react-router";


function SmsCheck() {
    const [code, setCode] = useState("");
    const [loading, setLoading ] = useState(false);

    const { LoanApi } = useLoanContext();
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const sendSmsCode = () => {
        setLoading(true);
        LoanApi.loanApplicationCodeCheck({
            applicationId: params.get("applicationId"),
            code: code
        }).then(() => {
            setLoading(false);
            navigate(`/status/process?applicationId=${params?.get("applicationId")}`)
        }).catch(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (code.length === 6) {
            sendSmsCode()
        }
    }, [code]);
    return (
        <div className="card-page-layout">
            <div className="card-page-wrapper">
                <div className="card-page-header main-height-container">
                    <img src={backIcon} alt="backIcon" className="cursor-pointer"
                        onClick={() => navigate("/card")}
                    />
                </div>
                <div className="sms-page-body">
                    <div className="sms-page-body-code">
                        <h3>Введите код из смс</h3>
                        <p>Мы отправили на <strong>+998 ** ••• •• •9</strong></p>
                        <OtpInput
                            inputType="tel"
                            value={code}
                            onChange={(e) => setCode(e)}
                            numInputs={6}
                            shouldAutoFocus={true}
                            inputStyle={{
                                // border: code.length === 0 ? "1px solid red" : "",
                                fontSize: "16px",
                                transition: "0.2s",
                                userSelect: "none",
                                borderRadius: "10px",
                            }}
                            containerStyle={{
                                width: "100%",
                                justifyContent: "center",
                                textAlign: "center",
                                gap: "15px",
                            }}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div className="sms-page-body-resend">
                        <img src={resendIcon} alt=""/>
                        <p>Получить код повторно</p>
                        <span>37 сек</span>
                    </div>
                </div>
            </div>
            {loading && <div className="spin-page">
                <Loader/>
            </div>}
        </div>
    );
}

export default SmsCheck;