import {ReactNode} from "react";

import vector from "../../../assets/vector.png";

interface Props {
    readonly close: () => void;
    readonly isOpen: boolean;
    readonly children: ReactNode;
    readonly name?: string;
}

function ModalPopUp({ close, isOpen, children, name }: Props) {
    return (
        <>
            <div onClick={close} className={`overlay ${name} ${isOpen ? "open" : ""}`}/>
            <div className={`identify-popup ${name} ${isOpen ? "open" : ""}`}>
                <img src={vector} alt="" className="top-image"/>
                {children}
            </div>
        </>
    );
}

export default ModalPopUp;