import type {Pool} from "./Pool.js";
import type {User} from "./User.js";

export enum ReservationStatus {
    Confirmed = 0,
    Pending = 1,
    Cancelled = 2,
}

export interface Reservation {
    id: number;
    ownerId: number;
    owner: User;
    poolId: number;
    pool: Pool;
    startOn: string;     // ISO string
    endOn: string;       // ISO string
    othersPlayers: User[];
    hasAcceptedSettlement: boolean;
    status: ReservationStatus;
    ownerComment: string;
    adminComment: string;
}
