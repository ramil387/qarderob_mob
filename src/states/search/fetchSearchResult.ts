import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import searchStates from "./searchStates";

export const fetchSearchResult = async (searchValue: string, searchType: "user" | 'product') => {
    try {
        if (searchType === 'user') {

        } else {
            const resp = await http.get(`${APIS.search}?q=${searchValue}`);
            searchStates.setProductResults(resp.data);
        }

    } catch (error) {
        console.log(error);
    }
}