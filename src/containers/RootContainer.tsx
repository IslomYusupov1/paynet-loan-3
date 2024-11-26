import {Route, Routes} from "react-router";
import IndentifyWrapper from "../pages/identify/IndentifyWrapper.tsx";
import LoanWrapper from "../pages/loan/LoanWrapper.tsx";
import {BrowserRouter} from "react-router-dom";

function RootContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndentifyWrapper />}/>
                <Route path="/loan" element={<LoanWrapper />}/>
            </Routes>
        </BrowserRouter>
        );
}

export default RootContainer;