import backIcon from "../../assets/back.png";
import cashIcon from "../../assets/cash.png";
import identify from "../../assets/identify.png";

import "../loan/assets/loan.css";

import LoaderSpin from "../../components/loader/LoaderSpin.tsx";
import ModalPopUp from "../../components/ui/modal/ModalPopUp.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useIdentifyContext} from "../../api/identify/IdentifyContext.ts";
import {useSearchParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function Terms() {
    const [openSelect, setOpenSelect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState<Record<string, any>>({});

    const navigate = useNavigate();
    const {IdentifyApi} = useIdentifyContext();
    const [params] = useSearchParams();

    const getSessionId = async () => {
        setLoading(true);
        await IdentifyApi.getSessionId({applicationId: params?.get("applicationId") as string, firstTime: true}).then(res => {
            setLoading(false);
            navigate(`/identify?&applicationId=${params?.get("applicationId")}&sessionId=${res.data.sessionId}&birthDate=${res.data.birthDate}&pinfl=${res.data.pinfl}&locale=${res.data.locale}`);
        }).catch(() => {
            navigate("/status/error");
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoadingData(true);
        IdentifyApi.getLoanProduct({ lang: "ru" }).then(res => {
            setData(res?.data);
            setLoadingData(false)
        }).catch(() => {
            navigate("/status/error");
            setLoadingData(false);
        })
    }, [])

    return (
        <section className="term-page-layout">
            <div className="term-page-wrapper">
                <div className="loan-page-header main-height-container">
                    <img src={backIcon} alt="backIcon"/>
                    <p>Микрозайм</p>
                </div>
                <div className="term-page-header">
                    <div className="term-page-header-img">
                        <img src={cashIcon} alt=""/>
                    </div>
                    {loadingData ? <Skeleton height={62}/> : <h2>{data?.name}</h2> }
                    <span>Узнайте свой кредитный лимит и  получите до 100 млн. сум в течении 2-х часов</span>
                </div>
                <div className="term-page-body">
                    <div>
                        <span>Сумма</span>
                        {loadingData ? <Skeleton width={100} />: <p>до {data?.maxValue / 100000000} млн. сум</p>}
                    </div>
                    <div>
                        <span>Процентная ставка</span>
                        <p>от 28% годовых</p>
                    </div>
                    <div>
                        <span>Срок</span>
                        <p>12 мес.</p>
                    </div>
                    <div>
                        <span>Тип погашения</span>
                        <p>Аннуитет</p>
                    </div>
                </div>
                <div className="loan-page-footer">
                    <div className="checkbox-block">
                        <label className="custom-checkbox" htmlFor="check-btn">
                            <input type="checkbox" id="check-btn"/>
                            <span className="checkbox-mark"></span>
                            <p id="check-btn" className="checkbox-text">Ознакомлен(а) с общими условиями микрозайма</p>
                        </label>
                    </div>
                    <button type="submit"
                            onClick={() => setOpenSelect(true)}
                        // disabled={!values?.agreementId}
                            className="">Продолжить
                    </button>
                </div>
            </div>
            <ModalPopUp overlay={true} close={() => setOpenSelect(false)} isOpen={openSelect}>
                <div className="identify-popup-content">
                    <img src={identify} alt=""/>
                    <h2>Пройдите быструю идентификацию в MyID</h2>
                    <p>Для продолжения нам необходимо убедится что это действительно вы</p>
                    <button disabled={loading} onClick={getSessionId}>
                        <span>Пройти идентификацию</span>
                        {loading && <LoaderSpin/>}
                    </button>
                </div>
            </ModalPopUp>
        </section>
    );
}

export default Terms;