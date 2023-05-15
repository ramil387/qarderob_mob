import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import { fetchNotifications } from "./fetchNotifications";

export const deleteNotification = async (id: number) => {
    const resp = await http.delete(APIS.notifications + `/${id}`);
    if (resp.status === 200) {
        fetchNotifications();
    }
}