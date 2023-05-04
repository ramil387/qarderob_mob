import { AdListType } from "@/types/adListType";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStates {
    selectedProduct: AdListType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedProduct(product: AdListType | null) {
        runInAction(() => {
            this.selectedProduct = product;
        })
    }

}

export default new ProductStates();