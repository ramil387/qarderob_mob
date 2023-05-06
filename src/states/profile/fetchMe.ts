import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import profileStates from "./profileStates";

export const fetchMe = async () => {
    try {
        const resp = await http.get(APIS.me);
        profileStates.setUser(resp.data.data);
    } catch (error) {
        console.log(error);
    }
}