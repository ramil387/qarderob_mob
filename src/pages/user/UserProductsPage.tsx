import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, e5Color, inactiveColor, primaryColor } from '@/styles/variables';
import generalStates from '@/states/general/generalStates';
import { fetchProducts } from '@/states/product/fetchProducts';
import filterStates from '@/states/filter/filterStates';
import { FilterContainer } from '../products/ProductsPage';
import { fetchUserInfo } from '@/states/user/fetchUserInfo';
import userStates from '@/states/user/userStates';
import moment from 'moment';
import LoadingComponent from '@/components/common/LoadingComponent';
import NotFoundIcon from '@/icons/user/NotFoundIcon';
import ProductList from '@/components/products/ProductList';
import { notFoundStyle } from '@/styles/common/notFoundStyle';
import { useFocusEffect } from '@react-navigation/native';
import InstagramIcon from '@/icons/social/InstagramIcon';
import FacebookCircleIcon from '@/icons/social/FacebookCircleIcon';
import TiktokIcon from '@/icons/social/TiktokIcon';

const TopContainer = memo(
    observer(() => {
        const user = toJS(productStates.selectedProduct?._user || userStates.selectedAdOwner);
        const countOfSocialLinks = Object.keys(user?.social_links || {}).length;
        return (
            <View>
                <View>
                    <Image
                        style={{
                            ...internalStyles.coverImage,
                            display: user?.is_inf === 'true' ? 'flex' : 'none',
                        }}
                        source={{ uri: user?.cover }}
                    />
                    <View style={internalStyles.avatarContainer}>
                        <Avatar
                            size={user?.is_inf === 'true' ? 100 : 80}
                            rounded
                            source={{
                                uri: user?.photo,
                            }}
                            containerStyle={{
                                ...internalStyles.avatar,
                                top: user?.is_inf === 'true' ? '80%' : 0,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...internalStyles.userInfoContainer,
                        marginLeft: user?.is_inf === 'true' ? 126 : 110,
                    }}
                >
                    <CustomText style={internalStyles.fullName}>{user?.full_name}</CustomText>
                    <CustomText style={internalStyles.dateText}>
                        {moment(userStates.selectedAdOwner?.createdAt).format('ll')} tarixindən
                        Qarderob.az - da
                    </CustomText>
                    <CustomText style={{ ...internalStyles.dateText, marginTop: 4 }}>
                        {toJS(userStates.userProducts?.count)} elan
                    </CustomText>
                </View>
                <View
                    style={{
                        ...internalStyles.socialContainer,
                        justifyContent: countOfSocialLinks === 3 ? 'space-between' : 'flex-start',
                        gap: countOfSocialLinks === 3 ? 0 : 10,
                    }}
                >
                    {user?.social_links &&
                        Object.keys(user?.social_links).map((key) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(user?.social_links[key]);
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
                                    {user?.social_links[key] && (
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

const UserProductsPage = () => {
    const user = toJS(productStates.selectedProduct?._user || userStates.selectedAdOwner);
    const userProducts = toJS(userStates.userProducts?.data);
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const loadMore = () => {
        if (userStates.userProducts?.has_next_page && !isLoadingMore) {
            setIsLoadingMore(true);
            fetchProducts(userStates.userProducts?.next_page).then((resp) => {
                // spread operator is not working here
                userStates.setUserProducts({
                    data: [...(userStates.userProducts?.data || []), ...resp.data],
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
            userStates.setUserProducts(resp);
            generalStates.setBottomSheetVisible(false);
        });
    };
    const getPageInfo = async () => {
        filterStates.setQuery('user_id', user?.id);
        filterStates.setQuery('verified', true);
        await fetchUserInfo(Number(user?.id));
        fetchProducts(1)
            .then((resp) => {
                userStates.setUserProducts(resp);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useFocusEffect(
        useCallback(() => {
            getPageInfo();
            return () => {
                generalStates.setBottomSheetVisible(false);
                userStates.setUserProducts(null);
                setIsLoading(true);
            };
        }, [filterStates.query]),
    );

    useEffect(() => {
        return () => {
            filterStates.resetQuery();
        };
    }, []);

    return (
        <View style={internalStyles.container}>
            <View>
                <TopContainer />
            </View>
            <FilterContainer search={false} />
            {isLoading ? (
                <LoadingComponent />
            ) : !userProducts?.length ? (
                <View style={notFoundStyle.notFoundContainer}>
                    <View style={notFoundStyle.notFoundCircle}>
                        <NotFoundIcon style={{ color: primaryColor }} />
                    </View>
                    <CustomText style={notFoundStyle.notFoundText}>
                        İstadəçinin aktiv elanı yoxdur
                    </CustomText>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <ProductList
                        data={userProducts || []}
                        type='user_ads'
                        loadMore={loadMore}
                        isMoreLoading={isLoadingMore}
                        selectSorting={selectSorting}
                    />
                </View>
            )}
        </View>
    );
};

export default observer(UserProductsPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
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
    bottomSheetContainer: {
        padding: 16,
        marginTop: 18,
    },
    bottomHeadText: {
        fontSize: 20,
        fontFamily: NunitoBold,
        lineHeight: 28,
        textAlign: 'center',
    },
    bottomSheetItemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bottomSheetItemText: {
        fontFamily: NunitoMedium,
        fontSize: 16,
        lineHeight: 21,
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
});
