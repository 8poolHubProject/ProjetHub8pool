export interface ReservationUpdatedPayload {
    id: number;
    ownerId?: number;
    poolId?: number;
    startOn?: string;     // ISO string
    endOn?: string;       // ISO string
    othersPlayersId?: number[];
    hasAcceptedSettlement?: boolean;
    ownerComment: string;
    adminComment: string;
}
