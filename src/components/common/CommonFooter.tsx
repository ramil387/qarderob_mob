import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { e5Color, phoneWidth } from '@/styles/variables';
import HomeIcon from '@/icons/footer/HomeIcon';
import HeartFooterIcon from '@/icons/footer/HeartFooterIcon';
import MailFooterIcon from '@/icons/footer/MailFooterIcon';
import UserIcon from '@/icons/footer/UserIcon';
import PlusCircleIcon from '@/icons/footer/PlusCircleIcon';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';

const CommonFooter = () => {
    const navigate: NavigationProp<ParamListBase> = generalStates.navigationRef.current;

    const goProfilePage = () => {
        navigate.navigate('ProfilePage');
    };

    return (
        <View style={internalStyles.container}>
            <View>
                <HomeIcon />
            </View>
            <View>
                <HeartFooterIcon />
            </View>
            <View style={internalStyles.plusBtn}>
                <TouchableOpacity activeOpacity={0.8}>
                    <PlusCircleIcon />
                </TouchableOpacity>
            </View>
            <View>
                <MailFooterIcon />
            </View>
            <TouchableOpacity onPress={goProfilePage}>
                <UserIcon />
            </TouchableOpacity>
        </View>
    );
};

export default memo(CommonFooter);

const internalStyles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 36,
    },
    plusBtn: {
        position: 'absolute',
        top: -30,
        display: 'flex',
        alignItems: 'center',
        width: phoneWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        left: 0,
    },
});
