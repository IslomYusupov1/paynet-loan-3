import { BaseApi } from "../BaseApi";
import {IdentifyPromiseProps, SendAuthCodeResponse} from "./IdentifyDTO.ts";

export class IdentifyApi extends BaseApi {
    public getSessionId(json: {applicationId: string, firstTime?: boolean}): Promise<IdentifyPromiseProps> {
        return this.post(`webview/get/session`, { json: json });
    }
    public sendAuthCode(json: {applicationId: string, code: string}): Promise<SendAuthCodeResponse> {
        return this.post(`webview/code/check`, { json: json });
    }
    public getLoanProduct(json: {lang: string}): Promise<SendAuthCodeResponse> {
        return this.post(`webview/loan/product`, { json: json });
    }
}
