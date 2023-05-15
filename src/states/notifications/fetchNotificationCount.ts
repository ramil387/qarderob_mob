import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import notificationStates from "./notificationStates"

export const fetchNotificationCount = async () => {
    try {
        const resp = await http.get(`${APIS.notifications}/counts`)
        console.log(resp.data)
        const allCount = resp.data.data.all_notification_count
        const chatCount = resp.data.data.chat_notification_count
        notificationStates.setNotificationCount(allCount, chatCount)
    } catch (error) {
        console.log(error)
    }
}