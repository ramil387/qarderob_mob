import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import productStates from '@/states/product/productStates';
import ShareIcon from '@/icons/product/ShareIcon';
import Share from 'react-native-share';
import { website } from '@/constants';
import { toJS } from 'mobx';
import userStates from '@/states/user/userStates';

const UserProductsPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const user = toJS(userStates.selectedAdOwner);
    const shareUser = () => {
        Share.open({
            url: `${website}/istifadeci/${user?.username}-${user?.id}`,
        });
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
            <TouchableOpacity onPress={shareUser}>
                <ShareIcon />
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
