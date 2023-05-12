import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";

export const uploadImage = async (fd: any) => {
    try {
        const resp = await http.upload(
            APIS.upload,
            fd,
        );
        return true

    } catch (error) {
        return false
    }
}