import { ProdListType } from "@/types/productListType";
import { ShopType } from "@/types/shopType";
import { makeAutoObservable, runInAction } from "mobx";

class ShopStates {
    isCreateShopLoading: boolean = false;

    shops: ShopType[] = [];
    selectedShop: ShopType | null = null;
    shopProducts: ProdListType | null = null;

    // createShop ------------------------------
    shopImg: any = null;
    shopCover: any = null;
    name: string = '';
    address: string = '';
    desc: string = '';
    phone: string = '+994';
    email: string = '';
    start_hour: string = '';
    end_hour: string = '';
    work_days: '1' | '2' | '3' = '1';
    isOnline: boolean = false;
    isHourModalOpen: boolean = false;
    imageDate: string = '';
    facebook: string = '';
    instagram: string = '';
    tiktok: string = '';

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
            this.start_hour = startHour;
        })
    }

    setEndHour(endHour: string) {
        runInAction(() => {
            this.end_hour = endHour;
        })
    }

    setWorkDays(work_days: '1' | '2' | '3') {
        runInAction(() => {
            this.work_days = work_days;
        })
    }



    setIsOnline(isOnline: boolean) {
        runInAction(() => {
            this.isOnline = isOnline;
        })
    }

    setShopImg(img: any) {
        runInAction(() => {
            this.shopImg = img;
        })
    }

    setShopCover(cover: any) {
        runInAction(() => {
            this.shopCover = cover;
        })
    }

    setCreateShopLoading(isLoading: boolean) {
        runInAction(() => {
            this.isCreateShopLoading = isLoading;
        })
    }

    setIsHourModalOpen(isOpen: boolean) {
        runInAction(() => {
            this.isHourModalOpen = isOpen;
        })
    }

    setImageDate(date: string) {
        runInAction(() => {
            this.imageDate = date;
        })
    }

    setFacebook(facebook: string) {
        runInAction(() => {
            this.facebook = facebook;
        })
    }

    setInstagram(instagram: string) {
        runInAction(() => {
            this.instagram = instagram;
        })
    }

    setTiktok(tiktok: string) {
        runInAction(() => {
            this.tiktok = tiktok;
        })
    }

    resetCreateShop() {
        runInAction(() => {
            this.shopImg = {};
            this.shopCover = {};
            this.name = '';
            this.address = '';
            this.desc = '';
            this.phone = '+994';
            this.email = '';
            this.start_hour = '';
            this.end_hour = '';
            this.work_days = '1';
            this.isOnline = false;
            this.isHourModalOpen = false;
            this.imageDate = '';
            this.facebook = '';
            this.instagram = '';
            this.tiktok = '';
        })
    }

    // ------------------------------------------

}

export default new ShopStates();