import { http } from "@/services/httpMethods"
import messageStates from "./messageStates"
import { APIS } from "@/constants"

export const fetchChat = async (id?: string, page: number = 1) => {
    try {
        const resp = await http.get(`${APIS.messages}/chat/${id}?page=${page}`)
        messageStates.setChat(resp.data)
    } catch (error) {
        console.log(error)
    }
}