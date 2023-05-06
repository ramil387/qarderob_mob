import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import CategoryCircleIcon from '@/icons/categories/CategoryCircleIcon';
import BrandCircleIcon from '@/icons/categories/BrandCircleIcon';
import ShopCircleIcon from '@/icons/categories/ShopCircleIcon';
import { ScrollView } from 'react-native';
import { NunitoBold, NunitoMedium, phoneWidth } from '@/styles/variables';
import CustomText from '../ui/CustomText';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import InfluencersCircleIcon from '@/icons/categories/InfluencersCircleIcon';

const CateogrySection = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const cats = [
        {
            label: 'Kateqoriyalar',
            icon: <CategoryCircleIcon />,
            func: () => {
                navigate.navigate('CategoriesPage');
            },
        },
        {
            label: 'İnfluenserlər',
            icon: <InfluencersCircleIcon />,
            func: () => {
                navigate.navigate('InfluencerPage');
            },
        },
        // {label:"Məşhurlar",icon:require("@/assets/images/celebrity.png")},
        {
            label: 'Mağazalar',
            icon: <ShopCircleIcon />,
            func: () => {
                navigate.navigate('ShopPage');
                // searchStates.setSearchKey('');
                // navigate.navigate('Stories');
            },
        },
        {
            label: 'Brendlər',
            icon: <BrandCircleIcon />,
            func: () => {
                navigate.navigate('BrandFilterPage');
            },
        },
    ];
    return (
        <View style={internalStyles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // side by side scroll view
                decelerationRate='fast'
                snapToAlignment='center'
                contentContainerStyle={{
                    width: phoneWidth - 32,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {cats.map((cat) => {
                    return (
                        <TouchableOpacity
                            onPress={cat.func}
                            style={internalStyles.itemContainer}
                            key={cat.label}
                        >
                            {cat.icon}
                            <CustomText style={internalStyles.labelStyle}>{cat.label}</CustomText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default memo(CateogrySection);

const internalStyles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelStyle: {
        marginTop: 4,
        fontFamily: NunitoMedium,
        fontSize: 15,
    },
});
