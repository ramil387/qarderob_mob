import { http } from "@/services/httpMethods"
import filterStates from "@/states/filter/filterStates";
import addProductStates from "./addProductStates";
import { makeSlugify } from "@/helper/makeSlugify";
import profileStates from "@/states/profile/profileStates";
import slugify from "slugify";
import { APIS } from "@/constants";
import { fetchMe } from "@/states/profile/fetchMe";
import { fetchSingleProduct } from "../fetchSingleProduct";
import generalStates from "@/states/general/generalStates";
import productStates from "../productStates";
import { StackActions } from "@react-navigation/native";

export const createProduct = async () => {
    try {

        addProductStates.setIsLoading(true);

        const macroCat = filterStates.sortedCategories.find(
            (cat) => cat.id === addProductStates.categoryId,
        );

        const mainCat = filterStates.sortedCategories.find(
            (cat) => cat.id === macroCat?.parent_id,
        );

        const sub = filterStates.sortedCategories.find(
            (cat) => cat.parent_id === addProductStates.categoryId,
        );

        const categories = [mainCat?.parent_id, macroCat?.parent_id, addProductStates.categoryId, sub?.id].filter(cat => cat);
        const title = filterStates.brands.find((brand) => brand.id === addProductStates?.brandId)?.name ?? ""
        const keywords = `${title},${macroCat?.slug_az ?? ""},${mainCat?.slug_az ?? ""},${sub?.slug_az ?? ""}`

        const images = addProductStates.images.map((image) => {
            return image?.name
        })

        const body = {
            description: addProductStates.productDescription,
            category_id: addProductStates.categoryId,
            brand_id: addProductStates.brandId,
            product_status: addProductStates.productStatus,
            title,
            slug: makeSlugify(title),
            size: addProductStates.sizeId,
            color: addProductStates.colorId,
            city: addProductStates.cityId,
            price: addProductStates.productPrice,
            categories,
            isFamous: profileStates.user?.isFamous,
            keywords,
            user_id: profileStates.user?.id,
            images,
            is_store: profileStates?.storeMode,
            store_id: profileStates?.user?._store?.id || 0,
            contact: {
                full_name: addProductStates.fullName,
                email: addProductStates.email,
                phone: '0' + addProductStates.phone.slice(4),
                hide: addProductStates.hideNumber
            }
        }
        console.log({ body })
        const resp = await http.post(APIS.ads, body)
        const data = await fetchSingleProduct(resp?.data?.id, body?.slug)
        console.log({ data })
        productStates.setSelectedProduct(data?.data)
        await fetchMe()
        generalStates.navigationRef?.current?.dispatch(
            StackActions.replace("ProductDetailPage")
        )

    } catch (error) {
        console.log(error)
    } finally {
        addProductStates.setIsLoading(false);
    }
}