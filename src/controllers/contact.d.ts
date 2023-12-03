export interface UserContact {
    uid: string,
    username: string,
    email: string,
    photoURL: string
}

export type ContactStatus = "ADDED" | "CLEAR" | "BLOCKED";