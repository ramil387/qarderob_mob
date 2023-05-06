
export type ShopType = {
    img: string,
    cover: string,
    id: number,
    name: string,
    slug: string,
    website: string,
    phone: string,
    email: string,
    social_links: {
        instagram: string,
        tiktok: string
    },
    start_hour: string,
    end_hour: string,
    work_days: string,
    address: string,
    desc: string,
    user_id: number,
    verified: boolean,
    status: boolean,
    active_package_id: number,
    orderNumber: number,
    isRejected: boolean,
    rejectReason: string,
    createdAt: string,
    updatedAt: string,
    _active_package: {
        id: number,
        package_id: number,
        limit: number,
        package_az: string,
        package_en: string,
        package_ru: string
    },
    user: {
        full_name: string,
        username: string,
        phone: string,
        email: string
    }
}