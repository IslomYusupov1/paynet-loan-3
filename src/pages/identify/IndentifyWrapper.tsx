import {useEffect, useMemo} from "react";
import {useSearchParams} from "react-router-dom";

function IndentifyWrapper() {
    const [params] = useSearchParams();
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
    useEffect(() => {
        window.addEventListener("message", (e) => {
            if (e.data.source != "MyIDWebSDK") return;
            switch (e.data.status) {
                case MyIDStatus.EXCEPTION:
                    console.error(
                        "MyID Iframe failed to load properly or a runtime error occurred.",
                        e.data.error
                    );
                    break;
                case MyIDStatus.IN_PROGRESS:
                    localStorage.setItem("data", JSON.stringify(e.data));
                    break;
                case MyIDStatus.LIVENESS_PASSED:
                    localStorage.setItem("data", JSON.stringify(e.data));
                    // yourSuccessCallback(e.data);
                    break;
                case MyIDStatus.LIVENESS_FAILED:
                    localStorage.setItem("data", JSON.stringify(e.data));
                    // yourFailCallback(e.data);
                    break;
                case MyIDStatus.RETRY:
                    localStorage.setItem("data", JSON.stringify(e.data));
                    break;
                case MyIDStatus.EXITED:
                    break;
                default:
                    console.log("Unknown status:", e.data);
            }
        });
    }, []);

    const url = useMemo(() => `https://web.devmyid.uz/?session_id=${params.get("sessionId")}&iframe=true&theme=light&lang=ru&redirect_uri=https://paynet-loan-3.vercel.app`, [])
    return (
        <div className="face-container">
            <iframe style={{ width: "100%", height: "100%", border: "none" }}
                    id="myid_iframe"
                    src={url}
                    allow="camera;fullscreen" allowFullScreen={true}></iframe>
        </div>
    );
}

export default IndentifyWrapper;