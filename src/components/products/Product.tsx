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
import {
    NavigationProp,
    ParamListBase,
    StackActions,
    useNavigation,
} from '@react-navigation/native';
import productStates from '@/states/product/productStates';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { runInAction, toJS } from 'mobx';
import generalStates from '@/states/general/generalStates';
import { fetchSingleProduct } from '@/states/product/fetchSingleProduct';
import profileStates from '@/states/profile/profileStates';
import { getImageRotations } from '../../helper/getImageRotations';
import { showShouldAuth } from '@/helper/showShouldAuth';

type ProductType = {
    item: AdListType;
    setToggleCheckLike?: (toggleCheckLike: boolean) => void;
    toggleCheckLike?: boolean;
    type?: string;
};

const ProductCard = styled(View)<{ phoneWidth: number }>`
    width: ${(props) => props.phoneWidth / 2 - 24}px;
    height: ${(props) => props.phoneWidth / 2 - 24 + 55}px;
    border-radius: 8px;
`;

const ImageCard = styled(Image)<{ phoneWidth: number }>`
    width: ${(props) => props.phoneWidth / 2 - 24}px;
    height: ${(props) => props.phoneWidth / 2 - 24}px;
    border-radius: 16px;
`;

const Product = ({ item, setToggleCheckLike, toggleCheckLike, type }: ProductType) => {
    const [disableHeart, setDisableHeart] = React.useState(false);
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goProduct = (data: AdListType) => {
        if (type === 'liked') {
            fetchSingleProduct(data.id, data.slug).then((resp) => {
                if (resp?.data) {
                    console.log(resp.data);
                    productStates.setSelectedProduct({ ...data, ...resp?.data });
                    navigate.dispatch(StackActions.push('ProductDetailPage'));
                }
            });
            return;
        }
        navigate.dispatch(StackActions.push('ProductDetailPage'));
        productStates.setSelectedProduct(data);
    };

    const checkLikeByPage = (id: any, like: number) => {
        if (generalStates.curPage !== 'HomePage') {
            // update homeDatas last_ads and vip_ads
            const lastAds = toJS(generalStates.homeDatas?.last_ads);
            const vipAds = toJS(generalStates.homeDatas?.vip_ads);
            const products: any = toJS(productStates.products);
            const lastAdsIndex = lastAds.findIndex((item: any) => item.id === id);
            const vipAdsIndex = vipAds.findIndex((item: any) => item.id === id);
            const productsIndex = products?.data.findIndex((item: any) => item.id === id);
            if (lastAdsIndex !== -1) {
                lastAds[lastAdsIndex].isFavourite = like.toString();
                runInAction(() => {
                    generalStates.homeDatas!.last_ads = lastAds;
                });
            }
            if (vipAdsIndex !== -1) {
                vipAds[vipAdsIndex].isFavourite = like.toString();
                runInAction(() => {
                    generalStates.homeDatas!.vip_ads = vipAds;
                });
            }
            if (productsIndex !== -1) {
                products.data[productsIndex].isFavourite = like.toString();
                runInAction(() => {
                    productStates.products = products;
                });
            }
        }
    };
    const toggleLike = async (id: number) => {
        try {
            if (!profileStates.token) {
                showShouldAuth(
                    navigate,
                    'Bildiriş',
                    'Favorilərə əlavə etmək üçün hesabınıza daxil olun',
                );
                return;
            }

            if (setToggleCheckLike) setToggleCheckLike(!toggleCheckLike);

            setDisableHeart(true);
            const resp = await http.post(`${APIS.stats}/like/${id}`);
            if (resp.data.fav === 1) {
                runInAction(() => {
                    item.isFavourite = '1';
                });
                checkLikeByPage(id, 1);
            } else {
                runInAction(() => {
                    item.isFavourite = '0';
                });
                checkLikeByPage(id, 0);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDisableHeart(false);
        }
    };

    const showLikeIcon = item?.user_id === profileStates.user?.id;

    return (
        <ProductCard phoneWidth={phoneWidth}>
            <View>
                <TouchableOpacity onPress={() => goProduct(item)}>
                    <ImageCard
                        phoneWidth={phoneWidth}
                        style={{
                            transform: getImageRotations(item),
                        }}
                        source={{ uri: getAdImageBySize('md', item?.id, item?.images[0]) }}
                    />
                </TouchableOpacity>
                {!showLikeIcon && (
                    <TouchableOpacity
                        disabled={disableHeart}
                        onPress={() => {
                            toggleLike(item.id);
                        }}
                        style={{
                            ...internalStyles.heartIcon,
                            display: item.isFavourite === '0' ? 'none' : 'flex',
                        }}
                    >
                        <FillHeartIcon />
                    </TouchableOpacity>
                )}
                {!showLikeIcon && (
                    <TouchableOpacity
                        disabled={disableHeart}
                        onPress={() => {
                            toggleLike(item.id);
                        }}
                        style={{
                            ...internalStyles.heartIcon,
                            display: item.isFavourite === '0' ? 'flex' : 'none',
                        }}
                    >
                        <OutlineHeartIcon />
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <CustomText style={internalStyles.categoryName}>
                    {item?.category?.name_az}
                </CustomText>
                <View style={internalStyles.priceContainer}>
                    <CustomText style={internalStyles.brandName}>
                        {item?.brand?.name}
                        <CustomText style={internalStyles.price}> / {item.price}₼</CustomText>
                    </CustomText>
                    <View style={{ display: item.isVip ? 'flex' : 'none' }}>
                        <VipIcon />
                    </View>
                </View>
            </View>
        </ProductCard>
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
        zIndex: 999,
    },
});
