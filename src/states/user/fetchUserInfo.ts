import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import userStates from "./userStates"

export const fetchUserInfo = async (id: number | null) => {
    try {
        if (!id) return;
        const resp = await http.get(`${APIS.userInfo}/${id}`)
        userStates.setSelectedAdOwner(resp.data.data)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}