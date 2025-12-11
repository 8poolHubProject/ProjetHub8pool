### Admin
    - Update (UserAdminUpdatedPayload) -> check admin -> return Ok(userId)
    - Delete (userId) -> return ok()
    - Post confirm(ReservationConfirmPaylaod) -> return Ok(reservationId)
    - Post (PoolCreatedPayload) -> !Warning! Admin Required !Warning! -> (create) -> return Ok(PoolId)
    - Update (PoolUpdatedPayload) -> !Warning! Admin Required !Warning! -> (update) -> return Ok(PoolId)
    - Delete -> (PoolId) -> !Warning! Admin Required !Warning! -> (delete) -> return Ok()

### Billard
    - Get (PoolId) -> return PoolResponse
    - GetAll -> return Page<PoolResponse>

### Users
    - Get (userId) -> return class UserResponse
    - GetAll -> return Page<UserResponse>

### User (Me)
    - Update (UserUpdatedPayload) -> !warning im the user! (update) -> return Ok(userId)
    - Post signin(UserCreatedPayload) -> (create) -> return Ok(userId)
    - Post (Disconnect) -> !warning im the user! (update) -> return Ok()
    - Post (Login) -> (UserLoginPayload) -> (login -> return Ok(userId)
    - Get (/me) -> return Ok(User)
    - Delete /me -> return Ok()
    

### Reservation
    - Get -> return Ok(ReservationResponse)
    - Post -> (ReservationCreatedPayload) -> return Ok(reservationId)
    - GetAll -> return Page<ReservationResponse>
    - Update -> (ReservationupdatedPayload) -> return Ok(reservationId)
    - Delete -> (reservationId) -> return Ok()

### DoorLock



