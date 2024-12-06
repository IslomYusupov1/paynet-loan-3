import {Route, Routes} from "react-router";
import IndentifyWrapper from "../pages/identify/IndentifyWrapper.tsx";
import LoanWrapper from "../pages/loan/LoanWrapper.tsx";
import {BrowserRouter} from "react-router-dom";
import MainWrapper from "../pages/main/MainWrapper.tsx";
import ApplicationStatus from "../pages/aplication-status/ApplicationStatus.tsx";
import {ProviderContainer} from "./ProviderContainer.tsx";

function RootContainer() {
    return (
        <BrowserRouter>
            <ProviderContainer>
                <Routes>
                    <Route path="" element={<MainWrapper/>}/>
                    <Route path="/identify" element={<IndentifyWrapper/>}/>
                    <Route path="/loan" element={<LoanWrapper/>}/>
                    <Route path="/status" element={<ApplicationStatus/>}/>
                </Routes>
            </ProviderContainer>
        </BrowserRouter>
    );
}

export default RootContainer;