import { BaseApi } from "../BaseApi";
import {LoanApplicationDTO} from "./LoanDTO.ts";

export class LoanApi extends BaseApi {
    public createLoanApplication(json: LoanApplicationDTO): Promise<any> {
        return this.post(`webview/create/loan/application`, { json: json });
    }
}
