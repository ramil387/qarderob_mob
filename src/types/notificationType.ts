import { AdListType } from "./adListType"
import { UserType } from "./userType"

export type NotificationType = {
    ad: AdListType,
    body: string,
    created_at: string,
    id: number,
    is_read: boolean,
    sender: UserType,
    title: string
}