import backIcon from '../../assets/back.png'
import infoIcon from '../../assets/info.png'

import './assets/contract.css'
// import {useLoanContext} from "../../api/loan/LoanContext.ts";
// import {useEffect, useState} from "react";
// import {useSearchParams} from "react-router-dom";
// import {ApplicationIssuedDTo} from "../../api/loan/LoanDTO.ts";

function Contract() {
    // const { LoanApi } = useLoanContext();
    // const [params] = useSearchParams();
    //
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState<ApplicationIssuedDTo | Record<string, any>>({});
    //
    // useEffect(() => {
    //     setLoading(true);
    //     LoanApi.getApplicationList({userId: params.get("userId")}).then(res => {
    //         setData(res?.data);
    //         setLoading(false);
    //     }).catch(() => {
    //         setLoading(false)
    //     })
    // }, []);
    return (
        <div className="contract-layout">
            <div className="contract-wrapper">
                <div className="contract-header main-height-container">
                    <div className='contract-left'>
                        <img src={backIcon} alt=''/>
                        <h1>Мои кредиты</h1>
                    </div>
                    <div className='contract-rghit'>
                        <img src={infoIcon} alt=''/>
                    </div>
                </div>
            </div>
            <div className='contract-section'>
                <div className='contract-box'>
                    <div className='contract-box-left'>
                        <h3>Договор №351</h3>
                        <p>Активный</p>
                    </div>
                    <div className="contract-box-body">
                        <p className='contract-box-text'>Следующая оплата: 01.01.2025</p>
                        <h1 className='contract-cum'>
                            395 790.70 <span>сум</span>
                        </h1>
                    </div>
                    <p className='contract-box_text'>Остаток долга: 2 667 000 сум</p>
                </div>
                <div className='contract-box'>
                    <div className='contract-box-left'>
                        <h3>Договор №351</h3>
                        <p>Активный</p>
                    </div>
                    <div className="contract-box-body">
                        <p className='contract-box-text'>Следующая оплата: 01.01.2025</p>
                        <h1 className='contract-cum'>
                            395 790.70 <span>сум</span>
                        </h1>
                    </div>
                    <p className='contract-box_text'>Остаток долга: 2 667 000 сум</p>
                </div>
                <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div>
                <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div>
                <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div>
                <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div> <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div> <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div> <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div> <div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div><div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div><div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div><div className='contract-footer'>
                    <p>Договор №351</p>
                    <p>Кредит погашен</p>
                </div>
            </div>
            <div className=" contract-page-footer loan-page-footer">
                    <button type="button"
                        // disabled={!values?.agreementId || loading}
                            className="">
                        <span>Продолжить</span>
                        {/*{loading && <LoaderSpin/>}*/}
                    </button>
            </div>
        </div>
    )
}

export default Contract
