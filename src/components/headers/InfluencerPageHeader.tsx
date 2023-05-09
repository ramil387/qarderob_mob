import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';

const InfluencerPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigate.goBack();
                }}
            >
                <BackIcon />
            </TouchableOpacity>
            <CustomText style={internalStyles.midText}>İnfluenserlər</CustomText>
            <View>
                <NotificationIcon />
            </View>
        </View>
    );
};

export default observer(InfluencerPageHeader);

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
