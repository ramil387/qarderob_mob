import { View, StyleSheet, Image, Linking } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { fetchProducts } from '@/states/product/fetchProducts';
import shopStates from '@/states/shop/shopStates';
import filterStates from '@/states/filter/filterStates';
import { toJS } from 'mobx';
import generalStates from '@/states/general/generalStates';
import productStates from '@/states/product/productStates';
import { Avatar } from '@rneui/themed';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import ProductList from '@/components/products/ProductList';
import { FilterContainer } from '../products/ProductsPage';
import { NunitoBold, e5Color, inactiveColor } from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import InstagramIcon from '@/icons/social/InstagramIcon';
import FacebookCircleIcon from '@/icons/social/FacebookCircleIcon';
import TiktokIcon from '@/icons/social/TiktokIcon';

const TopContainer = memo(
    observer(() => {
        const shop = toJS(shopStates.selectedShop);
        const countOfSocialLinks = Object.keys(shop?.social_links || {}).length;
        return (
            <View>
                <View>
                    <Image
                        style={{
                            ...internalStyles.coverImage,
                            display: 'flex',
                        }}
                        source={{ uri: shop?.cover }}
                    />
                    <View style={internalStyles.avatarContainer}>
                        <Avatar
                            size={100}
                            rounded
                            source={{
                                uri: shop?.img,
                            }}
                            containerStyle={{
                                ...internalStyles.avatar,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...internalStyles.userInfoContainer,
                        marginLeft: 126,
                    }}
                >
                    <CustomText style={internalStyles.fullName}>{shop?.name}</CustomText>
                    <CustomText style={internalStyles.dateText}>
                        {moment(shop?.createdAt).format('ll')} tarixindən Qarderob.az - da
                    </CustomText>
                    <CustomText style={{ ...internalStyles.dateText, marginTop: 4 }}>
                        {toJS(shopStates.shopProducts?.count)} elan
                    </CustomText>
                </View>
                <View
                    style={{
                        ...internalStyles.socialContainer,
                        justifyContent: countOfSocialLinks === 3 ? 'space-between' : 'flex-start',
                        gap: countOfSocialLinks === 3 ? 0 : 10,
                    }}
                >
                    {shop?.social_links &&
                        Object.keys(shop?.social_links).map((key) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(shop?.social_links[key]);
                                    }}
                                    style={internalStyles.socialLinkContainer}
                                    key={key}
                                >
                                    {key === 'instagram' ? (
                                        <InstagramIcon />
                                    ) : key === 'facebook' ? (
                                        <FacebookCircleIcon />
                                    ) : (
                                        key === 'tiktok' && <TiktokIcon />
                                    )}
                                    {shop?.social_links[key] && (
                                        <CustomText style={internalStyles.socialText}>
                                            {key}
                                        </CustomText>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>
        );
    }),
);

const ShopProductsPage = () => {
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const shop = toJS(shopStates?.selectedShop);

    const isFocused = useIsFocused();
    const [initialTopHeight, setInitialTopHeight] = React.useState<any>(null);

    const topContainerHeight = useSharedValue(initialTopHeight ? initialTopHeight : 0);

    const useTopContainerHeightStyle = useAnimatedStyle(() => {
        return {
            height: topContainerHeight.value,
            overflow: 'hidden',
        };
    });
    const changeTopContainerHeight = (height: number) => {
        topContainerHeight.value = withTiming(height, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
        });
    };

    const getPageInfo = async () => {
        fetchProducts(1, shop?.id)
            .then((resp) => {
                shopStates.setShopProducts(resp);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loadMore = () => {
        if (shopStates.shopProducts?.has_next_page && !isLoadingMore) {
            setIsLoadingMore(true);
            fetchProducts(shopStates.shopProducts?.next_page, shop?.id).then((resp) => {
                // spread operator is not working here
                shopStates.setShopProducts({
                    data: [...(shopStates.shopProducts?.data || []), ...resp.data],
                    has_next_page: resp.has_next_page,
                    next_page: resp.next_page,
                    count: resp.count,
                });
                setIsLoadingMore(false);
            });
        }
    };

    const selectSorting = async (value: string) => {
        filterStates.setQuery('sortby', value);
        fetchProducts(1).then((resp) => {
            shopStates.setShopProducts(resp);
            generalStates.setBottomSheetVisible(false);
        });
    };

    useFocusEffect(
        useCallback(() => {
            getPageInfo();
            return () => {
                generalStates.setBottomSheetVisible(false);
                shopStates.setShopProducts(null);
                productStates.setProductListScrollDirection('up');
                setIsLoading(true);
            };
        }, [filterStates.query]),
    );

    useEffect(() => {
        if (isFocused) {
            if (productStates.productListScrollDirection === 'up') {
                if (initialTopHeight) changeTopContainerHeight(initialTopHeight);
            } else if (productStates.productListScrollDirection === 'down') {
                changeTopContainerHeight(0);
            }
        }
    }, [productStates.productListScrollDirection, initialTopHeight]);

    useEffect(() => {
        return () => {
            filterStates.resetQuery();
        };
    }, []);

    return (
        <View style={internalStyles.container}>
            <Animated.View style={[{}, initialTopHeight ? useTopContainerHeightStyle : {}]}>
                <View
                    onLayout={(e) => {
                        if (!initialTopHeight) {
                            setInitialTopHeight(e.nativeEvent.layout.height);
                            topContainerHeight.value = e.nativeEvent.layout.height;
                        }
                    }}
                >
                    <TopContainer />
                </View>
            </Animated.View>

            <FilterContainer search={false} />
            <View style={{ flex: 1 }}>
                <ProductList
                    data={toJS(shopStates.shopProducts?.data) || []}
                    isMoreLoading={isLoadingMore}
                    loadMore={loadMore}
                    selectSorting={selectSorting}
                    type='shop'
                />
            </View>
        </View>
    );
};

export default observer(ShopProductsPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {},
    coverImg: {
        width: '100%',
        height: 130,
        resizeMode: 'stretch',
    },
    coverContainer: {},
    coverImage: {
        height: 130,
    },
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    socialLinkContainer: {
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
        width: '30%',
        borderWidth: 1,
        borderColor: e5Color,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    socialText: {
        textTransform: 'capitalize',
        fontSize: 12,
        fontFamily: NunitoBold,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        // marginTop: 16,
        position: 'absolute',
    },
    avatar: {
        top: '80%',
    },
    userInfoContainer: {
        marginLeft: 126,
        marginTop: 8,
    },
    fullName: {
        fontFamily: NunitoBold,
        fontSize: 16,
        lineHeight: 20,
        textTransform: 'capitalize',
    },
    dateText: {
        fontSize: 12,
        lineHeight: 20,
        color: inactiveColor,
        marginTop: 4,
    },
});
