import { apis } from "@/services/apis";
import { http } from "@/services/httpMethods";
import filterStates from "./filterStates";

export const fetchCategories = async () => {
    try {
        const response = await http.get(apis.api_categories);
        filterStates.setSortedCategories(response.data.data);
    } catch (error) {
        console.log(error)
    }
}