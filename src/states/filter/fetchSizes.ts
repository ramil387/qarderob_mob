import { apis } from "@/services/apis"
import { http } from "@/services/httpMethods"
import filterStates from "./filterStates";

export const fetchSizes = async () => {
    try {
        const resp = await http.get(apis.api_sizes);
        filterStates.setSizes(resp.data.data);
    } catch (error) {
        console.log(error)
    }
}