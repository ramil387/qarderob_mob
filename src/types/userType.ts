import { ShopType } from "./shopType"

export type UserType = {
    id: number,
    full_name: string,
    username: string,
    photo: string,
    cover: string,
    email: string,
    phone: string,
    phone_hide: boolean,
    facebookId: null,
    isAdmin: boolean,
    isModer: boolean,
    isVip: boolean,
    isFamous: boolean,
    isActive: boolean,
    sot: null,
    is_store: boolean,
    is_inf: string,
    social_links: {
        facebook: string,
        instagram: string,
        tiktok: string,
    },
    user_balance: number,
    shop_balance: number,
    register_origin: string,
    secretBase32: null,
    orderNumber: number,
    createdAt: string,
    _store: Partial<ShopType>,
    _active_package: any
}