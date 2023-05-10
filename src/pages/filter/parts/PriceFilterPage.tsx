import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { NunitoMedium, e5Color, f5Color, mainTextColor } from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import filterStates from '@/states/filter/filterStates';
import validator from 'validator';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const PriceFilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const prices = [
        {
            min: '0₼',
            max: '50₼',
        },
        {
            min: '50₼',
            max: '80₼',
        },
        {
            min: '80₼',
            max: '150₼',
        },
        {
            min: '150₼',
            max: '200₼',
        },
        {
            min: '400₼',
            max: '1500₼',
        },
    ];

    const handleSelect = (min: string, max: string) => {
        const minPrice = min.split('₼')[0];
        const maxPrice = max.split('₼')[0];
        filterStates.setPrices([minPrice, maxPrice]);
        filterStates.setQuery('price', [minPrice, maxPrice]);
    };

    const handleMinChange = (text: string) => {
        if (text.length === 0) return filterStates.setPrices(['', filterStates.prices[1]]);
        if (!validator.isNumeric(text)) return;
        // setMin(text);
        filterStates.setPrices([text, filterStates.prices[1]]);
    };

    const handleMaxChange = (text: string) => {
        if (text.length === 0) return filterStates.setPrices([filterStates.prices[0], '']);
        if (!validator.isNumeric(text)) return;
        filterStates.setPrices([filterStates.prices[0], text]);
    };

    useEffect(() => {
        if (filterStates.prices[0]?.length > 0 && filterStates.prices[0]?.length > 0) {
            handleSelect(filterStates.prices[0], filterStates.prices[1]);
        }
    }, [filterStates.prices.length]);

    console.log(filterStates.prices);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.inputContainer}>
                <View style={internalStyles.input}>
                    <CustomTextInput
                        onChangeText={handleMinChange}
                        style={{ paddingLeft: 16 }}
                        placeholder='min:'
                        value={String(filterStates.prices[0])}
                    />
                </View>
                <View style={internalStyles.input}>
                    <CustomTextInput
                        onChangeText={handleMaxChange}
                        style={{ paddingLeft: 16 }}
                        placeholder='max:'
                        value={String(filterStates.prices[1])}
                    />
                </View>
            </View>
            <View style={internalStyles.pricesContainer}>
                {prices.map((price, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                handleSelect(price.min, price.max);
                                navigate.goBack();
                            }}
                            style={internalStyles.itemContainer}
                            key={index}
                        >
                            <CustomText style={internalStyles.price}>
                                {price.min} - {price.max}
                            </CustomText>
                            <ChevronRightIcon style={{ color: mainTextColor }} />
                        </TouchableOpacity>
                    );
                })}
                <View style={{ ...internalStyles.itemContainer, borderBottomWidth: 0 }}>
                    <CustomText style={internalStyles.price}>Sıfırla</CustomText>
                    <ChevronRightIcon style={{ color: mainTextColor }} />
                </View>
            </View>
            <View style={internalStyles.btn}>
                <CustomMainButton
                    func={() => {
                        navigate.goBack();
                    }}
                    title='Təsdiqlə'
                />
            </View>
        </View>
    );
};

export default observer(PriceFilterPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        backgroundColor: f5Color,
        width: '48%',
        borderRadius: 8,
    },
    pricesContainer: {
        marginVertical: 24,
    },
    itemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: NunitoMedium,
    },
    btn: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
});
