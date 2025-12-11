export interface UserUpdatedPayload {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    passwordHash?: string;
    phoneNumber?: string;
}
