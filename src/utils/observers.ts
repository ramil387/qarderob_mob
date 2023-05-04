import generalStates from '@/states/general/generalStates';
import { Keyboard } from 'react-native';

export const keyboardObserver = () => {
    Keyboard.addListener('keyboardDidShow', () => {
        if (generalStates.curPage === 'HomePage') {
            generalStates.setFooterVisible(true);
        }
    });
    Keyboard.addListener('keyboardDidHide', () => {
        if (generalStates.curPage === 'HomePage') {
            generalStates.setFooterVisible(false);
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
    generalStates.setCurPage(curPage);
    generalStates.setPrevPage(prevPage);

}

export const footerVisibleObserver = () => {
    const isVisiable = generalStates.curPage === 'LoginPage' ||
        generalStates.curPage === 'Register' ||
        generalStates.curPage === 'CompleteRegister' ||
        generalStates.curPage === 'ConfirmNumberPage' ||
        generalStates.curPage === 'ConfirmResetPassPage' ||
        generalStates.curPage === 'ForgotPage' ||
        generalStates.curPage === 'ChangePasswordPage' ||
        generalStates.curPage === 'ForgotResultPage' ||
        generalStates.curPage === 'ProfilePage' ||
        generalStates.curPage === 'ProfileChangePass' ||
        generalStates.curPage === 'EditProfilePage' ||
        generalStates.curPage === 'BookingPage' ||
        generalStates.curPage === 'CheckoutPage' ||
        generalStates.curPage === 'ConfirmCheckoutPage' ||
        generalStates.curPage === 'AddCardPage'
    generalStates.setFooterVisible(
        isVisiable
    );
}

