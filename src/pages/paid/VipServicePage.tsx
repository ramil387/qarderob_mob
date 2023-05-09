import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import InfoCircleIcon from '@/icons/paid/InfoCircleIcon';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, e5Color } from '@/styles/variables';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import paymentStates from '@/states/payment/paymentStates';
import generalStates from '@/states/general/generalStates';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';
import OutlineRadioButton from '@/icons/product/OutlineRadioButton';
import CustomMainButton from '@/components/ui/CustomMainButton';

const VipServicePage = () => {
    const [paymentType, setPaymentType] = React.useState<'u_balance' | 'card'>('u_balance');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<number>(0);
    const product = toJS(productStates.selectedProduct);
    const packages = [
        {
            label: '5 ₼ / 7 gün',
            value: 5,
            count: 7,
        },
        {
            label: '9 ₼ / 14 gün',
            value: 9,
            count: 14,
        },
        {
            label: '15 ₼ / 28 gün',
            value: 15,
            count: 28,
        },
    ];
    const pay = async () => {
        try {
            if (paymentType === 'u_balance') {
                const val = packages[selected].count;
                setIsLoading(true);
                const body = {
                    count: val,
                    service: { type: `vip-${val}` },
                    amount: val,
                    ad_id: product?.id,
                };
                const resp = await http.post(APIS.payment + `/create`, body);
                if (resp.data.url) {
                    paymentStates.setPaymentUrl(resp.data.url);
                    setIsLoading(false);
                    paymentStates.setPaymentPageVisible(true);
                    paymentStates.setPaymentType('vip');
                }
            } else if (paymentType === 'card') {
                generalStates.setCommonDialogVisible(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

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
                {packages.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setSelected(index)}
                            style={internalStyles.itemContainer}
                            key={index}
                        >
                            {selected === index ? <FillRadioButtonIcon /> : <OutlineRadioButton />}

                            <CustomText style={internalStyles.itemText}>{item.label}</CustomText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={internalStyles.paymentTypeContainer}>
                <CustomText style={internalStyles.vipHeadText}>Ödəniş üsulu:</CustomText>
                <TouchableOpacity
                    style={internalStyles.itemContainer}
                    onPress={() => setPaymentType('card')}
                >
                    {paymentType === 'card' ? <FillRadioButtonIcon /> : <OutlineRadioButton />}
                    <CustomText>Bank kartı</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...internalStyles.itemContainer, paddingVertical: 0 }}
                    onPress={() => setPaymentType('u_balance')}
                >
                    {paymentType === 'u_balance' ? <FillRadioButtonIcon /> : <OutlineRadioButton />}
                    <CustomText>Şəxsi balans</CustomText>
                </TouchableOpacity>
            </View>

            <View style={internalStyles.btnContainer}>
                <CustomMainButton
                    disabled={isLoading}
                    func={pay}
                    title={isLoading ? <ActivityIndicator color='#fff' /> : 'Ödə'}
                />
                <View style={internalStyles.payInfo}>
                    <InfoCircleIcon />
                    <CustomText>Diqqət ödəniş geri qaytarılmır.</CustomText>
                </View>
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
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 16,
    },
    paymentTypeContainer: {
        marginTop: 16,
    },
    btnContainer: {
        marginTop: 32,
    },
    payInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'center',
        marginTop: 16,
    },
});
