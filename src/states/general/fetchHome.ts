import { APIS } from "@/constants";
import axios from "axios";
import generalStates from "./generalStates";
import { fetchCities } from "../filter/fetchCities";


export const fetchHome = async () => {
    try {
        const response = await axios.get(APIS.home)
        generalStates.setHomeDatas(response.data.data)
        fetchCities();
    } catch (error) {
        console.log(error)
    }
}