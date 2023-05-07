import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackIcon from '@/icons/product/BackIcon';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import filterStates from '@/states/filter/filterStates';
import generalStates from '@/states/general/generalStates';
import { observer } from 'mobx-react-lite';

const FilterPageHeader = ({ title }: { title?: string }) => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    if (filterStates.categoryLevel === 1) {
                        filterStates.setCategoryLevel(0);
                        return;
                    }
                    navigate.goBack();
                }}
            >
                <BackIcon />
            </TouchableOpacity>
            <CustomText style={internalStyles.midText}>{title}</CustomText>
            <TouchableOpacity onPress={() => filterStates.resetAllFilters(generalStates.curPage)}>
                <CustomText style={internalStyles.rightText}>Təmizlə</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default observer(FilterPageHeader);

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
