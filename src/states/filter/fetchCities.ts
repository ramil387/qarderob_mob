import { apis } from "@/services/apis"
import { http } from "@/services/httpMethods"
import filterStates from "./filterStates"

export const fetchCities = async () => {
    try {
        const resp = await http.get(apis.api_cities)
        filterStates.setCities(resp.data.data)
    } catch (error) {
        console.log(error)
    }
}