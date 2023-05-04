import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import productStates from '@/states/product/productStates';
import { toJS } from 'mobx';
import Carousel from 'react-native-reanimated-carousel';
import {
    NunitoBold,
    inactiveColor,
    mainTextColor,
    phoneWidth,
    primaryColor,
} from '@/styles/variables';
import { getAdImageBySize } from '@/utils/getImageBySize';
import CustomText from '@/components/ui/CustomText';
import { StyleSheet } from 'react-native';
import VipIcon from '@/icons/home/VipIcon';
import OutlineHeartIcon from '@/icons/home/OutlineHeartIcon';
import TagIcon from '@/icons/product/TagIcon';
import SizeIcon from '@/icons/product/SizeIcon';
import ColorIcon from '@/icons/product/ColorIcon';
import { defineProductStatus } from '@/components/helper/defineProductStatus';

const ProductImages = memo(
    observer(() => {
        const product = toJS(productStates.selectedProduct);
        return (
            <Carousel<any>
                style={{ height: 400, backgroundColor: 'red' }}
                loop={false}
                enabled={product?.images.length === 1 ? false : true}
                width={phoneWidth}
                data={product!.images}
                renderItem={({ image, index }: any) => {
                    return (
                        <View>
                            <Image
                                style={{ width: phoneWidth, height: 400 }}
                                source={{
                                    uri: getAdImageBySize(
                                        'md',
                                        product!.id,
                                        product!.images[index],
                                    ),
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    backgroundColor: '#000',
                                    opacity: 0.8,
                                    borderRadius: 8,
                                    padding: 8,
                                }}
                            >
                                <CustomText style={{ color: '#fff', fontFamily: NunitoBold }}>
                                    {index + 1}/{product?.images.length}
                                </CustomText>
                            </View>
                        </View>
                    );
                }}
            />
        );
    }),
);

const ProductDetailPage = () => {
    const product = toJS(productStates.selectedProduct);

    return (
        <View>
            <ProductImages />
            <View style={internalStyles.contentContainer}>
                <CustomText style={internalStyles.catName}>{product?.category?.name_az}</CustomText>
                <View style={internalStyles.topInfoContainer}>
                    <View>
                        <View style={internalStyles.brandNameContainer}>
                            <CustomText style={internalStyles.brandName}>
                                {product?.brand?.name}
                            </CustomText>
                            <View style={{ display: product?.isVip ? 'flex' : 'none' }}>
                                <VipIcon />
                            </View>
                        </View>
                        <View>
                            <CustomText style={internalStyles.price}>{product?.price}₼</CustomText>
                        </View>
                    </View>
                    <View>
                        <OutlineHeartIcon style={{ color: mainTextColor }} />
                    </View>
                </View>
                <View style={internalStyles.specContainer}>
                    <View style={internalStyles.specItemContainer}>
                        <TagIcon />
                        <CustomText>
                            {defineProductStatus(product?.product_status ?? null)}
                        </CustomText>
                    </View>
                    <View style={internalStyles.specItemContainer}>
                        <SizeIcon />
                        <CustomText>{product?._size?.size}</CustomText>
                    </View>
                    <View style={internalStyles.specItemContainer}>
                        <ColorIcon />
                        <CustomText>{product?._color?.name}</CustomText>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default observer(ProductDetailPage);

const internalStyles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
    catName: {
        fontSize: 16,
        lineHeight: 21,
        color: inactiveColor,
    },
    topInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    brandNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    brandName: {
        fontSize: 24,
        fontFamily: NunitoBold,
        letterSpacing: 0.36,
        lineHeight: 34,
    },
    price: {
        fontFamily: NunitoBold,
        fontSize: 20,
    },
    specContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
        marginTop: 16,
    },
    specItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
