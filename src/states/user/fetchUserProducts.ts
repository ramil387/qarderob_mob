import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"

export const fetchUserProducts = async (id: number | null, verified: string, page: number) => {
    try {
        const resp = await http.get(`${APIS.ads}?user_id=${id}&page=${page}&verified=${verified}`)
        return resp?.data
    } catch (err) {
        console.log(err)
    }
}