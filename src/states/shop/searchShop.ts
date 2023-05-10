import { APIS } from "@/constants"
import { makeSlugify } from "@/helper/makeSlugify"
import { http } from "@/services/httpMethods"
import shopStates from "./shopStates"

export const searchShop = async (searchValue: string) => {
    try {
        const resp = await http.get(`${APIS.stores}?q=${makeSlugify(searchValue)}`)
        shopStates.setShops(resp.data.data);
    } catch (error) {
        console.log(error)
    }
}