import { APIS } from "@/constants";
import generalStates from "./generalStates";
import { fetchCities } from "../filter/fetchCities";
import { http } from "@/services/httpMethods";


export const fetchHome = async () => {
    try {
        const response = await http.get(APIS.home)
        generalStates.setHomeDatas(response.data.data)
        fetchCities();
    } catch (error) {
        console.log(error)
    }
}