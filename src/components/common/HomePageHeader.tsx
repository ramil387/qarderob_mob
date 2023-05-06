import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BurgerMenuIcon from '@/icons/home/BurgerMenuIcon';
import FilterIcon from '@/icons/home/FilterIcon';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';
import generalStates from '@/states/general/generalStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const HomePageHeader = () => {
    console.log(generalStates.screenSize);
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goFilter = () => {
        navigate.navigate('FilterPage');
    };
    return (
        <View style={internalStyles.container}>
            <View>
                <BurgerMenuIcon />
            </View>
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
        paddingBottom: 0,
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
