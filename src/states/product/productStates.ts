import { AdListType } from "@/types/adListType";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStates {
    selectedProduct: AdListType | null = null;
    productListScrollDirection: "up" | "down" | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    setSelectedProduct(product: AdListType | null) {
        runInAction(() => {
            this.selectedProduct = product;
        })
    }

    setProductListScrollDirection(direction: "up" | "down" | null) {
        runInAction(() => {
            this.productListScrollDirection = direction;
        })
    }

}

export default new ProductStates();