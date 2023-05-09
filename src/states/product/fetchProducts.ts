import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import filterStates from "../filter/filterStates"
import { CategoryType } from "@/types/categoryType"

export const fetchProducts = async (page: number) => {
    try {
        const brand = filterStates.query?.brand
        const category = filterStates.query?.categories
        const productStatus = filterStates.query?.productStatus
        const city = filterStates.query?.city

        const selectedBrand = Object.keys(brand)?.filter((key) => brand[key]);
        const selectedCity = Object.keys(city)?.filter((key) => city[key]);
        const selectedCategory = category?.map((cat: CategoryType) => cat?.slug_az);
        const selectedColor = filterStates?.query.color
        const selectedSize = filterStates?.query.size
        const selectedPrice = filterStates?.query.price
        const selectedProductStatus = productStatus?.map((status: CategoryType) => status?.id)

        const queries: any = {
            brand: selectedBrand,
            categories: selectedCategory,
            color: selectedColor,
            size: selectedSize,
            price: selectedPrice.filter((price: any) => price.length > 0),
            productStatus: selectedProductStatus,
            city: selectedCity,
            sortby: filterStates.query?.sortby,
            user_id: filterStates.query?.user_id,
            verified: filterStates.query?.verified,
            q: filterStates.query?.q,
        }

        // console.log({ data: Object.entries(queries) })

        const queryStrings = [];


        for (const [key, value] of Object.entries(queries)) {
            if (Array.isArray(value)) {
                value.forEach((v) => queryStrings.push(`${key}=${v}`));
            } else if (value) {
                queryStrings.push(`${key}=${value}`);
            }
        }

        const queryString = queryStrings.join('&');
        const resp = await http.get(`${APIS.ads}?page=${page}&${queryString}`);

        return resp.data

    } catch (error) {
        console.log(error)
    }
}