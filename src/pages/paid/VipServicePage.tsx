import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import InfoCircleIcon from '@/icons/paid/InfoCircleIcon';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, e5Color } from '@/styles/variables';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import paymentStates from '@/states/payment/paymentStates';
import generalStates from '@/states/general/generalStates';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';
import OutlineRadioButton from '@/icons/product/OutlineRadioButton';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { fetchMe } from '@/states/profile/fetchMe';
import { fetchSingleProduct } from '@/states/product/fetchSingleProduct';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

const VipServicePage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [paymentType, setPaymentType] = React.useState<'u_balance' | 'card'>('u_balance');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [price, setPrice] = React.useState<number>(5);
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
            if (paymentType === 'card') {
                const selected = packages.findIndex((item) => item.value === price);
                const count = packages[selected].count;
                setIsLoading(true);
                const body = {
                    count,
                    service: { type: `vip-${price}` },
                    amount: price,
                    ad_id: product?.id,
                };
                const resp = await http.post(APIS.payment + `/create`, body);
                if (resp.data.url) {
                    paymentStates.setPaymentUrl(resp.data.url);
                    setIsLoading(false);
                    paymentStates.setPaymentPageVisible(true);
                    paymentStates.setPaymentType('vip');
                    paymentStates.setPaymentModalVisible(true);
                }
            } else if (paymentType === 'u_balance') {
                const selected = packages.findIndex((item) => item.value === price);
                const body = {
                    count: selected === 1 ? 3 : selected === 2 ? 9 : 15,
                    service: { type: `my_balance-${price}`, service: 'up_service' },
                    amount: price,
                    ad_id: productStates.selectedProduct?.id,
                };
                generalStates.setCommonDialogVisible(true);
                generalStates.setDialogAction(true);
                generalStates.setDialogOkText('Bəli');
                generalStates.setDialogType('warning');
                generalStates.setDialogCancelText('Xeyr');
                generalStates.setDialogHeader('Ödəniş şəxsi balansdan çıxılacaq');
                generalStates.setDialogBody(
                    `Elanınızın irəli çəkilməsi üçün şəxsi balansınızdan ${price}₼ çıxılacaq. Davam etmək istəyirsiniz?`,
                );
                generalStates.setOkFunc(async () => {
                    const resp = await http.post(APIS.auth + `/update-balance`, body);
                    if (resp.status === 200) {
                        await fetchMe();
                        await fetchSingleProduct(
                            productStates.selectedProduct?.id,
                            productStates.selectedProduct?.slug,
                        );
                        generalStates.setCommonDialogVisible(false);
                        navigate.goBack();
                    }
                });
                generalStates.setCancelFunc(() => {
                    generalStates.setCommonDialogVisible(false);
                });
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
                    const selected = packages.findIndex((item) => item.value === price);
                    return (
                        <TouchableOpacity
                            onPress={() => setPrice(item.value)}
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
                    <CustomText style={internalStyles.itemText}>Bank kartı</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...internalStyles.itemContainer, paddingVertical: 0 }}
                    onPress={() => setPaymentType('u_balance')}
                >
                    {paymentType === 'u_balance' ? <FillRadioButtonIcon /> : <OutlineRadioButton />}
                    <CustomText style={internalStyles.itemText}>Şəxsi balans</CustomText>
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
                    <CustomText style={{ fontFamily: NunitoMedium }}>
                        Diqqət ödəniş geri qaytarılmır.
                    </CustomText>
                </View>
            </View>
        </View>
    );
};

export default observer(VipServicePage);

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
