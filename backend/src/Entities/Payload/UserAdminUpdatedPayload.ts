export interface UserAdminUpdatedPayload {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    passwordHash?: string;
    phoneNumber?: string;
    isAdmin?: boolean;
    isActive?: boolean;
    hasAcceptedTerms?: boolean;
}
