import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import notificationStates from "./notificationStates"

export const fetchNotifications = async (page: number | null = 1) => {
    try {
        const resp = await http.get(`${APIS.notifications}?page=${page}`)
        notificationStates.setNotifications(resp.data)
    } catch (error) {
        console.log(error)
    }
}