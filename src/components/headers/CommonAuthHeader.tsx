import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import BackIcon from '@/icons/product/BackIcon';
import { NunitoBold } from '@/styles/variables';
import CustomText from '../ui/CustomText';

const CommonAuthHeader = ({ title }: { title?: string }) => {
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
            <View>
                <CustomText style={internalStyles.midText}>{title}</CustomText>
            </View>
            <View />
        </View>
    );
};

export default CommonAuthHeader;

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
