import { http } from "@/services/httpMethods";
import filterStates from "./filterStates";
import { APIS } from "@/constants";

export const fetchFilterData = async () => {
    try {
        filterStates.setIsLoadingFilter(true);
        const resp = await http.get(APIS.filter);
        if (resp.data) {
            filterStates.setSortedCategories(resp.data.categories);
            filterStates.setBrands(resp.data.brands);
            filterStates.setCities(resp.data.cities);
            filterStates.setColors(resp.data.colors);
            filterStates.setSizes(resp.data.sizes);
        }

    } catch (error) {
        console.log(error)
    } finally {
        filterStates.setIsLoadingFilter(false);
    }
}