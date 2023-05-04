import { apis } from "@/services/apis"
import { http } from "@/services/httpMethods"
import filterStates from "./filterStates"

export const fetchBrands = async () => {
    try {
        const resp = await http.get(apis.api_brands)
        filterStates.setBrands(resp.data.data)
    } catch (error) {
        console.log(error)
    }
}