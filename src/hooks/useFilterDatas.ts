import { fetchBrands } from "@/states/filter/fetchBrands";
import { fetchCategories } from "@/states/filter/fetchCategories"
import { fetchCities } from "@/states/filter/fetchCities";
import { fetchColors } from "@/states/filter/fetchColors";
import { fetchSizes } from "@/states/filter/fetchSizes";
import filterStates from "@/states/filter/filterStates";
import { useEffect } from "react"

export const useFilterDatas = () => {
    const fetchAllDatas = async () => {
        filterStates.setIsLoadingFilter(true);
        await fetchCategories();
        await fetchBrands();
        await fetchColors();
        await fetchSizes();
        await fetchCities();
        filterStates.setIsLoadingFilter(false);
    }
    useEffect(() => {
        fetchAllDatas();
    }, [])
}