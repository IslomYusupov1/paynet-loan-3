export interface LoanApplicationDTO {
    readonly applicationId: string,
    readonly amount: number,
    readonly isAnnuity: boolean,
    readonly period: number,
    readonly paymentDate: number,
    readonly firstContactPerson: string,
    readonly firstContactPersonPhoneNumber: string,
    readonly firstContactPersonRelationship: string,
    readonly secondContactPerson: string,
    readonly secondContactPersonPhoneNumber: string,
    readonly secondContactPersonRelationship: string,
    readonly agreementId: string

}