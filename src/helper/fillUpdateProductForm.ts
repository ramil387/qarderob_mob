import addProductStates from "@/states/product/addProduct/addProductStates";
import { AdListType } from "@/types/adListType";

export const fillUpdateProductForm = (product: AdListType | null) => {
    if (!product) return;
    addProductStates.setUpdate(true);
    addProductStates.setImages(product.images);
    addProductStates.setProductDescription(product.description);
    addProductStates.setCategoryId(product.category_id);
    addProductStates.setBrandId(product.brand_id);
    addProductStates.setProductStatus(product.product_status);
    addProductStates.setSizeId(product.size);
    addProductStates.setColorId(product.color);
    addProductStates.setProductPrice(String(product.price));
    addProductStates.setCityId(product.city);
}