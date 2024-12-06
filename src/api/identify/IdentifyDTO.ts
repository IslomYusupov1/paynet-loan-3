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