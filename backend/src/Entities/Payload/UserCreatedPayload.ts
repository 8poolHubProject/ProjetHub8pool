export interface UserCreatedPayload {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    hasAcceptedTerms: boolean;
}
