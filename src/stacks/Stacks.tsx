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
];
