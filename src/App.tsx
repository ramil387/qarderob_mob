import React, { useEffect } from 'react';
import Layout from './components/Layout';
import CombineStacks from './stacks/CombineStacks';
import generalStates from './states/general/generalStates';
import { phoneWidth } from './styles/variables';
import { generateStyles } from './styles/responsive';
import { observer } from 'mobx-react-lite';
import { fetchHome } from './states/general/fetchHome';
import moment from 'moment';
import 'moment/locale/az';
import { useFilterDatas } from './hooks/useFilterDatas';
import { useFetchMe } from './hooks/useFetchMe';
import CommonFooter from './components/common/CommonFooter';
import { useFooterVisible } from './hooks/useFooterVisible';
import ErrorModal from './components/common/ErrorModal';
import { useKeyboardObserver } from './hooks/useKeyboardObserver';
import DialogModal from './components/common/DialogModal';
import PaymentModal from './components/common/PaymentModal';

generateStyles(phoneWidth);
generalStates.setScreenSize(phoneWidth >= 428 ? 'lg' : phoneWidth >= 390 ? 'md' : 'sm');

const App = () => {
    useKeyboardObserver();
    useFetchMe();
    useFilterDatas();
    useEffect(() => {
        moment.locale('az');
        setTimeout(() => {
            fetchHome();
        }, 500);
    }, []);

    useFooterVisible();
    return (
        <Layout>
            <CombineStacks />
            {!generalStates.footerVisible && <CommonFooter />}
            <ErrorModal />
            <DialogModal />
            <PaymentModal />
        </Layout>
    );
};

export default observer(App);
