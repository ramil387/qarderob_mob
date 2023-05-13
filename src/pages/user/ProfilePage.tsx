import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { Avatar, Switch } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    errorBackground,
    errorColor,
    f5Color,
    f8Color,
    inactiveColor,
    mainTextColor,
    phoneHeight,
    phoneWidth,
    primaryColor,
    successBackground,
    successColor,
} from '@/styles/variables';
import CalendarIcon from '@/icons/user/CalendarIcon';
import moment from 'moment';
import PurseIcon from '@/icons/user/PurseIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import EditIcon from '@/icons/user/EditIcon';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    NavigationProp,
    ParamListBase,
    useFocusEffect,
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { fetchUserProducts } from '@/states/user/fetchUserProducts';
import ProductList from '@/components/products/ProductList';
import productStates from '@/states/product/productStates';
import LoadingComponent from '@/components/common/LoadingComponent';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import userStates from '@/states/user/userStates';
import NotFoundIcon from '@/icons/user/NotFoundIcon';
import ShopIcon from '@/icons/shop/ShopIcon';
import PackageIcon from '@/icons/user/PackageIcon';
import GiftIcon from '@/icons/user/GiftIcon';
import shopStates from '@/states/shop/shopStates';
import { fillShopForm } from '@/helper/fillShopForm';
import { ShopType } from '@/types/shopType';
import CheckIcon from '@/icons/categories/CheckIcon';
import CloseIcon from '@/icons/error/CloseIcon';

const Tab = createMaterialTopTabNavigator();

const ProductSection = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const user = toJS(profileStates.user);
    const route: any = useRoute();
    const key = route.params?.key;

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            fetchUserProducts(user!.id, key, 1, profileStates.storeMode)
                .then((resp) => {
                    userStates.setUserProducts(resp);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, [profileStates.storeMode]),
    );

    const loadMore = () => {
        if (isFocused) {
            if (userStates.userProducts?.has_next_page && !isMoreLoading) {
                setIsMoreLoading(true);
                fetchUserProducts(
                    user!.id,
                    key,
                    userStates.userProducts?.next_page,
                    profileStates.storeMode,
                )
                    .then((resp) => {
                        userStates.setUserProducts({
                            ...resp,
                            data: [...userStates.userProducts?.data!, ...resp.data],
                        });
                    })
                    .finally(() => {
                        setIsMoreLoading(false);
                    });
            }
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (isFocused) {
        if (userStates.userProducts?.data?.length === 0) {
            return (
                <View style={internalStyles.notFound}>
                    <View style={internalStyles.notFoundCircle}>
                        <NotFoundIcon style={{ color: primaryColor }} />
                    </View>
                    <CustomText style={internalStyles.notFoundText}>
                        Bu bölmədə elan yoxdur
                    </CustomText>
                </View>
            );
        }

        return (
            <View
                style={{
                    paddingTop: 0,
                    backgroundColor: f8Color,
                    flex: 1,
                }}
            >
                <ProductList
                    data={userStates.userProducts?.data || []}
                    loadMore={loadMore}
                    isMoreLoading={isMoreLoading}
                    type='profile_ads'
                />
            </View>
        );
    }
    return null;
});

const TabView = memo(() => {
    return (
        <Tab.Navigator
            // content background color red

            screenOptions={{
                // remove ripple effect
                tabBarPressColor: 'transparent',
                tabBarActiveTintColor: primaryColor,
                tabBarIndicatorStyle: {
                    backgroundColor: primaryColor,
                },
                tabBarInactiveTintColor: inactiveColor,
                tabBarLabelStyle: {
                    fontFamily: NunitoBold,
                },
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    shadowColor: 'none',
                    elevation: 0,
                },
                tabBarScrollEnabled: true,
            }}
        >
            <Tab.Screen
                navigationKey='true'
                name='Dərc edildi'
                key='true'
                component={ProductSection}
                initialParams={{ key: 'true' }}
            />
            <Tab.Screen
                name='Gözləmədə'
                key='false'
                initialParams={{ key: 'false' }}
                component={ProductSection}
            />
            <Tab.Screen
                key='exp'
                name='Müddəti bitmiş'
                initialParams={{ key: 'exp' }}
                component={ProductSection}
            />
            <Tab.Screen
                key='rej'
                name='İmtina olunmuş'
                initialParams={{ key: 'rej' }}
                component={ProductSection}
            />
        </Tab.Navigator>
    );
});

const VerifiedMessage = memo(() => {
    const shop = toJS(profileStates?.user?._store);
    const isRejected = shop?.isRejected;
    const rejectReason = shop?.rejectReason;
    const headRejectText = rejectReason?.split('.')[0];
    const tailRejectText = rejectReason?.split(' ').slice(1).join(' ');
    if (isRejected) {
        return (
            <View
                style={{
                    ...internalStyles.verifiedMessage,
                    backgroundColor: errorBackground,
                    borderColor: errorColor,
                }}
            >
                <View style={{ ...internalStyles.checkIcon, backgroundColor: 'red' }}>
                    <CloseIcon style={{ color: '#fff', width: 16, height: 16 }} />
                </View>
                <CustomText style={internalStyles.verifiedMessageText}>
                    <CustomText style={{ fontFamily: NunitoBold, color: mainTextColor }}>
                        {headRejectText}
                    </CustomText>{' '}
                    {'\n'}
                    {tailRejectText}
                </CustomText>
            </View>
        );
    }
    return (
        <View style={internalStyles.verifiedMessage}>
            <View style={internalStyles.checkIcon}>
                <CheckIcon style={{ color: '#fff', width: 16, height: 16 }} />
            </View>
            <CustomText style={internalStyles.verifiedMessageText}>
                <CustomText style={{ fontFamily: NunitoBold, color: mainTextColor }}>
                    Mağaza məlumatlarınız uğurla göndərildi!
                </CustomText>{' '}
                {'\n'}
                Təsdiq olunduqdan sonra elanlarınızı dərc edə bilərsiniz.
            </CustomText>
        </View>
    );
});

const ProfilePage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const user = toJS(profileStates.user);
    const shop = toJS(user?._store);
    const [initialHeight, setInitialHeight] = useState<any>(null);
    const userContainerHeight = useSharedValue(initialHeight ? initialHeight : 0);
    const userContainerPadding = useSharedValue(16);

    const changeUserContainerHeight = (height: number, padding: number) => {
        userContainerHeight.value = withTiming(height, { duration: 300 });
        userContainerPadding.value = withTiming(padding, { duration: 300 });
    };
    const useContainerStyle = useAnimatedStyle(() => {
        return {
            height: userContainerHeight.value,
            overflow: 'hidden',
            padding: userContainerPadding.value,
        };
    });

    useEffect(() => {
        if (productStates.productListScrollDirection === 'down') {
            changeUserContainerHeight(0, 0);
        } else {
            changeUserContainerHeight(initialHeight, 16);
        }
    }, [productStates.productListScrollDirection, initialHeight, profileStates?.storeMode]);

    useEffect(() => {
        setInitialHeight(null);
    }, [profileStates.storeMode]);

    const addUserBalance = () => {};
    const goShopEditPage = (status: boolean) => {
        if (status) {
            fillShopForm(shop as ShopType);
        }
        navigate.navigate('CreateShopPage');
    };

    const UserActions = () => {
        return (
            <View>
                <View style={internalStyles.balanceItemContainer}>
                    <View style={internalStyles.balanceLeftContainer}>
                        <PurseIcon />
                        <CustomText style={internalStyles.balanceText}>
                            Balans:
                            <CustomText
                                style={{
                                    ...internalStyles.balanceText,
                                    fontFamily: NunitoBold,
                                    paddingVertical: 0,
                                }}
                            >
                                {' ' + user?.user_balance}₼
                            </CustomText>
                        </CustomText>
                    </View>
                    <View
                        style={{
                            width: '30%',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <CustomMainButton
                            containerStyle={internalStyles.addBtn}
                            titleStyle={{ fontSize: 14, fontFamily: NunitoBold }}
                            style={internalStyles.addBtn}
                            func={addUserBalance}
                            title='Artır'
                        />
                    </View>
                </View>
                <TouchableOpacity style={internalStyles.balanceItemContainer}>
                    <View style={internalStyles.balanceLeftContainer}>
                        <EditIcon />
                        <CustomText style={internalStyles.balanceText}>Profili idarə et</CustomText>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => goShopEditPage(false)}
                    style={{
                        ...internalStyles.balanceItemContainer,
                        display: user?._store?.id ? 'none' : 'flex',
                    }}
                >
                    <View style={internalStyles.balanceLeftContainer}>
                        <ShopIcon />
                        <CustomText style={internalStyles.balanceText}>Mağaza yarat</CustomText>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
            </View>
        );
    };

    const ShopActions = () => {
        return (
            <View>
                <View style={internalStyles.balanceItemContainer}>
                    <View style={internalStyles.balanceLeftContainer}>
                        <PackageIcon />
                        <CustomText style={internalStyles.balanceText}>
                            Mağaza paketi:
                            <CustomText
                                style={{
                                    ...internalStyles.balanceText,
                                    fontFamily: NunitoBold,
                                    paddingVertical: 0,
                                }}
                            >
                                {' ' + shop?._active_package?.package_az}
                            </CustomText>
                        </CustomText>
                    </View>
                    <View
                        style={{
                            width: '30%',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <CustomMainButton
                            containerStyle={internalStyles.addBtn}
                            titleStyle={{ fontSize: 14, fontFamily: NunitoBold }}
                            style={internalStyles.addBtn}
                            func={addUserBalance}
                            title='Artır'
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        ...internalStyles.balanceItemContainer,
                        display: 'flex',
                    }}
                >
                    <View style={internalStyles.balanceLeftContainer}>
                        <GiftIcon />
                        <CustomText style={internalStyles.balanceText}>
                            Bonus balansı:{' '}
                            <CustomText
                                style={{
                                    ...internalStyles.balanceText,
                                    fontFamily: NunitoBold,
                                    paddingVertical: 0,
                                }}
                            >
                                {' ' + user?.shop_balance}₼
                            </CustomText>
                        </CustomText>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => goShopEditPage(true)}
                    style={internalStyles.balanceItemContainer}
                >
                    <View style={internalStyles.balanceLeftContainer}>
                        <EditIcon />
                        <CustomText style={internalStyles.balanceText}>
                            Mağazanı idarə et
                        </CustomText>
                    </View>
                    <ChevronRightIcon />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={internalStyles.container}>
            <Animated.View
                style={[
                    {
                        padding: 16,
                    },
                    initialHeight ? useContainerStyle : {},
                ]}
            >
                <View
                    onLayout={(e) => {
                        if (!initialHeight) {
                            setInitialHeight(e.nativeEvent.layout.height + 16);
                            userContainerHeight.value = e.nativeEvent.layout.height + 16;
                        }
                    }}
                >
                    <View style={internalStyles.avatarContainer}>
                        <Avatar
                            size={60}
                            rounded
                            source={{
                                uri: profileStates?.storeMode ? user?._store?.img : user?.photo,
                            }}
                        />
                        <View>
                            <CustomText style={internalStyles.username}>
                                {profileStates?.storeMode ? user?._store?.name : user?.username}
                            </CustomText>
                            <View style={internalStyles.dateContainer}>
                                <CalendarIcon style={{ color: inactiveColor }} />
                                <CustomText style={internalStyles.dateText}>
                                    {moment(
                                        profileStates?.storeMode
                                            ? user?._store?.createdAt
                                            : user?.createdAt,
                                    ).format('ll')}{' '}
                                    tarixindən Qarderob - da
                                </CustomText>
                            </View>
                            <CustomText
                                style={{
                                    ...internalStyles.limit,
                                    display: profileStates?.storeMode ? 'flex' : 'none',
                                }}
                            >
                                Elan limi: {user?._store?._active_package?.limit ?? 0}
                            </CustomText>
                        </View>
                    </View>
                    <View
                        style={{
                            ...internalStyles.modeContainer,
                            display: user?._store?.id ? 'flex' : 'none',
                        }}
                    >
                        <CustomText
                            style={{
                                ...internalStyles.modeText,

                                color: !profileStates.storeMode ? primaryColor : inactiveColor,
                            }}
                        >
                            İstifadəçi
                        </CustomText>
                        <Switch
                            style={{ width: 48 }}
                            onChange={() => {
                                profileStates.setStoreMode(!profileStates.storeMode);
                            }}
                            thumbColor={primaryColor}
                            value={profileStates.storeMode}
                            color={primaryColor}
                        />
                        <CustomText
                            style={{
                                ...internalStyles.modeText,
                                color: profileStates.storeMode ? primaryColor : inactiveColor,
                            }}
                        >
                            Mağaza
                        </CustomText>
                    </View>
                    {!profileStates?.storeMode ? <UserActions /> : <ShopActions />}
                </View>
            </Animated.View>
            {(profileStates?.storeMode && shop?.verified) || !profileStates?.storeMode ? (
                <TabView />
            ) : (
                <VerifiedMessage />
            )}
        </View>
    );
};

export default observer(ProfilePage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
    },
    username: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: NunitoMedium,
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    dateText: {
        color: inactiveColor,
    },
    limit: {
        marginTop: 4,
    },
    modeContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        borderBottomWidth: 1,
        width: '100%',
        justifyContent: 'center',
        borderBottomColor: e5Color,
        paddingVertical: 16,
    },
    modeText: {
        fontFamily: NunitoBold,
        fontSize: 13,
        letterSpacing: 1,
    },
    balanceItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingVertical: 16,
    },
    balanceLeftContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    balanceText: {
        fontSize: 16,
        fontFamily: NunitoMedium,
    },
    addBtn: {
        height: 36,
        padding: 0,
        margin: 0,
    },
    notFound: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: f8Color,
        height: '100%',
    },
    notFoundCircle: {
        padding: 16,
        borderRadius: 100,
        backgroundColor: f5Color,
    },
    notFoundText: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: NunitoBold,
        color: inactiveColor,
    },
    verifiedMessage: {
        padding: 16,
        borderWidth: 1,
        borderColor: successColor,
        backgroundColor: successBackground,
        margin: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    checkIcon: {
        top: 4,
        width: 24,
        height: 24,
        backgroundColor: 'green',
        padding: 4,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedMessageText: {
        fontSize: 16,
        paddingRight: 24,
        lineHeight: 24,
        color: inactiveColor,
    },
});
