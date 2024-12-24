export interface IdentifyDTO {
    readonly birthDate: string | null;
    readonly locale: string;
    readonly pinfl: string | null
    readonly sessionId: string
}

export interface IdentifyPromiseProps {
    readonly audit: string;
    readonly data: IdentifyDTO
}

export interface SendAuthCode {
    readonly fullName: string;
    readonly redirectUrl: string;
    readonly sessionId: string;
    readonly locale: string;
}

export interface SendAuthCodeResponse {
    readonly data: SendAuthCode;
    readonly audit: string;
}