import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import notificationStates from "./notificationStates"

export const fetchNotificationCount = async () => {
    try {
        const resp = await http.get(`${APIS.notifications}/counts`)
        notificationStates.setNotificationCount(resp.data.data)
    } catch (error) {
        console.log(error)
    }
}