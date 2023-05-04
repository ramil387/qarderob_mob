import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BurgerMenuIcon from '@/icons/home/BurgerMenuIcon';
import FilterIcon from '@/icons/home/FilterIcon';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';
import generalStates from '@/states/general/generalStates';

const HomePageHeader = () => {
    console.log(generalStates.screenSize);
    return (
        <View style={internalStyles.container}>
            <View>
                <BurgerMenuIcon />
            </View>
            <View style={internalStyles.rightContainer}>
                <TouchableOpacity>
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
