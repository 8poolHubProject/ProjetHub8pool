import {ReservationStatus} from "../Reservation.js";

export interface ReservationConfirmPayload {
    reservationId: number;
    reservationStatus: ReservationStatus;
}
