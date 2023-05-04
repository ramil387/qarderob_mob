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

generateStyles(phoneWidth);
generalStates.setScreenSize(phoneWidth >= 428 ? 'lg' : phoneWidth >= 390 ? 'md' : 'sm');

const App = () => {
    useEffect(() => {
        moment.locale('az');
        fetchHome();
    }, []);

    return (
        <Layout>
            <CombineStacks />
        </Layout>
    );
};

export default observer(App);
