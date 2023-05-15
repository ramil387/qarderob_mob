import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import { fetchNotificationCount } from "./fetchNotificationCount";
import { fetchNotifications } from "./fetchNotifications";

export const readNotification = async (id: number | null) => {
    try {
        if (!id) return;
        await http.patch(`${APIS.notifications}/read/${id}`)
        await fetchNotificationCount()
        await fetchNotifications()
    } catch (error) {
        console.log(error);
    }
}