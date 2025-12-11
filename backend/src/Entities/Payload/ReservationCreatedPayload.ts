export interface ReservationCreatedPayload {
    ownerId: number;
    poolId: number;
    startOn: string;     // ISO string
    endOn: string;       // ISO string
    othersPlayersId: number[];
    hasAcceptedSettlement: boolean;
}
