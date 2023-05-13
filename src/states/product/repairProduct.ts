import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";
import { fetchSingleProductById } from "./fetchSingleProduct";
import productStates from "./productStates";

export const repairProduct = async (id: number | null) => {
    try {
        if (!id) return;
        const resp = await http.patch(
            `${APIS.ads}/restore/${id}`,
            { verified: 'true' },
        );
        if (resp.status === 200) {
            const data = await fetchSingleProductById(id);
            productStates?.setSelectedProduct(data.data);
        }
    } catch (error) {
        console.log(error)
    }
}