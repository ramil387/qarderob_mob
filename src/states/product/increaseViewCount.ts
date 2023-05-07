import { apis } from "@/services/apis";
import { http } from "@/services/httpMethods";

export const increaseViewCount = (id: number | null, slug: string | null) => {
    if (!id || !slug) return;
    http.get(apis.api_stats + `/view/${id}/${slug}`);
}