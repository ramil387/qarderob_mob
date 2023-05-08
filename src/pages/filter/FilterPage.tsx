import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color, primaryColor } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import filterStates from '@/states/filter/filterStates';
import LoadingComponent from '@/components/common/LoadingComponent';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { CategoryType } from '@/types/categoryType';

const FilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const categoriesValue = useMemo(() => {
        return filterStates.query?.categories?.map((cat: CategoryType) => cat?.name_az).join(', ');
    }, [filterStates.query?.categories]);

    const brandsValue = useMemo(() => {
        const brands = filterStates.query?.brand;
        return Object.keys(brands || {})
            ?.filter((key) => brands[key])
            ?.map((key) => filterStates.brands.find((brand) => brand.slug === key)?.name)
            .join(', ');
    }, [filterStates.query?.brand]);

    const pricesValue = useMemo(() => {
        return Array.isArray(filterStates.query?.price) &&
            filterStates.query?.price.reduce((a, b) => parseInt(a) + parseInt(b), 0) > 0
            ? filterStates.query?.price?.map((price: number) => price + ' ₼').join(' - ')
            : '';
    }, [filterStates.query?.price]);

    const productStatusValue = useMemo(() => {
        return filterStates.query?.productStatus?.map((status: any) => status.label).join(', ');
    }, [filterStates.query?.productStatus]);

    const colorsValue = useMemo(() => {
        return filterStates.query?.color
            ?.map((color: string) => filterStates.colors.find((col) => col.slug === color)?.name)
            .join(', ');
    }, [filterStates.query?.color]);

    const sizesValue = useMemo(() => {
        return filterStates.query?.size?.map((size: string) => size)?.join(', ');
    }, [filterStates.query?.size]);

    const citiesValue = useMemo(() => {
        const cities = filterStates.query?.city;
        return Object.keys(cities || {})
            ?.filter((key) => filterStates.query?.city[key])
            ?.map((key) => filterStates.cities.find((city) => city.id === parseInt(key))?.name_az)
            .join(', ');
    }, [filterStates.query?.city]);

    const filterItems = [
        {
            label: 'Kateqoriya',
            func: () => navigate.navigate('CategoryFilterPage'),
            value: categoriesValue,
        },
        {
            label: 'Brend',
            func: () => navigate.navigate('BrandFilterPage'),
            value: brandsValue,
        },
        {
            label: 'Qiymət aralığı',
            func: () => navigate.navigate('PriceFilterPage'),
            value: pricesValue,
        },
        {
            label: 'Məhsulun vəziyyəti',
            func: () => navigate.navigate('ProductStatusFilterPage'),
            value: productStatusValue,
        },
        {
            label: 'Rəng',
            func: () => navigate.navigate('ColorFilterPage'),
            value: colorsValue,
        },
        { label: 'Ölçü', func: () => navigate.navigate('SizeFilterPage'), value: sizesValue },
        {
            label: 'Şəhər',
            func: () => navigate.navigate('CityFilterPage'),
            value: citiesValue,
        },
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
                        <View>
                            <CustomText style={internalStyles.item}>{item.label}</CustomText>
                            <CustomText
                                style={{
                                    ...internalStyles.subText,
                                    display: item.value ? 'flex' : 'none',
                                }}
                            >
                                {item.value}
                            </CustomText>
                        </View>
                        <ChevronRightIcon style={{ color: primaryColor }} />
                    </TouchableOpacity>
                );
            })}
            <View style={internalStyles.btn}>
                <CustomMainButton
                    func={() => {
                        navigate.navigate('ProductsPage');
                    }}
                    title='Filtrlə'
                />
            </View>
        </View>
    );
};

export default observer(FilterPage);

const internalStyles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
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
    btn: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignSelf: 'center',
    },
    subText: {
        fontSize: 13,
        color: primaryColor,
        opacity: 0.9,
    },
});
