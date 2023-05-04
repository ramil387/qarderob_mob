import { apis } from "@/services/apis"
import { http } from "@/services/httpMethods"
import filterStates from "./filterStates"

export const fetchColors = async () => {
    try {
        const resp = await http.get(apis.api_colors)
        filterStates.setColors(resp.data.data)
    } catch (error) {
        console.log(error)
    }
}