import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import LoginIcon from '@/icons/burger/LoginIcon';
import {
    NunitoBold,
    NunitoMedium,
    e0Color,
    e5Color,
    f5Color,
    lightBorder,
    primaryColor,
} from '@/styles/variables';
import PhoneIcon from '@/icons/product/PhoneIcon';
import DealIcon from '@/icons/burger/DealIcon';
import RuleIcon from '@/icons/burger/RuleIcon';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import {
    NavigationProp,
    ParamListBase,
    StackActions,
    useNavigation,
} from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import profileStates from '@/states/profile/profileStates';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { toJS } from 'mobx';
import KeyIcon from '@/icons/user/KeyIcon';
import UserSquareIcon from '@/icons/user/UserSquareIcon';
import LogoutIcon from '@/icons/user/LogoutIcon';
import { api } from '@/services/httpMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import MailIcon from '@/icons/product/MailIcon';
import InstagramSquareIcon from '@/icons/user/InstagramSquareIcon';
import OpenedMailIcon from '@/icons/social/OpenedMailIcon';
import generalStates from '@/states/general/generalStates';
import OutlineFacebookIcon from '@/icons/social/OutlineFacebookIcon';
import OutlineInstagramIcon from '@/icons/social/OutlineInstagramIcon';

const BurgerMenuPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goLoginPage = () => {
        navigate.navigate('LoginPage');
    };
    const goContactPage = () => {
        navigate.navigate('ContactPage');
    };
    const goRulesPage = () => {
        navigate.navigate('RulesPage');
    };
    const goDealsPage = () => {
        navigate.navigate('DealsPage');
    };
    return (
        <>
            {profileStates.user ? (
                <ProfileBurgerMenu />
            ) : (
                <View style={internalStyles.container}>
                    <TouchableOpacity
                        onPress={goLoginPage}
                        style={internalStyles.menuItemContainer}
                    >
                        <View style={internalStyles.menuLeftContainer}>
                            <LoginIcon style={{ color: primaryColor }} />
                            <CustomText style={internalStyles.menuName}>Daxil ol</CustomText>
                        </View>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => generalStates.setBottomSheetVisible(true)}
                        style={internalStyles.menuItemContainer}
                    >
                        <View style={internalStyles.menuLeftContainer}>
                            <PhoneIcon style={{ color: primaryColor }} />

                            <CustomText style={internalStyles.menuName}>Bizimlə əlaqə</CustomText>
                        </View>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={goDealsPage}
                        style={internalStyles.menuItemContainer}
                    >
                        <View style={internalStyles.menuLeftContainer}>
                            <DealIcon style={{ color: primaryColor }} />

                            <CustomText style={internalStyles.menuName}>
                                İstifadəçi razılaşması
                            </CustomText>
                        </View>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={goRulesPage}
                        style={internalStyles.menuItemContainer}
                    >
                        <View style={internalStyles.menuLeftContainer}>
                            <RuleIcon style={{ color: primaryColor }} />

                            <CustomText style={internalStyles.menuName}>Qaydalar</CustomText>
                        </View>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                </View>
            )}
            <CommonBottomSheet
                visible={generalStates.bottomSheetVisible}
                onClose={() => generalStates.setBottomSheetVisible(false)}
                height={300}
            >
                <View style={internalStyles.bottomSheetContainer}>
                    <CustomText style={internalStyles.bottomSheetheadText}>
                        Əlaqə vasitələri
                    </CustomText>
                </View>
                <TouchableOpacity
                    onPress={goContactPage}
                    style={{ ...internalStyles.bottomSheetContactItem, marginTop: 8 }}
                >
                    <OpenedMailIcon />
                    <CustomText style={internalStyles.contactText}>Mesaj göndər</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('https://www.facebook.com/profile.php?id=100064057661314');
                    }}
                    style={internalStyles.bottomSheetContactItem}
                >
                    <OutlineFacebookIcon />
                    <CustomText style={internalStyles.contactText}>Facebook</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL('https://www.instagram.com/qarderob.az/');
                    }}
                    style={internalStyles.bottomSheetContactItem}
                >
                    <OutlineInstagramIcon />
                    <CustomText style={internalStyles.contactText}>Mesaj göndər</CustomText>
                </TouchableOpacity>
            </CommonBottomSheet>
        </>
    );
};

export default observer(BurgerMenuPage);

const ProfileBurgerMenu = observer(() => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const storeMode = toJS(profileStates.storeMode);

    const menu = [
        {
            label: 'Şifrəni dəyiş',
            icon: <KeyIcon style={{ color: primaryColor }} />,
            func: () => navigate.navigate('ChangePassPage'),
        },
        {
            label: 'Bizimlə əlaqə',
            icon: <PhoneIcon style={{ color: primaryColor }} />,
            func: () => generalStates.setBottomSheetVisible(true),
        },
        {
            label: 'İstifadəçi razılaşması',
            icon: <DealIcon style={{ color: primaryColor }} />,
            func: () => navigate.navigate('DealsPage'),
        },
        {
            label: 'Qaydalar',
            icon: <RuleIcon style={{ color: primaryColor }} />,
            func: () => navigate.navigate('RulesPage'),
        },
        {
            label: 'Hesabı sil',
            icon: <UserSquareIcon style={{ color: primaryColor }} />,
        },
        {
            label: 'Çıxış',
            icon: <LogoutIcon style={{ color: primaryColor }} />,
            func: () => logOut(),
        },
    ];

    const goProfilePage = () => {
        navigate.navigate('ProfilePage');
    };

    const logOut = () => {
        profileStates.setUser(null);
        profileStates.setToken(null);
        api.defaults.headers.common['Authorization'] = null;
        AsyncStorage.removeItem('token');
        navigate.navigate('HomePage');
    };

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity
                onPress={goProfilePage}
                style={{
                    ...internalStyles.avatarContainer,
                    borderBottomWidth: 1,
                    borderBottomColor: e5Color,
                    paddingVertical: 16,
                }}
            >
                <View style={internalStyles.menuLeftContainer}>
                    <Avatar
                        size={60}
                        rounded
                        source={{
                            uri: storeMode
                                ? profileStates.user?._store?.img
                                : profileStates.user?.photo,
                        }}
                    />
                    <CustomText style={internalStyles.menuName}>
                        {storeMode
                            ? profileStates.user?._store?.name
                            : profileStates.user?.username}
                    </CustomText>
                </View>
                <ChevronRightIcon />
            </TouchableOpacity>
            <View
                style={{
                    ...internalStyles.btnContainer,
                    display: profileStates.user?._store?.verified ? 'flex' : 'none',
                }}
            >
                <View style={internalStyles.btn}>
                    <CustomMainButton
                        style={{ backgroundColor: !storeMode ? primaryColor : e0Color }}
                        func={() => {
                            profileStates.setStoreMode(false);
                        }}
                        title={'İstifadəçi'}
                    />
                </View>
                <View style={internalStyles.btn}>
                    <CustomMainButton
                        style={{ backgroundColor: storeMode ? primaryColor : e0Color }}
                        func={() => {
                            profileStates.setStoreMode(true);
                        }}
                        title={'Mağaza'}
                    />
                </View>
            </View>
            {menu.map((item, index) => {
                return (
                    <View key={index}>
                        <TouchableOpacity
                            style={{
                                ...internalStyles.menuItemContainer,
                                borderBottomWidth: index === menu.length - 1 ? 0 : 1,
                            }}
                            onPress={item.func}
                        >
                            <View style={internalStyles.menuLeftContainer}>
                                {item.icon}
                                <CustomText style={internalStyles.menuName}>
                                    {item.label}
                                </CustomText>
                            </View>
                            <ChevronRightIcon />
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
});

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    menuItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderBottomWidth: 1,
        paddingVertical: 16,
        borderBottomColor: e5Color,
        justifyContent: 'space-between',
    },
    menuName: {
        fontSize: 16,
        fontFamily: NunitoMedium,
    },
    menuLeftContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    btn: {
        width: '48%',
    },
    bottomSheetContainer: {
        paddingVertical: 18,
        backgroundColor: f5Color,
    },
    bottomSheetheadText: {
        fontFamily: NunitoBold,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    bottomSheetContactItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: lightBorder,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    contactText: {
        fontSize: 16,
        fontFamily: NunitoMedium,
        width: 200,
        marginLeft: 4,
    },
});
