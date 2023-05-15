import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import OutlineLogo from '@/icons/logo/OutlineLogo';
import BackIcon from '@/icons/product/BackIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { NunitoBold, primaryColor } from '@/styles/variables';
import CustomText from '../ui/CustomText';
import filterStates from '@/states/filter/filterStates';
import { observer } from 'mobx-react-lite';

const ProductsPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <View>
                {filterStates.query?.isVip ? (
                    <CustomText style={internalStyles.midText}>VIP Elanlar</CustomText>
                ) : (
                    <OutlineLogo />
                )}
            </View>
            <View>
                <NotificationIcon />
            </View>
        </View>
    );
};

export default observer(ProductsPageHeader);

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        paddingBottom: 0,
    },
    midText: {
        fontSize: 20,
        fontFamily: NunitoBold,
        color: primaryColor,
    },
});
