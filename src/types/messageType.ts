import { AdListType } from "./adListType";

export type MessageType = {
    ad: Partial<AdListType>;
    conversation_partner: {
        id: number;
        img: string;
        is_blocked: boolean;
        is_store: boolean;
        name: string;
        phone: string;
        user_id: number;
    },
    createdAt: string;
    id: number;
    is_read: boolean;
    message: string;
    unreadMessageCount: number;
    updatedAt: string;
    uuid: string;
}