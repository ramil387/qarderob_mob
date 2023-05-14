import { AdListType } from "@/types/adListType";
import { ProdListType } from "@/types/productListType";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStates {
    products: ProdListType | null = null;
    selectedProduct: AdListType | null = null;
    productListScrollDirection: "up" | "down" | null = null;
    relatedProducts: ProdListType | null = null;
    selectedImageIndex: number = 0;
    showZoomImageModal: boolean = false;

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

    setRelatedProducts(products: ProdListType | null) {
        runInAction(() => {
            this.relatedProducts = products;
        })
    }

    resetSelectedProduct() {
        runInAction(() => {
            this.selectedProduct = null;
        })
    }

    resetRelatedProducts() {
        runInAction(() => {
            this.relatedProducts = null;
        })
    }

    setSelectedImageIndex(index: number) {
        runInAction(() => {
            this.selectedImageIndex = index;
        })
    }

    setShowZoomImageModal(show: boolean) {
        runInAction(() => {
            this.showZoomImageModal = show;
        })
    }


}

export default new ProductStates();