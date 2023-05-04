import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import React from 'react';
import HomePageHeader from '@/components/common/HomePageHeader';

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
];
