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
    console.log({ curPage, prevPage })
    generalStates.setCurPage(curPage);
    generalStates.setPrevPage(prevPage);

}

export const footerVisibleObserver = () => {
    const isVisiable = generalStates.curPage === 'LoginPage' ||
        generalStates.curPage === 'RegisterPage'

    generalStates.setFooterVisible(
        isVisiable
    );
}

