import { ProdListType } from "@/types/productListType";
import { ShopType } from "@/types/shopType";
import { makeAutoObservable, runInAction } from "mobx";

class ShopStates {
    shops: ShopType[] = [];
    selectedShop: ShopType | null = null;
    shopProducts: ProdListType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setShops(shops: ShopType[]) {
        runInAction(() => {
            this.shops = shops;
        })
    }

    setSelectedShop(shop: ShopType) {
        runInAction(() => {
            this.selectedShop = shop;
        })
    }

    setShopProducts(shopProducts: ProdListType | null) {
        runInAction(() => {
            this.shopProducts = shopProducts;
        })
    }
}

export default new ShopStates();