import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"

export const fetchSingleProduct = async (id: number, slug: string) => {
    try {
        const resp = await http.get(`${APIS.ads}?slugged=${id}-${slug}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}