import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import shopStates from "./shopStates"

export const fetchShopInfo = async (shopId: number) => {
    try {
        const resp = await http.get(`${APIS.stores}?id=${shopId}`)
        shopStates?.setSelectedShop(resp.data.data[0])
    } catch (error) {
        console.log(error)
    }
}