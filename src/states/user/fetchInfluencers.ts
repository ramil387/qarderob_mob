import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import userStates from "./userStates"

export const fetchInfluencers = async (page: number = 1) => {
    try {
        const resp = await http.get(APIS.influencers + "?page=" + page)
        userStates.setInfluencers(resp.data.data)
    } catch (error) {
        console.log(error)
    }
}