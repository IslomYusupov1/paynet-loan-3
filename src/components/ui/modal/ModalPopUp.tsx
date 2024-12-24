import {ReactNode} from "react";

import vector from "../../../assets/vector.png";

interface Props {
    readonly close: () => void;
    readonly isOpen: boolean;
    readonly children: ReactNode;
    readonly overlay?: boolean;
    readonly name?: string;
    readonly bodyScroll?: boolean;
}

function ModalPopUp({ close, isOpen, children, overlay, name, bodyScroll }: Props) {
    return (
        <>
            <div onClick={close} className={`overlay ${overlay ? "calendar" : ""} ${isOpen ? "open" : ""}`}/>
            <div className={`identify-popup ${name} ${isOpen ? "open" : ""}`}>
                <img src={vector} alt="" className="top-image"/>
                <div className={`modal-body ${bodyScroll ? "scroll-y" : ""}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default ModalPopUp;