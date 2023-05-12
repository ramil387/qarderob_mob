import errorStates from "@/states/error/errorStates";
import addProductStates from "@/states/product/addProduct/addProductStates";

export const addProductValidator = () => {

    if (addProductStates.images.length === 0) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Şəkil seçilməyib');
        return;
    }

    if (!addProductStates.categoryId) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Kateqoriya seçilməyib');
        return;
    }
    if (!addProductStates.brandId) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Marka seçilməyib');
        return;
    }
    if (!addProductStates.productStatus) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Məhsulun vəziyyəti seçilməyib');
        return;
    }

    if (!addProductStates.sizeId) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Ölçü seçilməyib');
        return;
    }

    if (!addProductStates.colorId) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Rəng seçilməyib');
        return;
    }

    if (!addProductStates.productPrice) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Qiymət daxil edilməyib');
        return;
    }

    if (!addProductStates.cityId) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Şəhər seçilməyib');
        return;
    }

    if (addProductStates?.phone.length !== 13) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorAction(false);
        errorStates.setErrorHeader('Telefon nömrəsi daxil edilməyib');
        return;
    }

    return true;
}