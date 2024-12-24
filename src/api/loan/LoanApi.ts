import { BaseApi } from "../BaseApi";
import {
    ApplicationIssuedDTo,
    LoanApplicationCheckDTO,
    LoanApplicationCheckPromise,
    LoanApplicationCodeCheckDTO,
    LoanApplicationDTO
} from "./LoanDTO.ts";

export class LoanApi extends BaseApi {
    public createLoanApplication(json: LoanApplicationDTO): Promise<LoanApplicationCheckPromise> {
        return this.post(`webview/create/loan/application`, { json: json });
    }
    public loanApplicationCheck(json: LoanApplicationCheckDTO): Promise<LoanApplicationCheckPromise> {
        return this.post(`webview/accept/loan/application/check`, { json: json });
    }
    public loanApplicationCodeCheck(json: LoanApplicationCodeCheckDTO): Promise<LoanApplicationCheckPromise> {
        return this.post(`webview/accept/loan/application/confirm`, { json: json });
    }
    public getApplicationIssued(json: {applicationId?: string | null}): Promise<{ data: ApplicationIssuedDTo }> {
        return this.post(`webview/get/loan/application`, {  json: json } )
    }
    public getApplicationList(json: {userId?: string | null}): Promise<{ data: ApplicationIssuedDTo }> {
        return this.post(`webview/loan/application/list`, {  json: json } )
    }
}
