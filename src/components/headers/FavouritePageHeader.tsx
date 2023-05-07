import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import NotificationIcon from '@/icons/home/NotificationIcon';

const FavouritePageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goNotifications = () => {
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
            <CustomText style={internalStyles.midText}>Favorilərim</CustomText>
            <TouchableOpacity onPress={goNotifications}>
                <NotificationIcon />
            </TouchableOpacity>
        </View>
    );
};

export default observer(FavouritePageHeader);
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
