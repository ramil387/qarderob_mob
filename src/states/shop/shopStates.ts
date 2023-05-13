import { ProdListType } from "@/types/productListType";
import { ShopType } from "@/types/shopType";
import { makeAutoObservable, runInAction } from "mobx";

class ShopStates {
    shops: ShopType[] = [];
    selectedShop: ShopType | null = null;
    shopProducts: ProdListType | null = null;

    // createShop ------------------------------
    name: string = '';
    address: string = '';
    desc: string = '';
    phone: string = '+994';
    email: string = '';
    startHour: string = '';
    endHour: string = '';
    work_days: '1' | '2' | '3' = '1';
    img: string = '';
    cover: string = '';
    isOnline: boolean = false;
    // ------------------------------------------

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

    // createShop ------------------------------
    setName(name: string) {
        runInAction(() => {
            this.name = name;
        })
    }
    setAddress(address: string) {
        runInAction(() => {
            this.address = address;
        })
    }

    setDesc(desc: string) {
        runInAction(() => {
            this.desc = desc;
        })
    }

    setPhone(phone: string) {
        runInAction(() => {
            this.phone = phone;
        })
    }

    setEmail(email: string) {
        runInAction(() => {
            this.email = email;
        })
    }

    setStartHour(startHour: string) {
        runInAction(() => {
            this.startHour = startHour;
        })
    }

    setEndHour(endHour: string) {
        runInAction(() => {
            this.endHour = endHour;
        })
    }

    setWorkDays(work_days: '1' | '2' | '3') {
        runInAction(() => {
            this.work_days = work_days;
        })
    }

    setImg(img: string) {
        runInAction(() => {
            this.img = img;
        })
    }

    setCover(cover: string) {
        runInAction(() => {
            this.cover = cover;
        })
    }

    setIsOnline(isOnline: boolean) {
        runInAction(() => {
            this.isOnline = isOnline;
        })
    }


    // ------------------------------------------

}

export default new ShopStates();