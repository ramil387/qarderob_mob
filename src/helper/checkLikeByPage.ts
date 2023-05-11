import generalStates from "@/states/general/generalStates";
import productStates from "@/states/product/productStates";
import shopStates from "@/states/shop/shopStates";
import userStates from "@/states/user/userStates";
import { runInAction, toJS } from "mobx";

export const checkLikeByPage = (id: any, like: number) => {
    if (generalStates.curPage !== 'HomePage') {
        // update homeDatas last_ads and vip_ads
        const lastAds = toJS(generalStates.homeDatas?.last_ads);
        const vipAds = toJS(generalStates.homeDatas?.vip_ads);
        const products: any = toJS(productStates.products);
        const userProducts: any = toJS(userStates.userProducts?.data);
        const shopProducts: any = toJS(shopStates.shopProducts?.data);

        const lastAdsIndex = lastAds.findIndex((item: any) => item.id === id);
        const vipAdsIndex = vipAds.findIndex((item: any) => item.id === id);
        const productsIndex = products?.data.findIndex((item: any) => item.id === id);
        const userProductsIndex = userProducts.findIndex((item: any) => item.id === id);
        const shopProductsIndex = shopProducts.findIndex((item: any) => item.id === id);

        if (lastAdsIndex !== -1) {
            lastAds[lastAdsIndex].isFavourite = like.toString();
            runInAction(() => {
                generalStates.homeDatas!.last_ads = lastAds;
            });
        }
        if (vipAdsIndex !== -1) {
            vipAds[vipAdsIndex].isFavourite = like.toString();
            runInAction(() => {
                generalStates.homeDatas!.vip_ads = vipAds;
            });
        }
        if (productsIndex !== -1) {
            products.data[productsIndex].isFavourite = like.toString();
            runInAction(() => {
                productStates.products = products;
            });
        }
        if (userProductsIndex !== -1) {
            userProducts.data[userProductsIndex].isFavourite = like.toString();
            runInAction(() => {
                userStates.userProducts = userProducts;
            });
        }

        if (shopProductsIndex !== -1) {
            shopProducts.data[shopProductsIndex].isFavourite = like.toString();
            runInAction(() => {
                shopStates.shopProducts = shopProducts;
            });
        }
    }
};