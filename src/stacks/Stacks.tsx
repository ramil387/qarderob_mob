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
            header: () => <FilterPageHeader title='Kateqoriya' />,
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
            header: () => <FilterPageHeader title='Brend' />,
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
            header: () => <FilterPageHeader title='Qiymət' />,
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
];
