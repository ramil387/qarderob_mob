import { APIS } from "@/constants";
import axios from "axios";
import generalStates from "./generalStates";


export const fetchHome = async () => {
    try {
        const response = await axios.get(APIS.home)
        generalStates.setHomeDatas(response.data.data)
    } catch (error) {
        console.log(error)
    }
}