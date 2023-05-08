import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { Avatar, Switch } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    f5Color,
    f8Color,
    inactiveColor,
    primaryColor,
} from '@/styles/variables';
import CalendarIcon from '@/icons/user/CalendarIcon';
import moment from 'moment';
import PurseIcon from '@/icons/user/PurseIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import EditIcon from '@/icons/user/EditIcon';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { fetchUserProducts } from '@/states/user/fetchUserProducts';
import ProductList from '@/components/products/ProductList';
import productStates from '@/states/product/productStates';
import LoadingComponent from '@/components/common/LoadingComponent';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import userStates from '@/states/user/userStates';
import NotFoundIcon from '@/icons/user/NotFoundIcon';

const Tab = createMaterialTopTabNavigator();

const ProductSection = observer(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const user = toJS(profileStates.user);
    const route: any = useRoute();
    const key = route.params?.key;

    useEffect(() => {
        if (isFocused) {
            setIsLoading(true);
            fetchUserProducts(user!.id, key, 1, profileStates.storeMode)
                .then((resp) => {
                    userStates.setUserProducts(resp);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [profileStates.storeMode]);

    const loadMore = () => {
        if (isFocused) {
            if (userStates.userProducts?.has_next_page) {
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
            <View style={{ padding: 16, paddingTop: 0, backgroundColor: f8Color, flex: 1 }}>
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

const TabView = () => {
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
};

const ProfilePage = () => {
    const user = toJS(profileStates.user);
    const userContainerHeight = useSharedValue(294.2);
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
            changeUserContainerHeight(294.2, 16);
        }
    }, [productStates.productListScrollDirection]);

    const addUserBalance = () => {};

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
                    useContainerStyle,
                ]}
            >
                <View style={internalStyles.avatarContainer}>
                    <Avatar size={60} rounded source={{ uri: user?.photo }} />
                    <View>
                        <CustomText style={internalStyles.username}>{user?.username}</CustomText>
                        <View style={internalStyles.dateContainer}>
                            <CalendarIcon style={{ color: inactiveColor }} />
                            <CustomText style={internalStyles.dateText}>
                                {moment(user?.createdAt).format('ll')} tarixindən Qarderob - da
                            </CustomText>
                        </View>
                        <CustomText style={internalStyles.limit}>
                            Elan limi: {user?._store?._active_package?.limit ?? 0}
                        </CustomText>
                    </View>
                </View>
                <View style={internalStyles.modeContainer}>
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
                <UserActions />
            </Animated.View>
            <TabView />
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
});
