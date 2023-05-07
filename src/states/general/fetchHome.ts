import { APIS } from "@/constants";
import generalStates from "./generalStates";
import { http } from "@/services/httpMethods";


export const fetchHome = async () => {
    try {
        const response = await http.get(APIS.home)
        generalStates.setHomeDatas(response.data.data)
    } catch (error) {
        console.log(error)
    }
}