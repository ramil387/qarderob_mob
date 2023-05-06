import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color, primaryColor } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';
import filterStates from '@/states/filter/filterStates';
import LoadingComponent from '@/components/common/LoadingComponent';

const FilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const filterItems = [
        { label: 'Kateqoriya', func: () => navigate.navigate('CategoryFilterPage') },
        { label: 'Brend', func: () => navigate.navigate('BrandFilterPage') },
        { label: 'Qiymət aralığı', func: () => navigate.navigate('PriceFilterPage') },
        { label: 'Məhsulun vəziyyəti', func: () => navigate.navigate('ProductStatusFilterPage') },
        { label: 'Rəng', func: () => navigate.navigate('ColorFilterPage') },
        { label: 'Ölçü', func: () => navigate.navigate('SizeFilterPage') },
        { label: 'Şəhər', func: () => navigate.navigate('CityFilterPage') },
    ];

    if (filterStates.isLoadingFilter) {
        return <LoadingComponent />;
    }

    return (
        <View style={internalStyles.container}>
            {filterItems.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={item.func}
                        style={internalStyles.itemContainer}
                        key={index}
                    >
                        <CustomText style={internalStyles.item}>{item.label}</CustomText>
                        <ChevronRightIcon style={{ color: primaryColor }} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default observer(FilterPage);

const internalStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
    item: {
        fontFamily: NunitoMedium,
        fontSize: 16,
        lineHeight: 22,
    },
});
