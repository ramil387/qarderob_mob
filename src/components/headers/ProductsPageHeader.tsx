import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import OutlineLogo from '@/icons/logo/OutlineLogo';
import BackIcon from '@/icons/product/BackIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import NotificationIcon from '@/icons/home/NotificationIcon';

const ProductsPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <View>
                <OutlineLogo />
            </View>
            <View>
                <NotificationIcon />
            </View>
        </View>
    );
};

export default ProductsPageHeader;

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
});
