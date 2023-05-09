import {
    SERVER_URL,
    ASSET_URL, WEBSITE
} from "@env"
export const baseUrl = SERVER_URL
export const assetUrl = ASSET_URL
export const website = WEBSITE
export const APIS = {
    home: 'home/mobile',
    filter: 'home/filter-data',
    banners: 'banners',
    influencers: 'auth/influencers',
    STORES: 'stores',
    login: 'auth/login',
    me: 'auth/me',
    ads: 'ads',
    stats: "stats",
    userInfo: 'users',
    payment: 'payment',
    search: "search",

}

export const providers = ['050', '051', '055', '077', '010', '099', '070', '077', '060']