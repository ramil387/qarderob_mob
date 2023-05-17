import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import messageStates from "./messageStates"

export const fetchInbox = async (type?: string) => {
    try {
        const resp = await http.post(`${APIS.messages}/get-messages`, { type })
        messageStates.setInbox(resp?.data)
    } catch (error) {
        console.log(error)
    }
}