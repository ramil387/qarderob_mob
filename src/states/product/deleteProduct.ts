import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import { fetchSingleProductById } from "./fetchSingleProduct";
import productStates from "./productStates";

export const deleteProduct = async (id: number | undefined) => {
    try {
        const resp = await http.patch(`${APIS.ads}/client/${id}`)
        if (resp.status === 200) {
            const data = await fetchSingleProductById(id);
            productStates?.setSelectedProduct(data.data);
        }
    } catch (error) {
        console.log(error)
    }
}