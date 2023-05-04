import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { AdListType } from '@/types/adListType';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { NunitoBold, NunitoMedium, inactiveColor, phoneWidth } from '@/styles/variables';
import { getAdImageBySize } from '@/utils/getImageBySize';
import CustomText from '../ui/CustomText';
import VipIcon from '@/icons/home/VipIcon';
import FillHeartIcon from '@/icons/home/FillHeartIcon';
import OutlineHeartIcon from '@/icons/home/OutlineHeartIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import productStates from '@/states/product/productStates';

type ProductType = {
    item: AdListType;
};

const ProductCard = styled(View)<{ phoneWidth: number }>`
    width: ${(props) => props.phoneWidth / 2 - 24}px;
    height: 240px;
    border-radius: 8px;
`;

const ImageCard = styled(Image)`
    width: 100%;
    height: 180px;
    border-radius: 16px;
`;

const Product = ({ item }: ProductType) => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goProduct = () => {
        productStates.setSelectedProduct(item);
        navigate.navigate('ProductDetailPage', { id: item.id });
    };
    return (
        <TouchableOpacity onPress={goProduct}>
            <ProductCard phoneWidth={phoneWidth}>
                <View>
                    <ImageCard
                        source={{ uri: getAdImageBySize('md', item?.id, item?.images[0]) }}
                    />
                    <View
                        style={{
                            ...internalStyles.heartIcon,
                            display: item.isFavourite === '0' ? 'none' : 'flex',
                        }}
                    >
                        <FillHeartIcon />
                    </View>
                    <View
                        style={{
                            ...internalStyles.heartIcon,
                            display: item.isFavourite === '0' ? 'flex' : 'none',
                        }}
                    >
                        <OutlineHeartIcon />
                    </View>
                </View>
                <View>
                    <CustomText style={internalStyles.categoryName}>
                        {item?.category?.name_az}
                    </CustomText>
                    <View style={internalStyles.priceContainer}>
                        <CustomText style={internalStyles.brandName}>
                            {item?.brand.name}
                            <CustomText style={internalStyles.price}> / {item.price}₼</CustomText>
                        </CustomText>
                        <View style={{ display: item.isVip ? 'flex' : 'none' }}>
                            <VipIcon />
                        </View>
                    </View>
                </View>
            </ProductCard>
        </TouchableOpacity>
    );
};

export default memo(observer(Product));

const internalStyles = StyleSheet.create({
    categoryName: {
        color: inactiveColor,
        fontSize: 16,
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 4,
    },
    brandName: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: NunitoMedium,
    },
    price: {
        fontSize: 20,
        lineHeight: 22,
        fontFamily: NunitoBold,
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heartIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});
