import generalStates from '@/states/general/generalStates';
import { Keyboard } from 'react-native';

export const keyboardObserver = () => {
    const alwaysShowedPages = ['HomePage',]
    const pages = ['ContactPage']
    Keyboard.addListener('keyboardDidShow', () => {
        if (alwaysShowedPages.includes(generalStates.curPage)) {
            generalStates.setFooterVisible(true);
        }
        if (pages.includes(generalStates.curPage)) {
            generalStates.setFooterVisible(true);
        }
        if (generalStates.curPage === 'LoginPage' || generalStates.curPage === 'RegisterPage') {
            generalStates.setAuthFooterVisible(false);
        }
    });
    Keyboard.addListener('keyboardDidHide', () => {
        if (alwaysShowedPages.includes(generalStates.curPage)) {
            generalStates.setFooterVisible(false);
        }
        if (pages.includes(generalStates.curPage)) {
            generalStates.setFooterVisible(true);
        }
        if (generalStates.curPage === 'LoginPage' || generalStates.curPage === 'RegisterPage') {
            generalStates.setAuthFooterVisible(true);
        }
    });
}

export const removeKeyboardObserver = () => {
    Keyboard.removeAllListeners('keyboardDidShow');
    Keyboard.removeAllListeners('keyboardDidHide');
}

export const routerObserver = (e: any) => {
    const curPage = e?.routes[e.routes.length - 1]?.name
    const prevPage = e?.routes[e.routes.length - 2]?.name
    console.log({ curPage, prevPage })
    generalStates.setCurPage(curPage);
    generalStates.setPrevPage(prevPage);

}



export const footerVisibleObserver = () => {
    const footerVisibles = [
        'LoginPage',
        'RegisterPage',
        'BurgerMenuPage',
        'FilterPage',
        'ProductDetailPage',
        'CategoryFilterPage',
        'BrandFilterPage',
        'PriceFilterPage',
        'ProductStatusFilterPage',
        'ColorFilterPage',
        'SizeFilterPage',
        'CityFilterPage',
        'ContactPage',
        'AddProductPage',
        'CreateShopPage',
        'ProfileEditPage',
        'AddBalancePage',
        'MoveForwardPage',
        'VipServicePage',
        'PaymentSuccessPage',
        'ChangePassPage',
        'CommentsPage',
        'ChatPage',
    ]
    const isVisiable = footerVisibles.includes(generalStates.curPage);


    generalStates.setFooterVisible(
        isVisiable
    );
}

