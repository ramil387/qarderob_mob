import { AdListType } from "@/types/adListType";
import { makeAutoObservable, runInAction } from "mobx";

class AddProductStates {
    images: any[] = [];
    imageDate: string = '';

    updatedProduct: AdListType | null = null;

    productDescription: string = "";
    categoryId: number | null = null;
    brandId: number | null = null;
    productStatus: number | null = null;
    sizeId: number | null = null;
    colorId: number | null = null;
    productPrice: string = ''
    cityId: number | null = null;
    hideNumber: boolean = false;
    // contact
    fullName: string = '';
    email: string = '';
    phone: string = '';

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setImages(images: any[]) {
        runInAction(() => {
            this.images = images;
        })
    }

    setProductDescription(description: string) {
        runInAction(() => {
            this.productDescription = description;
        })
    }

    setCategoryId(categoryId: number | null) {
        runInAction(() => {
            this.categoryId = categoryId;
        })
    }

    setBrandId(brandId: number | null) {
        runInAction(() => {
            this.brandId = brandId;
        })
    }

    setProductStatus(productStatus: number | null) {
        runInAction(() => {
            this.productStatus = productStatus;
        })
    }

    setSizeId(sizeId: number | null) {
        runInAction(() => {
            this.sizeId = sizeId;
        })
    }

    setColorId(colorId: number | null) {
        runInAction(() => {
            this.colorId = colorId;
        })
    }


    setProductPrice(productPrice: string) {
        runInAction(() => {
            this.productPrice = productPrice;
        })
    }

    setCityId(cityId: number | null) {
        runInAction(() => {
            this.cityId = cityId;
        })
    }

    setImageDate(imageDate: string) {
        runInAction(() => {
            this.imageDate = imageDate;
        })
    }

    setHideNumber(hideNumber: boolean) {
        runInAction(() => {
            this.hideNumber = hideNumber;
        })
    }

    setFullName(fullName: string) {
        runInAction(() => {
            this.fullName = fullName;
        })
    }

    setEmail(email: string) {
        runInAction(() => {
            this.email = email;
        })
    }

    setPhone(phone: string) {
        runInAction(() => {
            this.phone = phone;
        })
    }

    setIsLoading(isLoading: boolean) {
        runInAction(() => {
            this.isLoading = isLoading;
        })
    }

    resetAddProductStates() {
        runInAction(() => {
            this.images = [];
            this.imageDate = '';
            this.productDescription = "";
            this.categoryId = null;
            this.brandId = null;
            this.productStatus = null;
            this.sizeId = null;
            this.colorId = null;
            this.productPrice = ''
            this.cityId = null;
            this.hideNumber = false;
            this.fullName = '';
            this.email = '';
            this.phone = '';
            this.isLoading = false;
        })
    }

}

export default new AddProductStates();