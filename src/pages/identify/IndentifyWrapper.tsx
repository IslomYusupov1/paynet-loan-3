import {useMemo, useState} from "react";

function IndentifyWrapper() {
    const [errorText, setErrorText] = useState("");
    const MyIDStatus = {
        EXCEPTION: -1,
        IN_PROGRESS: 0,
        LIVENESS_PASSED: 1,
        LIVENESS_FAILED: 2,
        RETRY: 3,
        EXITED: 4,

        LOADING: 100,
        LOADED: 101,
    };


    window.addEventListener("message", (e) => {
        if (e.data.source != "MyIDWebSDK") return;
        switch (e.data.status) {
            case MyIDStatus.EXCEPTION:
                console.error(
                    "MyID Iframe failed to load properly or a runtime error occurred.",
                    e.data.error
                );
                setErrorText(e.data.error);
                break;
            case MyIDStatus.IN_PROGRESS:
                setErrorText("Client interacted with the iframe.");
                localStorage.setItem("data", JSON.stringify(e.data));
                break;
            case MyIDStatus.LIVENESS_PASSED:
                setErrorText(e.data)
                console.log(e.data, "liveness_passed")
                localStorage.setItem("data", JSON.stringify(e.data));
                // yourSuccessCallback(e.data);
                break;
            case MyIDStatus.LIVENESS_FAILED:
                console.log(e.data.result_code, e.data.result_note);
                localStorage.setItem("data", JSON.stringify(e.data));
                setErrorText(e.data.result_code)
                setErrorText( e.data.result_note)
                // yourFailCallback(e.data);
                break;
            case MyIDStatus.RETRY:
                setErrorText("Client is trying again.");
                localStorage.setItem("data", JSON.stringify(e.data));
                break;
            case MyIDStatus.EXITED:
                setErrorText("Client chose to return to your application early.");
                break;
            default:
                console.log("Unknown status:", e.data);
        }
    });
    // const redirectUrl = "http:/5114be9a-6448-4e1e-bc80-fe78a6e97237/localhost:5173/loan"
    const token = ""
    const url = useMemo(() => `
    https://web.devmyid.uz/?session_id=${token}&iframe=true&theme=light&lang=ru`, [])
    return (
        <div className="face-container">
            <iframe style={{ width: "100%", height: "100%" }}
                    id="myid_iframe"
                    src={url}
                    allow="camera;fullscreen" allowFullScreen></iframe>
            <span className="span-iframe">{errorText}</span>
        </div>
    );
}

export default IndentifyWrapper;