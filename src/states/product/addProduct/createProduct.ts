import { http } from "@/services/httpMethods"
import filterStates from "@/states/filter/filterStates";
import addProductStates from "./addProductStates";

export const createProduct = async () => {
    try {



        const macroCat = filterStates.sortedCategories.find(
            (cat) => cat.id === addProductStates.categoryId,
        )?.parent_id;

        const mainCat = filterStates.sortedCategories.find(
            (cat) => cat.id === macroCat,
        )?.parent_id;

        const sub = filterStates.sortedCategories.find(
            (cat) => cat.parent_id === addProductStates.categoryId,
        )?.id;

        const categories = [mainCat, macroCat, addProductStates.categoryId, sub].filter(cat => cat);







    } catch (error) {
        console.log(error)
    }
}