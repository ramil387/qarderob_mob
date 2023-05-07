import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import filterStates from "../filter/filterStates"

export const fetchProducts = async (page: number) => {
    try {
        console.log({ queries: filterStates.query })



        const resp = await http.get(`${APIS.ads}?page=${page}`)
        return resp.data



    } catch (error) {
        console.log(error)
    }
}