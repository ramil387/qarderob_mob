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
import InfluencerPage from '@/pages/user/InfluencerPage';
import ShopPage from '@/pages/shop/ShopPage';
import InfluencerPageHeader from '@/components/headers/InfluencerPageHeader';
import ShopPageHeader from '@/components/headers/ShopPageHeader';
import BurgerMenuPage from '@/pages/BurgerMenuPage';
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
import MoveForwardPage from '@/pages/paid/MoveForwardPage';
import ShopProductsPage from '@/pages/shop/ShopProductsPage';
import ShopProductsPageHeader from '@/components/headers/ShopProductsPageHeader';
import ContactPage from '@/pages/ContactPage';
import RulesPage from '@/pages/RulesPage';
import DealsPage from '@/pages/DealsPage';
import AddProductPage from '@/pages/products/AddProductPage';
import CreateShopPage from '@/pages/shop/CreateShopPage';
import { f8Color } from '@/styles/variables';
import ProfileEditPage from '@/pages/user/ProfileEditPage';
import AddBalancePage from '@/pages/paid/AddBalancePage';
import PaymentSuccessPage from '@/pages/paid/PaymentSuccessPage';
import ChangePassPage from '@/pages/auth/ChangePassPage';
import NotificationPage from '@/pages/notifications/NotificationPage';
import CommonHeader from '@/components/headers/CommonHeader';
import profileStates from '@/states/profile/profileStates';
import CommentsPage from '@/pages/products/CommentsPage';
import MessagesPage from '@/pages/messages/MessagesPage';
import ShopPackagesPage from '@/pages/shop/ShopPackagesPage';
import DeleteAccountPage from '@/pages/user/DeleteAccountPage';

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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CategoriesPage',
        component: CategoriesPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Kateqoriyalar' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'BurgerMenuPage',
        component: BurgerMenuPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Parametrlər' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Daxil ol' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'RegisterPage',
        component: RegisterPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Qeydiyyatdan keç' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'VipServicePage',
        component: VipServicePage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Elanı VIP et' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'MoveForwardPage',
        component: MoveForwardPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Elanı irəli çək' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
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
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ContactPage',
        component: ContactPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Bizimlə əlaqə' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'RulesPage',
        component: RulesPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Qaydalar' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'DealsPage',
        component: DealsPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='İstifadəçi razılaşması' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'AddProductPage',
        component: AddProductPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Yeni elan' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CreateShopPage',
        component: CreateShopPage,
        options: {
            headerShown: true,
            header: () => (
                <CommonHeader title={profileStates?.user?._store?.name || 'Mağaza yarat'} />
            ),
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ProfileEditPage',
        component: ProfileEditPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title={profileStates.user?.username} />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'AddBalancePage',
        component: AddBalancePage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Şəxsi balansınızı artırın' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'PaymentSuccessPage',
        component: PaymentSuccessPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Ödəniş statusu' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ChangePassPage',
        component: ChangePassPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Şifrəni dəyiş' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'NotificationPage',
        component: NotificationPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Bildirişlər' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'CommentsPage',
        component: CommentsPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'MessagesPage',
        component: MessagesPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Mesajlar' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'ShopPackagesPage',
        component: ShopPackagesPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Mağaza paketləri' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
    {
        name: 'DeleteAccountPage',
        component: DeleteAccountPage,
        options: {
            headerShown: true,
            header: () => <CommonHeader title='Hesabın silinməsi' />,
            statusBarTranslucent: false,
            statusBarColor: f8Color,
            statusBarStyle: 'dark',
        },
    },
];
