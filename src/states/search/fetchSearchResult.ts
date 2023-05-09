import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import searchStates from "./searchStates";

export const fetchSearchResult = async (searchValue: string, searchType: "user" | 'product') => {
    try {
        if (searchType === 'user') {
            const resp = await http.get(`${APIS.search}/users?q=${searchValue}`)
            searchStates.setUserResults(resp.data);
        } else {
            const resp = await http.get(`${APIS.search}?q=${searchValue}`);
            searchStates.setProductResults(resp.data);
        }

    } catch (error) {
        console.log(error);
    }
}