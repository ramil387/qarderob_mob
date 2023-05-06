import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BurgerMenuIcon from '@/icons/home/BurgerMenuIcon';
import FilterIcon from '@/icons/home/FilterIcon';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const HomePageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goFilter = () => {
        navigate.navigate('FilterPage');
    };
    const goBurgerMenu = () => {
        navigate.navigate('BurgerMenuPage');
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
                <TouchableOpacity style={{ marginLeft: 26 }}>
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
