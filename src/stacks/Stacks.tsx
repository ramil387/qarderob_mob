import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import React from 'react';
import HomePageHeader from '@/components/common/HomePageHeader';
import ProductDetailPage from '@/pages/products/ProductDetailPage';
import ProductDetailPageHeader from '@/components/headers/ProductDetailPageHeader';
import FilterPage from '@/pages/filter/FilterPage';
import FilterPageHeader from '@/components/headers/FilterPageHeader';
import CategoryFilterPage from '@/pages/filter/parts/CategoryFilterPage';
import BrandFilterPage from '@/pages/filter/parts/BrandFilterPage';
import PriceFilterPage from '@/pages/filter/parts/PriceFilterPage';
import ProductStatusFilterPage from '@/pages/filter/parts/ProductStatusFilterPage';
import ColorFilterPage from '@/pages/filter/parts/ColorFilterPage';
import SizesFilterPage from '@/pages/filter/parts/SizesFilterPage';
import CityFilterPage from '@/pages/filter/parts/CityFilterPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoriesPageHeader from '@/components/headers/CategoriesPageHeader';
import InfluencerPage from '@/pages/user/InfluencerPage';
import ShopPage from '@/pages/shop/ShopPage';
import InfluencerPageHeader from '@/components/headers/InfluencerPageHeader';
import ShopPageHeader from '@/components/headers/ShopPageHeader';
import BurgerMenuPage from '@/pages/BurgerMenuPage';
import BurgerMenuPageHeader from '@/components/headers/BurgerMenuPageHeader';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ProfilePage from '@/pages/user/ProfilePage';
import ProfilePageHeader from '@/components/headers/ProfilePageHeader';
import FavouritePage from '@/pages/FavouritePage';
import FavouritePageHeader from '@/components/headers/FavouritePageHeader';
import ProductsPage from '@/pages/products/ProductsPage';
import ProductsPageHeader from '@/components/headers/ProductsPageHeader';
import UserProductsPage from '@/pages/user/UserProductsPage';
import UserProductsPageHeader from '@/components/headers/UserProductsPageHeader';
import VipServicePage from '@/pages/paid/VipServicePage';
import PaidServicePageHeader from '@/components/headers/PaidServicePageHeader';
import MoveForwardPage from '@/pages/paid/MoveForwardPage';
import CommonAuthHeader from '@/components/headers/CommonAuthHeader';
import ShopProductsPage from '@/pages/shop/ShopProductsPage';
import ShopProductsPageHeader from '@/components/headers/ShopProductsPageHeader';

type StackListType = {
    name: string;
    component: React.FC;
    options: NativeStackNavigationOptions;
};
export const StackList: StackListType[] = [
    {
        name: 'HomePage',
        component: HomePage,
        options: {
            headerShown: true,
            header: () => <HomePageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ProductDetailPage',
        component: ProductDetailPage,
        options: {
            headerShown: true,
            header: () => <ProductDetailPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'FilterPage',
        component: FilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Filtrləmə' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CategoryFilterPage',
        component: CategoryFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Kateqoriyalar' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'BrandFilterPage',
        component: BrandFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Brendlər' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'PriceFilterPage',
        component: PriceFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Qiymət aralığı' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ProductStatusFilterPage',
        component: ProductStatusFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Məhsulun vəziyyəti' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ColorFilterPage',
        component: ColorFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Rənglər' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'SizeFilterPage',
        component: SizesFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Ölçülər' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CityFilterPage',
        component: CityFilterPage,
        options: {
            headerShown: true,
            header: () => <FilterPageHeader title='Şəhərlər' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CategoriesPage',
        component: CategoriesPage,
        options: {
            headerShown: true,
            header: () => <CategoriesPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'InfluencerPage',
        component: InfluencerPage,
        options: {
            headerShown: true,
            header: () => <InfluencerPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ShopPage',
        component: ShopPage,
        options: {
            headerShown: true,
            header: () => <ShopPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'BurgerMenuPage',
        component: BurgerMenuPage,
        options: {
            headerShown: true,
            header: () => <BurgerMenuPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        options: {
            headerShown: true,
            header: () => <CommonAuthHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'RegisterPage',
        component: RegisterPage,
        options: {
            headerShown: true,
            header: () => <CommonAuthHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ProfilePage',
        component: ProfilePage,
        options: {
            headerShown: true,
            header: () => <ProfilePageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'FavouritePage',
        component: FavouritePage,
        options: {
            headerShown: true,
            header: () => <FavouritePageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ProductsPage',
        component: ProductsPage,
        options: {
            headerShown: true,
            header: () => <ProductsPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'UserProductsPage',
        component: UserProductsPage,
        options: {
            headerShown: true,
            header: () => <UserProductsPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'VipServicePage',
        component: VipServicePage,
        options: {
            headerShown: true,
            header: () => <PaidServicePageHeader title='Elanı VIP et' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'MoveForwardPage',
        component: MoveForwardPage,
        options: {
            headerShown: true,
            header: () => <PaidServicePageHeader title='Elanı irəli çək' />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ShopProductsPage',
        component: ShopProductsPage,
        options: {
            headerShown: true,
            header: () => <ShopProductsPageHeader />,
            statusBarTranslucent: false,
            statusBarColor: 'red',
            statusBarStyle: 'dark',
        },
    },
];
