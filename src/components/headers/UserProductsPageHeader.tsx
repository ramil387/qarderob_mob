import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import CogIcon from '@/icons/user/CogIcon';
import productStates from '@/states/product/productStates';

const UserProductsPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goBurgerMenuPage = () => {
        navigate.navigate('BurgerMenuPage');
    };

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigate.goBack();
                }}
            >
                <BackIcon />
            </TouchableOpacity>
            <CustomText style={internalStyles.midText}>
                {productStates.selectedProduct?._user?.username}
            </CustomText>
            <TouchableOpacity onPress={goBurgerMenuPage}>
                <CogIcon style={{ color: 'black' }} />
            </TouchableOpacity>
        </View>
    );
};

export default observer(UserProductsPageHeader);

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
    midText: {
        fontSize: 20,
        fontFamily: NunitoBold,
    },
    rightText: {
        fontSize: 15,
        lineHeight: 20,
        color: primaryColor,
    },
});
