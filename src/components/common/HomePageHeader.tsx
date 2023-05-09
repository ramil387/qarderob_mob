import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BurgerMenuIcon from '@/icons/home/BurgerMenuIcon';
import FilterIcon from '@/icons/home/FilterIcon';
import NotificationIcon from '@/icons/home/NotificationIcon';
import { observer } from 'mobx-react-lite';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import profileStates from '@/states/profile/profileStates';
import { defineFilterCount } from '../../helper/defineFilterCount';
import filterStates from '@/states/filter/filterStates';
import { Badge } from '@rneui/themed';
import { primaryColor } from '@/styles/variables';
import { showShouldAuth } from '@/helper/showShouldAuth';

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
            showShouldAuth(navigate, 'Bildiriş', 'Bildirişləri görmək üçün daxil olmalısınız.');
            return;
        }
    };

    const filterCount = defineFilterCount(filterStates.query);

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={goBurgerMenu}>
                <BurgerMenuIcon />
            </TouchableOpacity>
            <View style={internalStyles.rightContainer}>
                <TouchableOpacity onPress={goFilter}>
                    <FilterIcon />
                    <Badge
                        value={filterCount}
                        badgeStyle={{
                            display: filterCount > 0 ? 'flex' : 'none',
                            ...internalStyles.filterBadge,
                        }}
                    />
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
    filterBadge: {
        position: 'absolute',
        right: -18,
        bottom: 10,
        backgroundColor: primaryColor,
    },
});
