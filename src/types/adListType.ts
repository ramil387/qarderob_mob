import { CategoryType } from "./categoryType";
import { ShopType } from "./shopType";
import { UserType } from "./userType";

export type AdListType = {
    id: number;
    title: string;
    slug: string;
    product_status: number;
    price: number;
    description: string;
    size: number;
    color: number;
    user_id: number;
    images: string[];
    imagesRotations: number[];
    city: number;
    category_id: number;
    brand_id: number;
    publishedAt: string;
    isVip: boolean;
    vip_expire_at: string;
    vipByAdmin: boolean;
    is_store: boolean;
    contact: {
        full_name: string;
        email: string;
        phone: string;
        hide: boolean;
    };
    verified: string;
    firstVerifiedAt: string;
    rejectReason: string;
    store_id: number;
    isFamous: boolean;
    keywords: string;
    categories: number[];
    pointDeducted: boolean;
    keyword_ids: number[];
    createdAt: string;
    updatedAt: string;
    isFavourite: string;
    category: CategoryType,
    brand: Partial<{
        name: string;
        slug: string;
    }>;
    _size: {
        size: string;
    };
    _color: {
        name: string;
        color: string;
    };
    _user: Partial<UserType>;
    _store?: ShopType;
    viewCount?: {
        count: number;
    } | null,
    like_count?: number;
}


