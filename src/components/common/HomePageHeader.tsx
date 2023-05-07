import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BurgerMenuIcon from '@/icons/home/BurgerMenuIcon';
import FilterIcon from '@/icons/home/FilterIcon';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import profileStates from '@/states/profile/profileStates';
import errorStates from '@/states/error/errorStates';

const HomePageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goFilter = () => {
        navigate.navigate('FilterPage');
    };
    const goBurgerMenu = () => {
        navigate.navigate('BurgerMenuPage');
    };
    const goNotification = () => {
        if (!profileStates.token) {
            errorStates.setCommonErrorVisible(true);
            errorStates.setErrorHeader('Bildiriş');
            errorStates.setErrorBody('Bildirişləri görmək üçün daxil olmalısınız.');
            errorStates.setOkText('Daxil ol');
            errorStates.setCancelText('Qeydiyyat');
            errorStates.setOkFunc(() => {
                navigate.navigate('LoginPage');
            });
            errorStates.setCancelFunc(() => {
                navigate.navigate('RegisterPage');
            });
            return;
        }
    };
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={goBurgerMenu}>
                <BurgerMenuIcon />
            </TouchableOpacity>
            <View style={internalStyles.rightContainer}>
                <TouchableOpacity onPress={goFilter}>
                    <FilterIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={goNotification} style={{ marginLeft: 26 }}>
                    <NotificationIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default observer(HomePageHeader);

const internalStyles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
