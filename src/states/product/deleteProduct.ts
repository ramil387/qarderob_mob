import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"

export const deleteProduct = async (id: number | undefined) => {
    try {
        const resp = await http.patch(`${APIS.ads}/client/${id}`)
        if (resp.status === 200) {
            return resp.data
        }
    } catch (error) {
        console.log(error)
    }
}