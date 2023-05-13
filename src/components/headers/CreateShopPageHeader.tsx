import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import CustomText from '../ui/CustomText';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import BackIcon from '@/icons/product/BackIcon';
import { observer } from 'mobx-react-lite';
import { NunitoBold } from '@/styles/variables';

const CreateShopPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const user = toJS(profileStates?.user);

    return (
        <View style={internalStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigate.goBack();
                }}
            >
                <BackIcon />
            </TouchableOpacity>
            <CustomText style={internalStyles.midText}>
                {user?._store?.name ?? 'Mağaza yarat'}
            </CustomText>
            <View />
        </View>
    );
};

export default observer(CreateShopPageHeader);

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
    midText: {
        fontSize: 20,
        fontFamily: NunitoBold,
    },
});
