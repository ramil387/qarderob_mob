import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { mainTextColor, modalBackground, phoneWidth } from '@/styles/variables';
import WebView from 'react-native-webview';
import CloseIcon from '@/icons/error/CloseIcon';
import paymentStates from '@/states/payment/paymentStates';
import LoadingComponent from './LoadingComponent';
import errorStates from '@/states/error/errorStates';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import generalStates from '@/states/general/generalStates';

const PaymentModal = () => {
    return (
        <Modal visible={paymentStates.paymentModalVisible} transparent={true}>
            <View style={internalStyles.container}>
                <TouchableOpacity
                    onPress={() => paymentStates.setPaymentModalVisible(false)}
                    style={internalStyles.closeIcon}
                >
                    <CloseIcon style={{ color: mainTextColor, width: 26, height: 26 }} />
                </TouchableOpacity>
                <View style={internalStyles.modalContainer}>
                    {paymentStates.paymentLoading && (
                        <View style={internalStyles.loading}>
                            <LoadingComponent />
                        </View>
                    )}
                    <WebView
                        style={internalStyles.web}
                        source={{ uri: paymentStates.paymentUrl }}
                        onNavigationStateChange={(navState) => {
                            console.log({ url: navState.url });
                            // detect url redirect
                            paymentStates.setPaymentLoading(navState.loading);

                            if (
                                navState.url.includes('canceled') ||
                                navState.url.includes('orderCancel')
                            ) {
                                paymentStates.setPaymentModalVisible(false);
                            } else if (
                                navState.url.includes('orderDecline') ||
                                navState.url.includes('declined')
                            ) {
                                paymentStates.setPaymentModalVisible(false);
                                errorStates.setCommonErrorVisible(true);
                                errorStates.setErrorHeader('Ödəniş uğursuz oldu');
                                errorStates.setErrorBody(
                                    'Ödəniş bank tərəfindən imtina edildi. Zəhmət olmasa yenidən cəhd edin',
                                );
                                errorStates.setOkText('Ödə');
                                errorStates.setCancelText('Ləğv et');
                                errorStates.setErrorAction(true);
                                errorStates.setOkFunc(async () => {
                                    errorStates.setCommonErrorVisible(false);
                                    const resp = await http.post(
                                        APIS.payment + `/create`,
                                        paymentStates.paymentBody,
                                    );
                                    paymentStates.setPaymentUrl(resp.data.url);
                                    paymentStates.setPaymentModalVisible(true);
                                });
                                errorStates.setCancelFunc(() => {
                                    paymentStates.setPaymentModalVisible(false);
                                });
                            } else if (navState.url.includes('completed')) {
                                generalStates.navigationRef.current?.navigate('PaymentSuccess');
                            }
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default observer(PaymentModal);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: modalBackground,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        height: '94%',
        width: '100%',
        position: 'relative',
    },
    web: {
        height: '100%',
        width: '100%',
        flex: 1,
    },
    closeIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 9,
        width: 30,
        height: 30,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    loading: {
        position: 'absolute',
        width: phoneWidth - 32,
        height: '100%',
        zIndex: 10,
    },
});
