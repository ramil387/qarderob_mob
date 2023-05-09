import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import InfoCircleIcon from '@/icons/paid/InfoCircleIcon';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, e5Color } from '@/styles/variables';

const VipServicePage = () => {
    const packages = [
        {
            label: '5 ₼ / 7 gün',
            value: 5,
        },
        {
            label: '9 ₼ / 14 gün',
            value: 9,
        },
        {
            label: '15 ₼ / 28 gün',
            value: 15,
        },
    ];
    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.topContainer}>
                <View style={{ top: 3 }}>
                    <InfoCircleIcon />
                </View>
                <CustomText style={internalStyles.infoText}>
                    Elanınız VIP bölümündə təsadüfi şəkildə göstəriləcək.
                </CustomText>
            </View>
            <View style={internalStyles.midContainer}>
                <CustomText style={internalStyles.vipHeadText}>Elanınızı VIP edin:</CustomText>
            </View>
        </View>
    );
};

export default VipServicePage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingBottom: 8,
    },
    infoText: {
        lineHeight: 21,
    },
    midContainer: {
        marginTop: 36,
    },
    vipHeadText: {
        fontFamily: NunitoBold,
        fontSize: 16,
        lineHeight: 21,
    },
});
