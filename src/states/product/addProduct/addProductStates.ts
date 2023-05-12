import { makeAutoObservable, runInAction } from "mobx";

class AddProductStates {
    images: any[] = [];
    imageDate: string = '';

    productDescription: string = "";
    categoryId: number | null = null;
    brandId: number | null = null;
    productStatus: number | null = null;
    sizeId: number | null = null;
    colorId: number | null = null;
    productPrice: string = ''
    cityId: number | null = null;
    hideNumber: boolean = false;

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


}

export default new AddProductStates();