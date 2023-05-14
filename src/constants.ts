import {
    SERVER_URL,
    ASSET_URL, WEBSITE, SERVER_BASE
} from "@env"
export const baseUrl = SERVER_URL
export const assetUrl = ASSET_URL
export const website = WEBSITE
export const serverBase = SERVER_BASE
export const APIS = {
    auth: 'auth',
    home: 'home/mobile',
    filter: 'home/filter-data',
    banners: 'banners',
    influencers: 'auth/influencers',
    stores: 'stores',
    login: 'auth/login',
    me: 'auth/me',
    updateProfile: 'auth/user',
    ads: 'ads',
    stats: "stats",
    userInfo: 'users',
    payment: 'payment',
    search: "search",
    statLike: 'stats/ads-like',
    contact: 'contact',
    rules: 'rules',
    deals: 'deals',
    upload: 'upload/create',
    checkOrder: 'payment/check-payment'
}

export const shopCoverImage = `${serverBase}/shop_cover.png`
export const shopLogoImage = `${serverBase}/shop_profile.png`
export const userProfileImage = `${serverBase}/profile.png`


export const providers = ['050', '051', '055', '077', '010', '099', '070', '077', '060']
