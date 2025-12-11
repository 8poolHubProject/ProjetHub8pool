import {db} from "../Infrastructure/config/firebase-admin.js";
import type {User} from "../Entities/User.js";

export async function CreateUserAsync(user: User): Promise<void> {
    if (!user || typeof user.id === "undefined") {
        throw new Error("L'utilisateur doit avoir un id valide.");
    }

    const userObj = JSON.parse(JSON.stringify(user));
    const userRef = db.collection("users").doc(String(user.id));

    await userRef.set(userObj);

    console.log(`User ${user.id} créé en DB.`);
}

export async function GetByIdAsync(id: string | number): Promise<User | null> {
    const userRef = db.collection("users").doc(String(id));
    const doc = await userRef.get();

    if (!doc.exists) {
        console.log(`User ${id} introuvable.`);
        return null;
    }

    return doc.data() as User;
}

export async function GetAllAsync(): Promise<User[]> {
    const usersSnapshot = await db.collection("users").get();
    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} utilisateur(s) récupéré(s).`);
    return users;
}

export async function UpdateByIdAsync(id: string | number, updates: Partial<User>): Promise<boolean> {
    const userRef = db.collection("users").doc(String(id));
    const doc = await userRef.get();

    if (!doc.exists) {
        console.log(`User ${id} introuvable pour mise à jour.`);
        return false;
    }

    const updateObj = JSON.parse(JSON.stringify(updates));
    await userRef.update(updateObj);

    console.log(`User ${id} mis à jour.`);
    return true;
}

export async function DeleteByIdAsync(id: string | number): Promise<boolean> {
    const userRef = db.collection("users").doc(String(id));
    const doc = await userRef.get();

    if (!doc.exists) {
        console.log(`User ${id} introuvable pour suppression.`);
        return false;
    }

    await userRef.delete();

    console.log(`User ${id} supprimé.`);
    return true;
}

export async function ExistsAsync(id: string | number): Promise<boolean> {
    const userRef = db.collection("users").doc(String(id));
    const doc = await userRef.get();

    return doc.exists;
}

export async function GetByEmailAsync(email: string): Promise<User | null> {
    const usersSnapshot = await db.collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.log(`Aucun utilisateur avec l'email ${email}.`);
        return null;
    }

    return usersSnapshot.docs[0]?.data() as User;
}

export async function GetByPhoneNumberAsync(phoneNumber: string): Promise<User | null> {
    const usersSnapshot = await db.collection("users")
        .where("phoneNumber", "==", phoneNumber)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.log(`Aucun utilisateur avec le numéro ${phoneNumber}.`);
        return null;
    }

    return usersSnapshot.docs[0]?.data() as User;
}

export async function GetAdminsAsync(): Promise<User[]> {
    const usersSnapshot = await db.collection("users")
        .where("isAdmin", "==", true)
        .get();

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} administrateur(s) trouvé(s).`);
    return users;
}

export async function GetActiveUsersAsync(): Promise<User[]> {
    const usersSnapshot = await db.collection("users")
        .where("isActive", "==", true)
        .get();

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} utilisateur(s) actif(s) trouvé(s).`);
    return users;
}

export async function GetInactiveUsersAsync(): Promise<User[]> {
    const usersSnapshot = await db.collection("users")
        .where("isActive", "==", false)
        .get();

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} utilisateur(s) inactif(s) trouvé(s).`);
    return users;
}

export async function GetUsersWithoutAcceptedTermsAsync(): Promise<User[]> {
    const usersSnapshot = await db.collection("users")
        .where("hasAcceptedTerms", "==", false)
        .get();

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} utilisateur(s) n'ayant pas accepté les conditions trouvé(s).`);
    return users;
}

export async function ToggleActiveStatusAsync(id: number): Promise<boolean> {
    const user = await GetByIdAsync(id);

    if (!user) {
        console.log(`User ${id} introuvable pour changer le statut.`);
        return false;
    }

    return await UpdateByIdAsync(id, { isActive: !user.isActive });
}

export async function PromoteOrDemoteToAdminAsync(id: number, isAdmin: boolean): Promise<boolean> {
    const result = await UpdateByIdAsync(id, { isAdmin: isAdmin });

    if (result && isAdmin) {
        console.log(`Utilisateur ${id} promu administrateur.`);
    } else if (result) {
        console.log(`Utilisateur ${id} à était dé promu.`);
    }

    return result;
}

export async function AcceptTermsAsync(id: number): Promise<boolean> {
    const result = await UpdateByIdAsync(id, { hasAcceptedTerms: true });

    if (result) {
        console.log(`Utilisateur ${id} a accepté les conditions.`);
    }

    return result;
}

export async function UpdateEmailAsync(id: number, newEmail: string): Promise<boolean> {
    const existingUser = await GetByEmailAsync(newEmail);

    if (existingUser && existingUser.id !== id) {
        console.log(`L'email ${newEmail} est déjà utilisé par un autre utilisateur.`);
        return false;
    }

    return await UpdateByIdAsync(id, { email: newEmail });
}

export async function UpdatePhoneNumberAsync(id: number, newPhoneNumber: string): Promise<boolean> {
    return await UpdateByIdAsync(id, { phoneNumber: newPhoneNumber });
}

export async function SearchByNameAsync(searchTerm: string): Promise<User[]> {
    const allUsers = await GetAllAsync();
    const searchLower = searchTerm.toLowerCase();

    const filteredUsers = allUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
    );

    console.log(`${filteredUsers.length} utilisateur(s) trouvé(s) pour la recherche "${searchTerm}".`);
    return filteredUsers;
}

export async function CountAsync(): Promise<number> {
    const usersSnapshot = await db.collection("users").get();
    return usersSnapshot.size;
}

export async function CountAdminsAsync(): Promise<number> {
    const usersSnapshot = await db.collection("users")
        .where("isAdmin", "==", true)
        .get();
    return usersSnapshot.size;
}

export async function CountActiveUsersAsync(): Promise<number> {
    const usersSnapshot = await db.collection("users")
        .where("isActive", "==", true)
        .get();
    return usersSnapshot.size;
}

export async function GetByFilterAsync(field: string, operator: FirebaseFirestore.WhereFilterOp, value: any): Promise<User[]> {
    const usersSnapshot = await db.collection("users")
        .where(field, operator, value)
        .get();

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
        users.push(doc.data() as User);
    });

    console.log(`${users.length} utilisateur(s) trouvé(s) avec le filtre ${field} ${operator} ${value}.`);
    return users;
}