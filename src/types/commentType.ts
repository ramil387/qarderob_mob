import { UserType } from "./userType";


export type CommentType = {
    ad_id: number,
    comment: string,
    createdAt: string,
    id: number,
    parent_id: number,
    receiver: UserType,
    receiver_id: number,
    replies: CommentType[],
    sender: UserType,
    sender_id: number,
    updatedAt: string
}