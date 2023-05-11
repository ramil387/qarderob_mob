import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import productStates from "./productStates"

export const fetchLikeCount = async (id: number | undefined) => {
    try {
        if (!id) return
        const resp = await http.get(`${APIS.statLike}/${id}`)
        console.log("countu beraberder:", resp?.data)
        productStates.setSelectedProduct({
            ...productStates.selectedProduct,
            like_count: resp.data
        } as any)
    } catch (error) {
        console.log(error)
    }
}