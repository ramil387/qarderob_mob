import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"

export const fetchUserProducts = async (id: number | null, verified: string, page: number, is_store: boolean) => {
    try {
        console.log({ store: is_store })
        const resp = await http.get(`${APIS.ads}?user_id=${id}&page=${page}&verified=${verified}&is_store=${is_store}`)
        return resp?.data
    } catch (err) {
        console.log(err)
    }
}