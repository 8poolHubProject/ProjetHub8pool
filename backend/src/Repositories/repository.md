# Documentation des Repositories

## Table des matières
- [Pool Repository](#pool-repository)
- [Reservation Repository](#reservation-repository)
- [User Repository](#user-repository)

---

## Pool Repository

### Fonctions de base

#### `CreatePoolAsync(pool: Pool): Promise<void>`
Crée un nouveau pool dans la base de données.

**Paramètres:**
- `pool` (Pool): L'objet pool à créer

**Retour:** Promise<void>

**Throws:** Aucune exception spécifique

**Exemple:**
```typescript
const newPool: Pool = {
    id: 1,
    name: "Table 1",
    type: PoolType.PoolBlueCarpet,
    status: true
};
await CreatePoolAsync(newPool);
```

---

#### `GetByIdAsync(id: string | number): Promise<Pool | null>`
Récupère un pool par son identifiant.

**Paramètres:**
- `id` (string | number): L'identifiant du pool

**Retour:** Promise<Pool | null> - Le pool trouvé ou null si inexistant

**Exemple:**
```typescript
const pool = await GetByIdAsync(1);
if (pool) {
    console.log(`Pool trouvé: ${pool.name}`);
}
```

---

#### `GetAllAsync(): Promise<Pool[]>`
Récupère tous les pools de la base de données.

**Paramètres:** Aucun

**Retour:** Promise<Pool[]> - Tableau de tous les pools

**Exemple:**
```typescript
const allPools = await GetAllAsync();
console.log(`Nombre total de pools: ${allPools.length}`);
```

---

#### `UpdateByIdAsync(id: string | number, updates: Partial<Pool>): Promise<boolean>`
Met à jour un pool existant avec des modifications partielles.

**Paramètres:**
- `id` (string | number): L'identifiant du pool
- `updates` (Partial<Pool>): Les champs à mettre à jour

**Retour:** Promise<boolean> - true si la mise à jour a réussi, false sinon

**Exemple:**
```typescript
const success = await UpdateByIdAsync(1, { name: "Table Premium" });
if (success) {
    console.log("Pools mis à jour avec succès");
}
```

---

#### `DeleteByIdAsync(id: string | number): Promise<boolean>`
Supprime un pool de la base de données.

**Paramètres:**
- `id` (string | number): L'identifiant du pool à supprimer

**Retour:** Promise<boolean> - true si la suppression a réussi, false sinon

**Exemple:**
```typescript
const deleted = await DeleteByIdAsync(1);
if (deleted) {
    console.log("Pools supprimé");
}
```

---

#### `ExistsAsync(id: string | number): Promise<boolean>`
Vérifie si un pool existe dans la base de données.

**Paramètres:**
- `id` (string | number): L'identifiant du pool

**Retour:** Promise<boolean> - true si le pool existe, false sinon

**Exemple:**
```typescript
const exists = await ExistsAsync(1);
if (!exists) {
    console.log("Ce pool n'existe pas");
}
```

---

### Fonctions spécifiques

#### `GetByTypeAsync(type: PoolType): Promise<Pool[]>`
Récupère tous les pools d'un type spécifique.

**Paramètres:**
- `type` (PoolType): Le type de pool (PoolBlueCarpet, PoolGreenCarpet, Snooker9P)

**Retour:** Promise<Pool[]> - Tableau des pools du type demandé

**Exemple:**
```typescript
const snookerTables = await GetByTypeAsync(PoolType.Snooker9P);
console.log(`Nombre de tables Snooker: ${snookerTables.length}`);
```

---

#### `GetByStatusAsync(status: boolean): Promise<Pool[]>`
Récupère tous les pools selon leur statut (actif/inactif).

**Paramètres:**
- `status` (boolean): true pour les pools actifs, false pour les inactifs

**Retour:** Promise<Pool[]> - Tableau des pools correspondants

**Exemple:**
```typescript
const activePools = await GetByStatusAsync(true);
console.log(`Pools actifs: ${activePools.length}`);
```

---

#### `ToggleStatusAsync(id: number): Promise<boolean>`
Inverse le statut d'un pool (actif ↔ inactif).

**Paramètres:**
- `id` (number): L'identifiant du pool

**Retour:** Promise<boolean> - true si l'opération a réussi, false sinon

**Exemple:**
```typescript
await ToggleStatusAsync(1); // Active si inactif, désactive si actif
```

---

#### `GetByFilterAsync(field: string, operator: FirebaseFirestore.WhereFilterOp, value: any): Promise<Pool[]>`
Récupère des pools avec un filtre Firestore personnalisé.

**Paramètres:**
- `field` (string): Le nom du champ à filtrer
- `operator` (FirebaseFirestore.WhereFilterOp): L'opérateur de comparaison (==, !=, <, >, etc.)
- `value` (any): La valeur à comparer

**Retour:** Promise<Pool[]> - Tableau des pools correspondants

**Exemple:**
```typescript
const pools = await GetByFilterAsync("status", "==", true);
```

---

#### `CountAsync(): Promise<number>`
Compte le nombre total de pools.

**Paramètres:** Aucun

**Retour:** Promise<number> - Le nombre total de pools

**Exemple:**
```typescript
const total = await CountAsync();
console.log(`Total: ${total} pools`);
```

---

#### `CountByTypeAsync(type: PoolType): Promise<number>`
Compte le nombre de pools d'un type spécifique.

**Paramètres:**
- `type` (PoolType): Le type de pool

**Retour:** Promise<number> - Le nombre de pools du type demandé

**Exemple:**
```typescript
const blueCount = await CountByTypeAsync(PoolType.PoolBlueCarpet);
console.log(`Tables à tapis bleu: ${blueCount}`);
```

---

## Reservation Repository

### Fonctions de base

#### `CreateReservationAsync(reservation: Reservation): Promise<void>`
Crée une nouvelle réservation dans la base de données.

**Paramètres:**
- `reservation` (Reservation): L'objet réservation à créer

**Retour:** Promise<void>

**Throws:** Error si la réservation n'a pas d'ID valide

**Exemple:**
```typescript
const newReservation: Reservation = {
    id: 1,
    ownerId: 123,
    poolId: 5,
    startOn: "2025-12-15T14:00:00Z",
    endOn: "2025-12-15T16:00:00Z",
    status: ReservationStatus.Pending,
    // ... autres champs
};
await CreateReservationAsync(newReservation);
```

---

#### `GetByIdAsync(id: string | number): Promise<Reservation | null>`
Récupère une réservation par son identifiant.

**Paramètres:**
- `id` (string | number): L'identifiant de la réservation

**Retour:** Promise<Reservation | null> - La réservation trouvée ou null

**Exemple:**
```typescript
const reservation = await GetByIdAsync(1);
if (reservation) {
    console.log(`Réservation pour le pool ${reservation.poolId}`);
}
```

---

#### `GetAllAsync(): Promise<Reservation[]>`
Récupère toutes les réservations.

**Paramètres:** Aucun

**Retour:** Promise<Reservation[]> - Tableau de toutes les réservations

**Exemple:**
```typescript
const allReservations = await GetAllAsync();
console.log(`Total: ${allReservations.length} réservations`);
```

---

#### `UpdateByIdAsync(id: string | number, updates: Partial<Reservation>): Promise<boolean>`
Met à jour une réservation existante.

**Paramètres:**
- `id` (string | number): L'identifiant de la réservation
- `updates` (Partial<Reservation>): Les champs à mettre à jour

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await UpdateByIdAsync(1, { 
    status: ReservationStatus.Confirmed,
    adminComment: "Validé"
});
```

---

#### `DeleteByIdAsync(id: string | number): Promise<boolean>`
Supprime une réservation.

**Paramètres:**
- `id` (string | number): L'identifiant de la réservation

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
const deleted = await DeleteByIdAsync(1);
```

---

#### `ExistsAsync(id: string | number): Promise<boolean>`
Vérifie si une réservation existe.

**Paramètres:**
- `id` (string | number): L'identifiant de la réservation

**Retour:** Promise<boolean> - true si existe, false sinon

**Exemple:**
```typescript
if (await ExistsAsync(1)) {
    console.log("La réservation existe");
}
```

---

### Fonctions de recherche

#### `GetByOwnerIdAsync(ownerId: number): Promise<Reservation[]>`
Récupère toutes les réservations d'un propriétaire.

**Paramètres:**
- `ownerId` (number): L'identifiant du propriétaire

**Retour:** Promise<Reservation[]> - Tableau des réservations

**Exemple:**
```typescript
const myReservations = await GetByOwnerIdAsync(123);
console.log(`Vous avez ${myReservations.length} réservations`);
```

---

#### `GetByPoolIdAsync(poolId: number): Promise<Reservation[]>`
Récupère toutes les réservations d'un pool spécifique.

**Paramètres:**
- `poolId` (number): L'identifiant du pool

**Retour:** Promise<Reservation[]> - Tableau des réservations

**Exemple:**
```typescript
const poolReservations = await GetByPoolIdAsync(5);
```

---

#### `GetByStatusAsync(status: ReservationStatus): Promise<Reservation[]>`
Récupère toutes les réservations d'un statut donné.

**Paramètres:**
- `status` (ReservationStatus): Le statut (Confirmed, Pending, Cancelled)

**Retour:** Promise<Reservation[]> - Tableau des réservations

**Exemple:**
```typescript
const pending = await GetByStatusAsync(ReservationStatus.Pending);
console.log(`${pending.length} réservations en attente`);
```

---

#### `GetByDateRangeAsync(startDate: string, endDate: string): Promise<Reservation[]>`
Récupère les réservations dans une plage de dates.

**Paramètres:**
- `startDate` (string): Date de début (format ISO)
- `endDate` (string): Date de fin (format ISO)

**Retour:** Promise<Reservation[]> - Tableau des réservations

**Exemple:**
```typescript
const todayReservations = await GetByDateRangeAsync(
    "2025-12-15T00:00:00Z",
    "2025-12-15T23:59:59Z"
);
```

---

### Gestion des statuts

#### `UpdateStatusAsync(id: number, status: ReservationStatus): Promise<boolean>`
Change le statut d'une réservation.

**Paramètres:**
- `id` (number): L'identifiant de la réservation
- `status` (ReservationStatus): Le nouveau statut

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await UpdateStatusAsync(1, ReservationStatus.Confirmed);
```

---

#### `ConfirmReservationAsync(id: number): Promise<boolean>`
Confirme une réservation (raccourci pour UpdateStatusAsync).

**Paramètres:**
- `id` (number): L'identifiant de la réservation

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await ConfirmReservationAsync(1);
```

---

#### `CancelReservationAsync(id: number): Promise<boolean>`
Annule une réservation (raccourci pour UpdateStatusAsync).

**Paramètres:**
- `id` (number): L'identifiant de la réservation

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await CancelReservationAsync(1);
```

---

### Gestion des règlements

#### `AcceptSettlementAsync(id: number): Promise<boolean>`
Marque qu'un propriétaire a accepté le règlement.

**Paramètres:**
- `id` (number): L'identifiant de la réservation

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await AcceptSettlementAsync(1);
```

---

#### `GetUnsettledReservationsAsync(): Promise<Reservation[]>`
Récupère toutes les réservations non réglées.

**Paramètres:** Aucun

**Retour:** Promise<Reservation[]> - Tableau des réservations non réglées

**Exemple:**
```typescript
const unsettled = await GetUnsettledReservationsAsync();
console.log(`${unsettled.length} réservations à régler`);
```

---

### Gestion des commentaires

#### `AddOwnerCommentAsync(id: number, comment: string): Promise<boolean>`
Ajoute un commentaire du propriétaire à une réservation.

**Paramètres:**
- `id` (number): L'identifiant de la réservation
- `comment` (string): Le commentaire à ajouter

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await AddOwnerCommentAsync(1, "Merci de préparer les queues");
```

---

#### `AddAdminCommentAsync(id: number, comment: string): Promise<boolean>`
Ajoute un commentaire administrateur à une réservation.

**Paramètres:**
- `id` (number): L'identifiant de la réservation
- `comment` (string): Le commentaire à ajouter

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await AddAdminCommentAsync(1, "Table préparée");
```

---

### Statistiques

#### `CountAsync(): Promise<number>`
Compte le nombre total de réservations.

**Paramètres:** Aucun

**Retour:** Promise<number> - Le nombre total

**Exemple:**
```typescript
const total = await CountAsync();
```

---

#### `CountByStatusAsync(status: ReservationStatus): Promise<number>`
Compte le nombre de réservations par statut.

**Paramètres:**
- `status` (ReservationStatus): Le statut à compter

**Retour:** Promise<number> - Le nombre de réservations

**Exemple:**
```typescript
const confirmedCount = await CountByStatusAsync(ReservationStatus.Confirmed);
```

---

#### `GetByFilterAsync(field: string, operator: FirebaseFirestore.WhereFilterOp, value: any): Promise<Reservation[]>`
Récupère des réservations avec un filtre personnalisé.

**Paramètres:**
- `field` (string): Le champ à filtrer
- `operator` (FirebaseFirestore.WhereFilterOp): L'opérateur
- `value` (any): La valeur

**Retour:** Promise<Reservation[]> - Tableau des réservations

**Exemple:**
```typescript
const reservations = await GetByFilterAsync("hasAcceptedSettlement", "==", false);
```

---

## User Repository

### Fonctions de base

#### `CreateUserAsync(user: User): Promise<void>`
Crée un nouvel utilisateur dans la base de données.

**Paramètres:**
- `user` (User): L'objet utilisateur à créer

**Retour:** Promise<void>

**Throws:** Error si l'utilisateur n'a pas d'ID valide

**Exemple:**
```typescript
const newUser: User = {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    passwordHash: "hashed_password",
    phoneNumber: "+33612345678",
    isAdmin: false,
    isActive: true,
    hasAcceptedTerms: true,
    participatedReservations: []
};
await CreateUserAsync(newUser);
```

---

#### `GetByIdAsync(id: string | number): Promise<User | null>`
Récupère un utilisateur par son identifiant.

**Paramètres:**
- `id` (string | number): L'identifiant de l'utilisateur

**Retour:** Promise<User | null> - L'utilisateur trouvé ou null

**Exemple:**
```typescript
const user = await GetByIdAsync(1);
if (user) {
    console.log(`Utilisateur: ${user.firstName} ${user.lastName}`);
}
```

---

#### `GetAllAsync(): Promise<User[]>`
Récupère tous les utilisateurs.

**Paramètres:** Aucun

**Retour:** Promise<User[]> - Tableau de tous les utilisateurs

**Exemple:**
```typescript
const allUsers = await GetAllAsync();
console.log(`Total: ${allUsers.length} utilisateurs`);
```

---

#### `UpdateByIdAsync(id: string | number, updates: Partial<User>): Promise<boolean>`
Met à jour un utilisateur existant.

**Paramètres:**
- `id` (string | number): L'identifiant de l'utilisateur
- `updates` (Partial<User>): Les champs à mettre à jour

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await UpdateByIdAsync(1, { 
    firstName: "Pierre",
    phoneNumber: "+33698765432"
});
```

---

#### `DeleteByIdAsync(id: string | number): Promise<boolean>`
Supprime un utilisateur.

**Paramètres:**
- `id` (string | number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
const deleted = await DeleteByIdAsync(1);
```

---

#### `ExistsAsync(id: string | number): Promise<boolean>`
Vérifie si un utilisateur existe.

**Paramètres:**
- `id` (string | number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si existe, false sinon

**Exemple:**
```typescript
if (await ExistsAsync(1)) {
    console.log("L'utilisateur existe");
}
```

---

### Fonctions de recherche

#### `GetByEmailAsync(email: string): Promise<User | null>`
Récupère un utilisateur par son email (unique).

**Paramètres:**
- `email` (string): L'adresse email de l'utilisateur

**Retour:** Promise<User | null> - L'utilisateur trouvé ou null

**Exemple:**
```typescript
const user = await GetByEmailAsync("jean.dupont@example.com");
if (user) {
    // Utilisateur trouvé, vérifier le mot de passe
}
```

---

#### `GetByPhoneNumberAsync(phoneNumber: string): Promise<User | null>`
Récupère un utilisateur par son numéro de téléphone.

**Paramètres:**
- `phoneNumber` (string): Le numéro de téléphone

**Retour:** Promise<User | null> - L'utilisateur trouvé ou null

**Exemple:**
```typescript
const user = await GetByPhoneNumberAsync("+33612345678");
```

---

#### `GetAdminsAsync(): Promise<User[]>`
Récupère tous les administrateurs.

**Paramètres:** Aucun

**Retour:** Promise<User[]> - Tableau des administrateurs

**Exemple:**
```typescript
const admins = await GetAdminsAsync();
console.log(`${admins.length} administrateurs`);
```

---

#### `GetActiveUsersAsync(): Promise<User[]>`
Récupère tous les utilisateurs actifs.

**Paramètres:** Aucun

**Retour:** Promise<User[]> - Tableau des utilisateurs actifs

**Exemple:**
```typescript
const activeUsers = await GetActiveUsersAsync();
```

---

#### `GetInactiveUsersAsync(): Promise<User[]>`
Récupère tous les utilisateurs inactifs.

**Paramètres:** Aucun

**Retour:** Promise<User[]> - Tableau des utilisateurs inactifs

**Exemple:**
```typescript
const inactiveUsers = await GetInactiveUsersAsync();
```

---

#### `GetUsersWithoutAcceptedTermsAsync(): Promise<User[]>`
Récupère les utilisateurs qui n'ont pas accepté les conditions.

**Paramètres:** Aucun

**Retour:** Promise<User[]> - Tableau des utilisateurs

**Exemple:**
```typescript
const users = await GetUsersWithoutAcceptedTermsAsync();
console.log(`${users.length} utilisateurs doivent accepter les CGU`);
```

---

#### `SearchByNameAsync(searchTerm: string): Promise<User[]>`
Recherche des utilisateurs par nom ou prénom (recherche partielle, insensible à la casse).

**Paramètres:**
- `searchTerm` (string): Le terme de recherche

**Retour:** Promise<User[]> - Tableau des utilisateurs correspondants

**Exemple:**
```typescript
const results = await SearchByNameAsync("Jean");
// Trouve "Jean Dupont", "Marie-Jeanne", etc.
```

---

### Gestion des statuts

#### `ActivateUserAsync(id: number): Promise<boolean>`
Active un utilisateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await ActivateUserAsync(1);
```

---

#### `DeactivateUserAsync(id: number): Promise<boolean>`
Désactive un utilisateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await DeactivateUserAsync(1);
```

---

#### `ToggleActiveStatusAsync(id: number): Promise<boolean>`
Bascule le statut actif/inactif d'un utilisateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await ToggleActiveStatusAsync(1);
```

---

#### `PromoteToAdminAsync(id: number): Promise<boolean>`
Promouvoir un utilisateur en administrateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await PromoteToAdminAsync(1);
```

---

#### `DemoteFromAdminAsync(id: number): Promise<boolean>`
Rétrograder un administrateur en utilisateur normal.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await DemoteFromAdminAsync(1);
```

---

#### `AcceptTermsAsync(id: number): Promise<boolean>`
Marque qu'un utilisateur a accepté les conditions d'utilisation.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await AcceptTermsAsync(1);
```

---

### Mise à jour sécurisée

#### `UpdatePasswordAsync(id: number, newPasswordHash: string): Promise<boolean>`
Met à jour le mot de passe haché d'un utilisateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur
- `newPasswordHash` (string): Le nouveau hash du mot de passe

**Retour:** Promise<boolean> - true si réussi, false sinon

**Note:** Cette fonction attend un hash, pas un mot de passe en clair.

**Exemple:**
```typescript
const hashedPassword = await hashPassword("newPassword123");
await UpdatePasswordAsync(1, hashedPassword);
```

---

#### `UpdateEmailAsync(id: number, newEmail: string): Promise<boolean>`
Met à jour l'email d'un utilisateur avec vérification d'unicité.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur
- `newEmail` (string): Le nouvel email

**Retour:** Promise<boolean> - true si réussi, false si l'email est déjà utilisé

**Note:** Vérifie automatiquement que l'email n'est pas déjà pris par un autre utilisateur.

**Exemple:**
```typescript
const updated = await UpdateEmailAsync(1, "newemail@example.com");
if (!updated) {
    console.log("Cet email est déjà utilisé");
}
```

---

#### `UpdatePhoneNumberAsync(id: number, newPhoneNumber: string): Promise<boolean>`
Met à jour le numéro de téléphone d'un utilisateur.

**Paramètres:**
- `id` (number): L'identifiant de l'utilisateur
- `newPhoneNumber` (string): Le nouveau numéro

**Retour:** Promise<boolean> - true si réussi, false sinon

**Exemple:**
```typescript
await UpdatePhoneNumberAsync(1, "+33698765432");
```

---

### Statistiques

#### `CountAsync(): Promise<number>`
Compte le nombre total d'utilisateurs.

**Paramètres:** Aucun

**Retour:** Promise<number> - Le nombre total

**Exemple:**
```typescript
const total = await CountAsync();
console.log(`Total: ${total} utilisateurs`);
```

---

#### `CountAdminsAsync(): Promise<number>`
Compte le nombre d'administrateurs.

**Paramètres:** Aucun

**Retour:** Promise<number> - Le nombre d'admins

**Exemple:**
```typescript
const adminCount = await CountAdminsAsync();
```

---

#### `CountActiveUsersAsync(): Promise<number>`
Compte le nombre d'utilisateurs actifs.

**Paramètres:** Aucun

**Retour:** Promise<number> - Le nombre d'utilisateurs actifs

**Exemple:**
```typescript
const activeCount = await CountActiveUsersAsync();
```

---

#### `GetByFilterAsync(field: string, operator: FirebaseFirestore.WhereFilterOp, value: any): Promise<User[]>`
Récupère des utilisateurs avec un filtre Firestore personnalisé.

**Paramètres:**
- `field` (string): Le champ à filtrer
- `operator` (FirebaseFirestore.WhereFilterOp): L'opérateur
- `value` (any): La valeur

**Retour:** Promise<User[]> - Tableau des utilisateurs

**Exemple:**
```typescript
const users = await GetByFilterAsync("isActive", "==", true);
```

---

## Notes importantes

### Conventions de nommage
- Toutes les fonctions asynchrones se terminent par `Async`
- Les fonctions CRUD de base suivent le pattern: `Create`, `GetById`, `GetAll`, `UpdateById`, `DeleteById`
- Les fonctions spécifiques utilisent des noms descriptifs: `GetByEmail`, `ToggleStatus`, etc.

### Gestion des erreurs
- Les fonctions `GetById` retournent `null` si l'entité n'existe pas
- Les fonctions `Update` et `Delete` retournent `false` si l'entité n'existe pas
- Les fonctions `Create` peuvent lancer des exceptions si les données sont invalides
- Tous les logs sont affichés dans la console pour faciliter le débogage

### Types Firestore
Les opérateurs Firestore disponibles incluent:
- `==` : égal
- `!=` : différent
- `<` : inférieur
- `<=` : inférieur ou égal
- `>` : supérieur
- `>=` : supérieur ou égal
- `in` : dans un tableau
- `not-in` : pas dans un tableau
- `array-contains` : contient la valeur
- `array-contains-any` : contient l'une des valeurs