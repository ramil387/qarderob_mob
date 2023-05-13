import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"

export const fetchSingleProduct = async (id: number | undefined, slug: string | undefined) => {
    try {
        if (!id && !slug) return
        const resp = await http.get(`${APIS.ads}?slugged=${id}-${slug}`)
        return resp.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchSingleProductById = async (id: number | undefined) => {
    try {
        if (!id) return
        const resp = await http.get(`${APIS.ads}?id=${id}`)
        return resp?.data
    } catch (error) {
        console.log(error)
    }
}
