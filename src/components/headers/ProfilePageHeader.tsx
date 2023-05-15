import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, mainTextColor, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import CogIcon from '@/icons/user/CogIcon';
import profileStates from '@/states/profile/profileStates';

const ProfilePageHeader = () => {
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
            <CustomText style={internalStyles.midText}>{profileStates.user?.username}</CustomText>
            <TouchableOpacity onPress={goBurgerMenuPage}>
                <CogIcon style={{ color: mainTextColor }} />
            </TouchableOpacity>
        </View>
    );
};

export default observer(ProfilePageHeader);
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
