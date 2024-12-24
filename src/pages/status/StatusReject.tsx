import rejectImage from "../../assets/reject.png";
import {useSearchParams} from "react-router-dom";

function StatusReject() {
    const [params] = useSearchParams();

    return (
        <div className="status-page-layout">
            <div className="status-page-wrapper">
                <div className="status-page-header main-height-container">
                    <h1>Заявка №{params?.get("id")}</h1>
                    <div className="status-page-header-amount">
                        <img src={rejectImage} alt="done"/>
                        <span>К сожалению в выдаче кредита</span>
                        <span>отказано</span>
                    </div>
                </div>
                <div className="status-page-body">
                    <p className="reject-text">Вы можете попробовать отправить следующую заявку не раньше чем через 30
                        дней, 11 января 2025 года</p>
                </div>
                <div className="status-page-footer loan-page-footer">
                    <button type="button"
                        // disabled={!values?.agreementId || loading}
                            className="">
                        <span>На главный экран</span>
                        {/*{loading && <LoaderSpin/>}*/}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatusReject;