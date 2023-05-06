import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import shopStates from "./shopStates";

export const fetchShops = async (page?: number) => {
    try {
        const response = await http.get(APIS.STORES);
        shopStates.setShops(response.data.data);
    } catch (error) {
        console.log(error)
    }
}