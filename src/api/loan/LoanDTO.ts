export interface LoanApplicationDTO {
    readonly applicationId: string | null,
    readonly amount: number,
    readonly isAnnuity: boolean,
    readonly period: number,
    readonly paymentDate: number,
    readonly firstContactPersonFirstName: string;
    readonly firstContactPersonLastName: string;
    readonly firstContactPersonMiddleName: string;
    readonly firstContactPersonPhoneNumber: string,
    readonly firstContactPersonRelationship: string,
    readonly secondContactPersonFirstName: string,
    readonly secondContactPersonLastName: string,
    readonly secondContactPersonMiddleName: string,
    readonly secondContactPersonPhoneNumber: string,
    readonly secondContactPersonRelationship: string,
    readonly agreementId: string;
    readonly userId?: string;
}

export interface LoanApplicationCheckDTO {
    readonly applicationId: string | null,
    readonly amount: number | null,
    readonly pan: string,
    readonly offerType: number,
    readonly expiry: string,
}

export interface LoanApplicationCheckPromise {
    readonly data: {},
    readonly errorMessage: string;
    readonly audit: string;
}

export interface LoanApplicationCodeCheckDTO {
    readonly code: string;
    readonly applicationId: string | null,
}

export interface OfferDto {
    readonly monthlyPayment: number;
    readonly offerAmount: number;
    readonly offerType: number;
    readonly pti: number;
    readonly rate: number;
    readonly term: number;
}
export interface ApplicationIssuedDTo {
    readonly clientAmount: number;
    readonly offeredAmount: number;
    readonly id: number;
    readonly period: number;
    readonly requestedAmount: number;
    readonly offer: OfferDto;
    readonly status: string;
    readonly paymentDay: number;
    readonly panMask: string;
    readonly loanRate: number;
    readonly monthlyPayment: number;
    readonly phone: string;
    readonly infoSheetUrl: string;
    readonly loanAppUrl: string;
    readonly loanContractUrl: string;
    readonly loanScheduleUrl: string;
}