import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import notificationStates from "./notificationStates"

export const fetchComments = async (adId: number | undefined) => {
    try {
        if (!adId) return;
        const resp = await http.get(APIS.comments + `/${adId}?page=1`)
        console.log({ data: resp?.data })
        notificationStates.setComments(resp?.data)
    } catch (error) {
        console.log(error)
    }
}