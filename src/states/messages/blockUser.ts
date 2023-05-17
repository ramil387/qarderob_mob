import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import { fetchInbox } from "./fetchInbox"
import messageStates from "./messageStates"

export const blockUser = async (userId: number) => {
    try {
        const resp = await http.patch(`${APIS.blocked}/toggle`, {
            blocked_id: userId
        })
        console.log(resp?.data)
        if (resp?.status === 200 || resp?.data?.message === 'Success') {
            fetchInbox(messageStates.inboxType)
        }
    } catch (error) {
        console.log(error)
    }
}