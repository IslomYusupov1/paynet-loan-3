import warningImage from "../../assets/warning.png";
import {useSearchParams} from "react-router-dom";

function StatusKatm() {
    const [params] = useSearchParams();

    return (
        <div className="status-page-layout">
            <div className="status-page-wrapper">
                <div className="status-page-header main-height-container">
                    <h1>Заявка №{params?.get("id")}</h1>
                    <div className="status-page-header-amount">
                        <img src={warningImage} alt="done"/>
                        <span>Мы не смогли получить ваши</span>
                        <span>кредитные данные</span>
                    </div>
                </div>
                <div className="status-page-body">
                    <p className="reject-text">Возможно у вас установленно ограничение на предоставление кредитной истории</p>
                    <p className="reject-text">Для продолжения Вам необходимо снять ограничения в Кредитном бюро («Кредитно-информационный аналитический центр»)</p>
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

export default StatusKatm;