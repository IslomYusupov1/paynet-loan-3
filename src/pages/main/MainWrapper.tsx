import {useState} from "react";
import {useNavigate} from "react-router";

// styles
import "./assets/main.css";

// images
import backIcon from "../../assets/back.png";
import logoIcon from "../../assets/logo.png";
import cashIcon from "../../assets/cash.png";
import identify from "../../assets/identify.png";
import {useIdentifyContext} from "../../api/identify/IdentifyContext.ts";
import LoaderSpin from "../../components/loader/LoaderSpin.tsx";
import ModalPopUp from "../../components/ui/modal/ModalPopUp.tsx";

function MainWrapper() {
    const [openSelect, setOpenSelect] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {IdentifyApi} = useIdentifyContext();

    const getSessionId = async () => {
        setLoading(true);
        await IdentifyApi.getSessionId({applicationId: "27bdeeb2-6e3f-41a4-b593-86830298156f"}).then(res => {
            setLoading(false);
            navigate(`identify?&applicationId=27bdeeb2-6e3f-41a4-b593-86830298156f&sessionId=${res.data.sessionId}&birthDate=${res.data.birthDate}&pinfl=${res.data.pinfl}&locale=${res.data.locale}`);
        }).catch(() => {
            setLoading(false);
        })
    }
    return (
        <section className="main-page-layout">
            <div className="main-page-wrapper">
                <div className="main-page-header main-height-container">
                    <img src={backIcon} alt="back" style={{alignItems: "start", textAlign: "start"}}/>
                    <img src={logoIcon} alt="logo" className="logo-image"/>
                </div>
                <div className="main-page-body">
                    <img src={cashIcon} alt=""/>
                </div>
                <div className="main-page-footer">
                    <div className="main-page-footer-text-block">
                        <h2>Получить микрозайм до 100 млн. сум</h2>
                        <p>Узнайте свой кредитный лимит и получите до 100 млн. сум в течении 2-х часов</p>
                    </div>
                    <div className="main-page-footer-btn-block">
                        <button onClick={() => setOpenSelect(true)}>Узнать свой лимит</button>
                        <span>Условия кредита</span>
                    </div>
                </div>
            </div>
            {/*<div onClick={() => setOpenSelect(false)} className={`overlay ${openSelect ? "open" : ""}`}/>*/}
            {/*<div className={`identify-popup ${openSelect ? "open" : ""}`}>*/}
            {/*    <img src={vector} alt="" className="top-image"/>*/}
            {/*    <div className="identify-popup-content">*/}
            {/*        <img src={identify} alt=""/>*/}
            {/*        <h2>Пройдите быструю идентификацию в MyID</h2>*/}
            {/*        <p>Для продолжения нам необходимо убедится что это действительно вы</p>*/}
            {/*        <button disabled={loading} onClick={getSessionId}>*/}
            {/*            <span>Пройти идентификацию</span>*/}
            {/*            {loading && <LoaderSpin/>}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <ModalPopUp close={() => setOpenSelect(false)} isOpen={openSelect}>
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

export default MainWrapper;