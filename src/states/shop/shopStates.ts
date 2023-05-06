import { ShopType } from "@/types/shopType";
import { makeAutoObservable, runInAction } from "mobx";

class ShopStates {
    shops: ShopType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setShops(shops: ShopType[]) {
        runInAction(() => {
            this.shops = shops;
        })
    }
}

export default new ShopStates();