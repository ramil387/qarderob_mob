import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import BackIcon from '@/icons/product/BackIcon';
import { NunitoBold } from '@/styles/variables';

const CommonHeader = ({ title }: { title?: string }) => {
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
            <CustomText style={internalStyles.midText}>{title}</CustomText>
            <View />
        </View>
    );
};
export default CommonHeader;

const internalStyles = StyleSheet.create({
    container: {
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    midText: {
        fontSize: 20,
        fontFamily: NunitoBold,
    },
});
