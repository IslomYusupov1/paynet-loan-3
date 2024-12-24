import rejectImage from "../../assets/reject.png";
import {useSearchParams} from "react-router-dom";

function StatusError() {
    const [params] = useSearchParams();

    return (
        <div className="status-page-layout">
            <div className="status-page-wrapper">
                <div className="status-page-header main-height-container">
                    <h1>Заявка №{params.get("id")}</h1>
                    <div className="status-page-header-amount">
                        <img src={rejectImage} alt="done"/>
                        <span>Ошибка выполнения операции</span>
                    </div>
                </div>
                <div className="status-page-body">
                    <p className="reject-text">К сожалению, произошла ошибка. Попробуйте ещё раз через несколько минут. Если проблема сохраняется, обратитесь в поддержку.</p>
                </div>
                <div className="status-error-page-footer loan-page-footer">
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

export default StatusError;