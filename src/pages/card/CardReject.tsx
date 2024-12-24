import rejecetIcon from "../../assets/reject.png";
import InputMask from "react-input-mask";
import clearIcon from "../../assets/clear.png";
import {useSearchParams} from "react-router-dom";

function CardReject() {
    const [params] = useSearchParams();
    return (
        <div className="card-page-layout">
            <div className="card-page-wrapper">
                <div className="card-reject-page-header main-height-container">
                    <div className="card-reject-page-header-amount">
                        <img src={rejecetIcon} alt="done"/>
                        <h2>Отказано</h2>
                        <h3>К сожалению указаннная Вами карта </h3>
                        <h3 className="last-h3">выпущена не на Ваше имя.</h3>
                        <span>Пожалуйста укажите другую карту,</span>
                        <span>которая открыта на Ваше имя</span>
                    </div>
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
                            // value={cardNumber}
                            placeholder="0000 0000 0000 0000"
                            // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            //     setCardNumber(e.target.value)
                            // }
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
                            // value={changeCardExpire(cardExpire)}
                            placeholder="мм/гг"
                            // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            //     setCardExpire(e.target.value)
                            // }
                        />
                        <img src={clearIcon} alt=""/>
                    </div>
                </div>
                <div className="card-page-footer loan-page-footer">
                    <p>Вы получите SMS о новом статусе вашей заявки</p>
                    <button type="button"
                            className="">
                        <span>Продолжить</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardReject;