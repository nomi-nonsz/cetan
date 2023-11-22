import { Timestamp } from "firebase/firestore"

export interface ConversationMap {
    id: string,
    uid: string,
    message: string,
    imgURL?: string,
    datetime: Timestamp
}

export interface ChatsDocument {
    conversation: ConversationMap[],
    users: string[]
}