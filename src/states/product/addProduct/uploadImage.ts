import { APIS } from "@/constants";
import { http } from "@/services/httpMethods";

export const uploadImage = async (fd: any) => {
    try {
        await http.upload(
            APIS.upload,
            fd,
        );

        return true

    } catch (error) {
        return false
    }
}