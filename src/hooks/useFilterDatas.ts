
import { fetchFilterData } from "@/states/filter/fetchFilterData";
import { useEffect } from "react"

export const useFilterDatas = () => {

    useEffect(() => {
        fetchFilterData();
    }, [])
}