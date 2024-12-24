import loadImage from "../../assets/load.png";
import reloadImage from "../../assets/reload.svg";

import "./assets/loading-page.css";
import {useNavigate} from "react-router";
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
import {StatusElma} from "../../api/MainDTO.ts";
import {useEffect, useState} from "react";


function LoadingPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [data, setData] = useState<any>({});
    const [freeze, setFreeze] = useState(false);

    const {LoanApi} = useLoanContext();

    const checkStatusElma = () => {
        setFreeze(true);
        LoanApi.getApplicationIssued({applicationId: params.get("applicationId")}).then(res => {
            setData(res.data)
            switch (res.data.status) {
                case StatusElma.NEW:
                    return navigate("/status/error");
                case StatusElma.CARD_CHECK:
                    return;
                case StatusElma.FREEZE:
                    return navigate("/status/katm");
                case StatusElma.AML_TRUE:
                    return navigate("/status/aml");
                case StatusElma.CARD_MATCH:
                    return navigate("/card/status/success");
                case StatusElma.ISSUED:
                    return navigate("/application/issued");
                case StatusElma.FREEZE_REQUEST_CANCEL:
                    return navigate("/status/error");
                case StatusElma.SCORING_FAIL:
                    return navigate("/status/reject");
                case StatusElma.SCORING_PROCESS:
                    return;
                case StatusElma.ISSUED_PROCESS:
                    return;
                case StatusElma.CARD_NOT_MATCH:
                    return navigate("/status/error");
                case StatusElma.SCORING_SUCCESS:
                    return navigate("/status/accept");
                case StatusElma.REQUEST_CANCEL:
                    return navigate("/status/error");
                case StatusElma.REQUEST_ACCEPTED:
                    return;
                default:
                    return
            }
        })
    }

    useEffect(() => {
        checkStatusElma();
    }, []);

    useEffect(() => {
        if (freeze) {
           const timer =  setTimeout(() => {
                setFreeze(false);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [freeze]);
    return (
        <div className="loading-page-layout">
            <div className="loading-page-header">
                <button disabled={freeze} className="" onClick={checkStatusElma}>
                    <span>Обновить</span>
                    <img src={reloadImage} alt=""/>
                </button>
            </div>
            <div className="loading-page-wrapper">
                <div className="loading-page-body">
                    <h3>Заявка №{data.id} в процессе</h3>
                    <img src={loadImage} alt="loadImage"/>
                </div>
                <div className="loading-page-footer">
                    <button onClick={() => navigate("/")}>
                        <span>На главный экран</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;