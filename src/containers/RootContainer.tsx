import {Route, Routes} from "react-router";
import IndentifyWrapper from "../pages/identify/IndentifyWrapper.tsx";
import LoanWrapper from "../pages/loan/LoanWrapper.tsx";
import {BrowserRouter} from "react-router-dom";
import MainWrapper from "../pages/main/MainWrapper.tsx";
import {ProviderContainer} from "./ProviderContainer.tsx";
import Terms from "../pages/main/Terms.tsx";
import LoadingPage from "../pages/loadingPage/LoadingPage.tsx";
import StatusAccept from "../pages/status/StatusAccept.tsx";
import StatusReject from "../pages/status/StatusReject.tsx";
import StatusKatm from "../pages/status/StatusKatm.tsx";
import CardPage from "../pages/card/CardPage.tsx";
import SmsCheck from "../pages/card/SmsCheck.tsx";
import Contract from "../pages/contract/Contract.tsx";
import CardSuccess from "../pages/card/CardSuccess.tsx";
import CardReject from "../pages/card/CardReject.tsx";
import StatusError from "../pages/status/StatusError.tsx";
import Application from "../pages/contract/Application.tsx";

function RootContainer() {
    return (
        <BrowserRouter>
            <ProviderContainer>
                <Routes>
                    <Route path="" element={<MainWrapper/>}/>
                    <Route path="/terms" element={<Terms />}/>
                    <Route path="/card" element={<CardPage />}/>
                    <Route path="/status/process" element={<LoadingPage />}/>
                    <Route path="/identify" element={<IndentifyWrapper/>}/>
                    <Route path="/loan" element={<LoanWrapper/>}/>
                    <Route path="/status/accept" element={<StatusAccept />} />
                    <Route path="/status/reject" element={<StatusReject />} />
                    <Route path="/status/error" element={<StatusError />} />
                    <Route path="/status/aml" element={<StatusReject />} />
                    <Route path="/status/katm" element={<StatusKatm />} />
                    <Route path="/sms-check" element={<SmsCheck />} />
                    <Route path="/applications" element={<Contract />} />
                    <Route path="/applications/issued" element={<Application />} />
                    <Route path="/card/status/success" element={<CardSuccess />} />
                    <Route path="/card/status/reject" element={<CardReject />} />
                </Routes>
            </ProviderContainer>
        </BrowserRouter>
    );
}

export default RootContainer;