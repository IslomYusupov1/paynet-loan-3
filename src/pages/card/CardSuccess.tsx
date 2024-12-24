import doneImage from "../../assets/done.png";
import {useSearchParams} from "react-router-dom";

function CardSuccess() {
    const [params] = useSearchParams();
    return (
        <div className="card-page-layout">
            <div className="card-page-wrapper">
                <div className="card-success-page-header main-height-container">
                    <div className="card-success-page-header-amount">
                        <img src={doneImage} alt="done"/>
                        <h2>Заявка №{params?.get("id")}</h2>
                        <h3>Все готово к выдаче кредита</h3>
                        <span>Теперь Вам необходимо позвонить в </span>
                        <span>контакт-центр банка для подтверждения</span>
                        <span>получения кредита</span>
                    </div>
                </div>
                <div className="card-page-footer loan-page-footer">
                    <p>Контакт-центр Asia Alliance Bank:</p>
                    <p>(+998 71) 231-60-00, 1270</p>
                    <button type="button"
                            className="">
                        <span>Позвонить в банк</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardSuccess;