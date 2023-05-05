import {
    SERVER_URL,
    ASSET_URL
} from "@env"
export const baseUrl = SERVER_URL
export const assetUrl = ASSET_URL

export const APIS = {
    home: baseUrl + 'home/mobile',
    banners: baseUrl + 'banners',
}