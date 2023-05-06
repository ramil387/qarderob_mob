import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import LoginIcon from '@/icons/burger/LoginIcon';
import { NunitoMedium, e5Color, primaryColor } from '@/styles/variables';
import PhoneIcon from '@/icons/product/PhoneIcon';
import DealIcon from '@/icons/burger/DealIcon';
import RuleIcon from '@/icons/burger/RuleIcon';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';

const BurgerMenuPage = () => {
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity style={internalStyles.menuItemContainer}>
                <View style={internalStyles.menuLeftContainer}>
                    <LoginIcon style={{ color: primaryColor }} />

                    <CustomText style={internalStyles.menuName}>Daxil ol</CustomText>
                </View>
                <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={internalStyles.menuItemContainer}>
                <View style={internalStyles.menuLeftContainer}>
                    <PhoneIcon style={{ color: primaryColor }} />

                    <CustomText style={internalStyles.menuName}>Bizimlə əlaqə</CustomText>
                </View>
                <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={internalStyles.menuItemContainer}>
                <View style={internalStyles.menuLeftContainer}>
                    <DealIcon style={{ color: primaryColor }} />

                    <CustomText style={internalStyles.menuName}>İstifadəçi razılaşması</CustomText>
                </View>
                <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={internalStyles.menuItemContainer}>
                <View style={internalStyles.menuLeftContainer}>
                    <RuleIcon style={{ color: primaryColor }} />

                    <CustomText style={internalStyles.menuName}>Qaydalar</CustomText>
                </View>
                <ChevronRightIcon />
            </TouchableOpacity>
        </View>
    );
};

export default observer(BurgerMenuPage);

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
});
