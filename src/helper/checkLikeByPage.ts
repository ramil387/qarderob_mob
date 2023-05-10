import generalStates from "@/states/general/generalStates";
import productStates from "@/states/product/productStates";
import { runInAction, toJS } from "mobx";

export const checkLikeByPage = (id: any, like: number) => {
    if (generalStates.curPage !== 'HomePage') {
        // update homeDatas last_ads and vip_ads
        const lastAds = toJS(generalStates.homeDatas?.last_ads);
        const vipAds = toJS(generalStates.homeDatas?.vip_ads);
        const products: any = toJS(productStates.products);
        const lastAdsIndex = lastAds.findIndex((item: any) => item.id === id);
        const vipAdsIndex = vipAds.findIndex((item: any) => item.id === id);
        const productsIndex = products?.data.findIndex((item: any) => item.id === id);
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
    }
};