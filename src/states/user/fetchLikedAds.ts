import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import userStates from "./userStates"

export const fetchLikedAds = async (page: number = 1) => {
    try {
        const resp = await http.get(APIS.stats + "/liked-ads?page=" + page)
        userStates.setLikedProducts(resp.data)
    } catch (error) {
        console.log(error)
    }
}