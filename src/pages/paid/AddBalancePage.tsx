import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { NunitoBold, NunitoMedium, e5Color, primaryColor } from '@/styles/variables';
import VisaMasterIcon from '@/icons/payment/VisaMasterIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import InfoCircleIcon from '@/icons/paid/InfoCircleIcon';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import paymentStates from '@/states/payment/paymentStates';
import validator from 'validator';

const AddBalancePage = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const fields = ['5', '10', '20', '50'];
    const [price, setPrice] = React.useState<string>('5');
    const pay = async () => {
        try {
            setIsLoading(true);
            const body = {
                count: price,
                service: { type: `u_balance-${price}` },
                amount: price,
                type: 'add_balance',
            };
            paymentStates.setPaymentBody(body);
            const resp = await http.post(APIS.payment + `/create`, body);
            if (resp.data.url) {
                paymentStates.setPaymentUrl(resp.data.url);
                paymentStates.setPaymentModalVisible(true);
                paymentStates.setPaymentType('add_balance');
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.headText}>Artırılacaq məbləği daxil edin</CustomText>
            <View style={internalStyles.inpContainer}>
                <CustomTextInput
                    onChangeText={(text) => {
                        if (validator.isNumeric(text)) {
                            if (Number(text) > 0) {
                                setPrice(text);
                            }
                        }
                    }}
                    value={price}
                    style={internalStyles.inp}
                />
            </View>
            <View style={internalStyles.pricesContainer}>
                {fields.map((price) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setPrice(price)}
                            style={internalStyles.priceItem}
                            key={price}
                        >
                            <CustomText style={internalStyles.priceText}>{price}₼</CustomText>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={internalStyles.visaMaster}>
                <VisaMasterIcon />
            </View>

            <View style={internalStyles.btn}>
                <CustomMainButton
                    func={pay}
                    title={isLoading ? <ActivityIndicator color='#fff' /> : 'Ödə'}
                />
            </View>
            <View style={internalStyles.payInfo}>
                <InfoCircleIcon />
                <CustomText style={{ fontFamily: NunitoMedium }}>
                    Diqqət ödəniş geri qaytarılmır.
                </CustomText>
            </View>
        </View>
    );
};
export default AddBalancePage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headText: {
        fontSize: 16,
        fontFamily: NunitoBold,
    },
    inpContainer: {
        borderBottomWidth: 1,
        borderBottomColor: primaryColor,
        marginTop: 24,
    },
    inp: {
        textAlignVertical: 'bottom',
        padding: 0,
        fontFamily: NunitoBold,
        fontSize: 20,
        paddingBottom: 3,
    },
    pricesContainer: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
    priceItem: {
        borderWidth: 1,
        borderColor: e5Color,
        borderRadius: 8,
        width: 60,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: NunitoMedium,
        fontSize: 14,
        color: primaryColor,
    },
    visaMaster: {
        alignSelf: 'center',
        marginTop: 36,
    },
    btn: {
        marginTop: 26,
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
