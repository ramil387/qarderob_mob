import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Layout from './components/Layout';
import CombineStacks from './stacks/CombineStacks';
import generalStates from './states/general/generalStates';
import { phoneWidth } from './styles/variables';
import { generateStyles } from './styles/responsive';
import { observer } from 'mobx-react-lite';
import { fetchHome } from './states/general/fetchHome';

generateStyles(phoneWidth);
generalStates.setScreenSize(phoneWidth >= 428 ? 'lg' : phoneWidth >= 390 ? 'md' : 'sm');

const App = () => {
    useEffect(() => {
        fetchHome();
    }, []);

    return (
        <Layout>
            <CombineStacks />
        </Layout>
    );
};

export default observer(App);
