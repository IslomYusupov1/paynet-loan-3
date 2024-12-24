import {useEffect, useState} from 'react';
import {useLoanContext} from "../../api/loan/LoanContext.ts";
import {useSearchParams} from "react-router-dom";
import {ApplicationIssuedDTo} from "../../api/loan/LoanDTO.ts";
import backIcon from "../../assets/back.png";
import Skeleton from "react-loading-skeleton";
import doneImage from "../../assets/done.png";
import downLoadIcon from "../../assets/download.png";

import "./assets/contract.css";

function Application() {
    const {LoanApi} = useLoanContext();
    const [params] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ApplicationIssuedDTo | Record<string, any>>({});

    function downloadFile(url: string, fileName: string) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl); // Освобождаем память
            })
            .catch(error => {
                console.error('Ошибка скачивания:', error);
            });
    }


    const fileType = (url: string) => {
        if (url?.length > 0) {
            const splitted = url?.split(".");
            return splitted[splitted?.length - 1]
        }
    }
    useEffect(() => {
        if (params?.get("applicationId") !== null) {
            setLoading(true);
            LoanApi.getApplicationIssued({applicationId: params.get("applicationId")}).then(res => {
                setData(res.data);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            })
        }
    }, []);

    return (
        <div className='application-contact-layout'>
            <div className='application-contact-wrapper'>
                <div className='application-contact-header main-height-container'>
                    <img src={backIcon} alt=''/>
                    {loading ? <Skeleton width={150}/> : <h1 className=''>Договор № {data?.id}</h1>}
                </div>
                <div className="application-contact-body">
                    <div className="application-contact-body-top">
                        <img src={doneImage} alt="done"/>
                        <span className="first-span">Деньги уже в пути </span>
                        <span>Со всей дополнительной информацией</span>
                        <span>Вы можете ознакомиться ниже</span>
                    </div>
                    <div className="application-contact-body-center">
                        <h1>Информация о кредите</h1>
                        <div className="application-contact-body-center-items">
                            <div className='application-contact-body-center-items-left'>
                                <p className='sum_text'>Сумма </p>
                                {loading ? <Skeleton/> : <h4
                                    className='summ'>{data?.clientAmount > 0 ? (data?.clientAmount / 100).toLocaleString("ru") : 0} сум</h4>}
                            </div>
                            <div className='application-contact-body-center-items-right'>
                                <p className='sum_text'>Годовой процент</p>
                                {loading ? <Skeleton/> : <h4 className='summ'>{data?.loanRate}% годовых</h4>}
                            </div>
                        </div>
                        <div className="application-contact-body-center-items">
                            <div className='application-contact-body-center-items-left'>
                                <p className='sum_text'>Срок </p>
                                {loading ? <Skeleton/> : <h4 className='summ'>{data?.period} меc</h4>}
                            </div>
                            <div className='application-contact-body-center-items-right'>
                                <p className='sum_text'>Дата погашения</p>
                                {loading ? <Skeleton/> : <h4 className='summ'>{data?.paymentDay}</h4>}
                            </div>
                        </div>
                        <div className="application-contact-body-center-items only-1">
                            <div className='application-contact-body-center-items-left'>
                                <p className='sum_text'>Ежемесячный платеж </p>
                                {loading ? <Skeleton/> : <h4
                                    className='summ'>{data?.monthlyPayment > 0 ? (data?.monthlyPayment / 100).toLocaleString("ru") : 0} сум</h4>}
                            </div>
                            <div className='application-contact-body-center-items-right hidden'>
                            </div>
                        </div>
                        <div className="application-contact-body-center-items only-1">
                            <div className='application-contact-body-center-items-left'>
                                <p className='sum_text'>Карта для зачисления </p>
                                {loading ? <Skeleton/> : <h4 className='summ'>{data?.panMask}</h4>}
                            </div>
                            <div className='application-contact-body-center-items-right hidden'>
                            </div>
                        </div>
                        <div className="application-contact-body-center-items only-1">
                            <div className='application-contact-body-center-items-left'>
                                <p className='sum_text'>Номер телефона </p>
                                {loading ? <Skeleton/> : <h4 className='summ'>+{data?.phone}</h4>}
                            </div>
                            <div className='application-contact-body-center-items-right hidden'>
                            </div>
                        </div>
                    </div>
                    <div className="application-contact-body-end">
                        <div className='application-contact-body-end-content'
                             onClick={() => downloadFile(data?.infoSheetUrl, `file.${fileType(data?.infoSheetUrl)}`)}>
                            <h3 className='lict_title'>Информационный лист</h3>
                            <img src={downLoadIcon} alt="a"/>
                        </div>
                        <div className='application-contact-body-end-content'
                             onClick={() => downloadFile(data?.loanContractUrl, `info.${fileType(data?.loanContractUrl)}`)}>
                            <h3 className='lict_title'>Кредитный договор</h3>
                            <img src={downLoadIcon} alt=''/>
                        </div>
                        <div className='application-contact-body-end-content'
                             onClick={() => downloadFile(data?.loanScheduleUrl, `info.${fileType(data?.loanScheduleUrl)}`)}>
                            <h3 className='lict_title'>График платежей</h3>
                            <img src={downLoadIcon} alt=''/>
                        </div>
                        <div className='application-contact-body-end-content'
                             onClick={() => downloadFile(data?.loanAppUrl, `info.${fileType(data?.loanAppUrl)}`)}>
                            <h3 className='lict_title'>Инструкция по погашению</h3>
                            <img src={downLoadIcon} alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application;