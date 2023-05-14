import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { http } from '@/services/httpMethods';
import { PaymentStatusType } from '@/types/paymentStatusType';
import CheckIcon from '@/icons/success/CheckIcon';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, e5Color, inactiveColor, primaryColor } from '@/styles/variables';
import { APIS } from '@/constants';
import paymentStates from '@/states/payment/paymentStates';
import { fetchMe } from '@/states/profile/fetchMe';
import LoadingComponent from '@/components/common/LoadingComponent';

const PaymentSuccessPage = () => {
    const [paymenResult, setPaymentResult] = useState({} as PaymentStatusType);
    const [isLoading, setIsLoading] = useState(true);

    const getPaymentStatus = async () => {
        const retry = async () => {
            const resp = await http.get(`${APIS.checkOrder}/${paymentStates.paymenRusulUrl}`);
            if (resp.status === 200) {
                setPaymentResult(resp.data);
                setIsLoading(false);
                fetchMe();
            } else {
                setTimeout(() => {
                    retry();
                }, 1000);
            }
        };
        retry();
    };

    useEffect(() => {
        getPaymentStatus();
    }, []);

    const fields = [
        {
            label: 'Məbləğ',
            value: paymenResult.amount + '₼',
        },
        {
            label: 'Xidmət',
            value: paymenResult.service,
        },
        {
            label: 'Ödəyən hesab',
            value: paymenResult.full_name,
        },
        {
            label: 'Ödəniş tarixi',
            value: paymenResult.createdAt,
        },
    ];

    if (isLoading) return <LoadingComponent />;

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.checkIcon}>
                <CheckIcon style={{ width: 92, height: 92 }} />
            </View>
            <View style={{ marginTop: 16 }}>
                <ScrollView>
                    <View style={internalStyles.headContainer}>
                        <CustomText style={internalStyles.headText}>Ödəniş uğurludur!</CustomText>
                        <CustomText style={internalStyles.subText}>
                            Hörmətli, istifadəçi, ödənişiniz uğurla tamamlandı. Ödənişin
                            təfərrüatlarını aşağıda görə bilərsiniz
                        </CustomText>
                    </View>
                    <CustomText style={internalStyles.transaction}>
                        Əməliyyat nömrəsi: {paymenResult.transaction}
                    </CustomText>
                    <View style={internalStyles.detailContainer}>
                        {fields.map((item, index) => {
                            return (
                                <View style={internalStyles.item} key={index}>
                                    <CustomText
                                        style={{ ...internalStyles.itemText, color: inactiveColor }}
                                    >
                                        {item.label}
                                    </CustomText>
                                    <CustomText
                                        style={{
                                            ...internalStyles.itemText,
                                            fontFamily: NunitoBold,
                                        }}
                                    >
                                        {item.value}
                                    </CustomText>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default observer(PaymentSuccessPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    checkIcon: {
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    headContainer: {
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingVertical: 16,
    },
    headText: {
        fontSize: 18,
        fontFamily: NunitoBold,
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        textAlign: 'center',
        fontSize: 16,
        color: inactiveColor,
        marginTop: 8,
    },
    transaction: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 16,
        color: primaryColor,
        fontFamily: NunitoMedium,
    },
    detailContainer: {
        paddingVertical: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
    itemText: {
        fontSize: 16,
        fontFamily: NunitoMedium,
    },
});
