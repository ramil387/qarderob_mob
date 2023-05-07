import { AdListType } from "@/types/adListType";
import { ProdListType } from "@/types/productListType";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStates {
    products: ProdListType | null = null;
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

    setProducts(products: ProdListType | null) {
        runInAction(() => {
            this.products = products;
        })
    }

}

export default new ProductStates();