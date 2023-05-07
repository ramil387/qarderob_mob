import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { Avatar, Switch } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
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
import {
    NavigationProp,
    ParamListBase,
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const ProductSection = () => {
    const isFocused = useIsFocused();
    // navigationKey
    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params);
    if (isFocused) {
        return (
            <View style={{ flex: 1, backgroundColor: f8Color }}>
                <CustomText>ProductSection</CustomText>
            </View>
        );
    }
    return null;
};

const TabView = () => {
    return (
        <Tab.Navigator
            // content background color red

            screenOptions={{
                // content backgorund color
                tabBarActiveTintColor: primaryColor,
                tabBarIndicatorStyle: {
                    backgroundColor: primaryColor,
                },
                tabBarInactiveTintColor: inactiveColor,
                tabBarLabelStyle: {
                    fontFamily: NunitoMedium,
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
                name='Dərc edildi'
                key='true'
                component={ProductSection}
                initialParams={{ key: 'true' }}
            />
            <Tab.Screen
                name='Gözləmədə'
                initialParams={{ key: 'false' }}
                component={ProductSection}
            />
            <Tab.Screen
                name='Müddəti bitmiş'
                initialParams={{ key: 'exp' }}
                component={ProductSection}
            />
            <Tab.Screen
                name='İmtina olunmuş'
                initialParams={{ key: 'rej' }}
                component={ProductSection}
            />
        </Tab.Navigator>
    );
};

const ProfilePage = () => {
    const user = toJS(profileStates.user);

    const addUserBalance = () => {};

    const UserActions = () => {
        return (
            <View>
                <View style={internalStyles.balanceItemContainer}>
                    <View style={internalStyles.balanceLeftContainer}>
                        <PurseIcon />
                        <CustomText style={internalStyles.balanceText}>
                            Balans:{' ' + user?.user_balance}₼
                        </CustomText>
                    </View>
                    <View style={{ width: '30%' }}>
                        <CustomMainButton
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
            <View
                style={{
                    padding: 16,
                }}
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
            </View>
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
        height: 40,
    },
});
