import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import productStates from "./productStates"

export const fetchRelatedProducts = async (category: string) => {
    try {
        const resp = await http.get(`${APIS.ads}?categories=${category}&verified=true`)
        if (resp.data) {
            productStates.setRelatedProducts(resp.data)
        }
    } catch (error) {
        console.log(error)
    }
}