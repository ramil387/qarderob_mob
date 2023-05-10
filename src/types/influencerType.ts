
export type InfluencerType = {
    photo: string,
    cover: string,
    id: number,
    full_name: string,
    username: string,
    email: string,
    phone: string,
    phone_hide: boolean,
    isFamous: boolean,
    isActive: boolean,
    sot: null,
    is_store: boolean,
    is_inf: string,
    social_links: {
        instagram: string,
        tiktok: string
    },
    isVip: boolean,
    orderNumber: number;
    instagram: string,
}

export type SearchedInfluencerType = {
    cover: string,
    facebook: string,
    full_name: string,
    id: string,
    is_famous: boolean,
    is_inf: string,
    photo: string,
    tiktok: string,
    username: string,
    social_links: {
        facebook: string,
        instagram: string,
        tiktok: string
    },
    isVip: boolean,
    orderNumber: number;
    instagram: string,
}