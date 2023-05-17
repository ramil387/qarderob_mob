import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import { fetchInbox } from "./fetchInbox"
import messageStates from "./messageStates"

export const deleteInboxItem = async (id?: number) => {
    try {
        const resp = await http.patch(`${APIS.messages}/delete-message/`, { id })
        if (resp?.status === 200) {
            fetchInbox(messageStates.inboxType)
        }
    } catch (error) {
        console.log(error)
    }
}