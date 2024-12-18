import {useEffect, useMemo} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

function IndentifyWrapper() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

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

    const myIdCheck = (e: MessageEvent<any>) => {
        if (e.data.source != "MyIDWebSDK") return;
        switch (e.data.status) {
            case MyIDStatus.EXCEPTION:
                console.error(
                    "MyID Iframe failed to load properly or a runtime error occurred.",
                    e.data.error
                );
                break;
            case MyIDStatus.IN_PROGRESS:
                break;
            case MyIDStatus.LIVENESS_PASSED:
                localStorage.setItem("data", JSON.stringify(e.data));
                navigate("/loan?step=1");
                break;
            case MyIDStatus.LIVENESS_FAILED:
                break;
            case MyIDStatus.RETRY:
                break;
            case MyIDStatus.EXITED:
                break;
            default:
                console.log("Unknown status:", e.data);
        }
    }

    useEffect(() => {
        window.addEventListener("message", myIdCheck);
    }, []);

    const url = useMemo(
        () => `https://web.devmyid.uz/?iframe=true&session_id=${params.get("sessionId")}&birth_date=${params?.get("birthDate")}&pinfl=${params.get("pinfl")}&theme=light&lang=${params.get("locale")}`, [])
    console.log(url, 'uyrl')
    return (
        <div className="face-container">
            <iframe style={{ width: "100%", height: "100%", border: "none" }}
                    id="myid_iframe"
                    src={url}
                    allow="camera;fullscreen"
                    allowFullScreen={true}></iframe>
        </div>
    );
}

export default IndentifyWrapper;