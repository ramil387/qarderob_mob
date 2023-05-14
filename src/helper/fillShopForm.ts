import shopStates from "@/states/shop/shopStates"
import { ShopType } from "@/types/shopType";

export const fillShopForm = (shop: ShopType) => {
    console.log(shop?.address)
    shopStates.setIsUpdate(true);
    shopStates.setName(shop?.name ?? "");
    shopStates.setAddress(shop?.address ?? "");
    shopStates.setDesc(shop?.desc ?? "");
    shopStates.setPhone('+994' + shop?.phone.slice(1) ?? "");
    shopStates.setEmail(shop?.email ?? "");
    shopStates.setStartHour(shop?.start_hour ?? "");
    shopStates.setEndHour(shop?.end_hour ?? "");
    shopStates.setWorkDays((shop?.work_days ?? "1") as '1' | '2' | '3');
    shopStates.setFacebook(shop?.social_links?.facebook ?? "");
    shopStates.setInstagram(shop?.social_links?.instagram ?? "");
    shopStates.setTiktok(shop?.social_links?.tiktok ?? "");
    if (shop?.img) shopStates.setShopCover({ name: shop?.img })
    if (shop?.cover) shopStates.setShopImg({ name: shop?.cover })
}