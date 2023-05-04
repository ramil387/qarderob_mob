import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default Layout;
