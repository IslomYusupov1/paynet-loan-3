import { BaseApi } from "../BaseApi";
import {IdentifyPromiseProps} from "./IdentifyDTO.ts";

export class IdentifyApi extends BaseApi {
    public getSessionId(json: {applicationId: string}): Promise<IdentifyPromiseProps> {
        return this.post(`webview/get/session`, { json: json });
    }
}
