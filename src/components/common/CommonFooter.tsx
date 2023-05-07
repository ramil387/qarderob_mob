import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { e5Color, f5Color, phoneWidth } from '@/styles/variables';
import HomeIcon from '@/icons/footer/HomeIcon';
import HeartFooterIcon from '@/icons/footer/HeartFooterIcon';
import MailFooterIcon from '@/icons/footer/MailFooterIcon';
import UserIcon from '@/icons/footer/UserIcon';
import PlusCircleIcon from '@/icons/footer/PlusCircleIcon';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import profileStates from '@/states/profile/profileStates';
import errorStates from '@/states/error/errorStates';
import { observer } from 'mobx-react-lite';

const CommonFooter = () => {
    const navigate: NavigationProp<ParamListBase> = generalStates.navigationRef.current;

    const goProfilePage = () => {
        navigate.navigate('ProfilePage');
    };

    const goAddProductPage = () => {
        if (profileStates.token) {
            // navigate.navigate('AddProductPage');
            return;
        }
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Elan yerləşdirmək üçün hesabınıza daxil olun');
        errorStates.setErrorBody('Hesabınız yoxdursa qeydiyyatdan keçin');
        errorStates.setOkText('Daxil ol');
        errorStates.setCancelText('Qeydiyyat');
        errorStates.setOkFunc(() => {
            navigate.navigate('LoginPage');
            errorStates.resetErrorStates();
        });
        errorStates.setCancelFunc(() => {
            navigate.navigate('RegisterPage');
            errorStates.resetErrorStates();
        });
    };

    const goHomePage = () => {
        generalStates.homeScrollRef.current.scrollToOffset({ animated: true, offset: 0 });
        navigate.navigate('HomePage');
    };

    const goFavouritePage = () => {
        navigate.navigate('FavouritePage');
    };

    const goMessagesPage = () => {
        navigate.navigate('MessagesPage');
    };

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={goHomePage}>
                <HomeIcon />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={goFavouritePage}>
                <HeartFooterIcon />
            </TouchableOpacity>
            <View style={internalStyles.plusBtn}>
                <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={goAddProductPage}
                    activeOpacity={0.8}
                >
                    <PlusCircleIcon />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={goMessagesPage}>
                <MailFooterIcon />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={goProfilePage}>
                <UserIcon />
            </TouchableOpacity>
        </View>
    );
};

export default memo(observer(CommonFooter));

const internalStyles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: '#eee',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 26,
    },
    plusBtn: {
        position: 'absolute',
        top: -30,
        display: 'flex',
        alignItems: 'center',
        width: phoneWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        left: 0,
    },
});
