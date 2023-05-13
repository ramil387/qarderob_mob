import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from '../ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    lightBorder,
    mainTextColor,
    primaryColor,
} from '@/styles/variables';
import { hours } from '@/resources/hours';
import CustomMainButton from '../ui/CustomMainButton';
import shopStates from '@/states/shop/shopStates';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@/icons/error/CloseIcon';

const HoursList = observer(({ type, isSelected }: { type: string; isSelected: any }) => {
    const setWorkHours = (item: any) => {
        if (type === 'start') {
            shopStates.setStartHour(item);
        } else {
            shopStates.setEndHour(item);
        }
    };

    return (
        <FlatList
            contentContainerStyle={{
                paddingHorizontal: 12,
            }}
            keyExtractor={(item) => item.toString()}
            data={hours}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    onPress={() => setWorkHours(item)}
                    style={{
                        ...internalStyles.hourItemText,
                        borderBottomWidth: index === hours.length - 1 ? 0 : 1,
                        borderBottomColor: index === hours.length - 1 ? 'transparent' : lightBorder,
                    }}
                >
                    <CustomText
                        style={{
                            color: isSelected(item),
                        }}
                    >
                        {item}
                    </CustomText>
                </TouchableOpacity>
            )}
        />
    );
});

const HoursModal = () => {
    const isSelectedStart = (item: string) => {
        return item === shopStates?.start_hour ? primaryColor : mainTextColor;
    };

    const isSelectedEnd = (item: string) => {
        return item === shopStates?.end_hour ? primaryColor : mainTextColor;
    };

    console.log('shopStates?.start_hour', shopStates?.start_hour);
    console.log('shopStates?.end_hour', shopStates?.end_hour);
    return (
        <Modal visible={shopStates.isHourModalOpen} transparent={true}>
            <View style={internalStyles.modalContainer}>
                <View style={internalStyles.hoursContainer}>
                    <CustomText style={internalStyles.headText}>İş saatı aralığı</CustomText>
                    <View style={internalStyles.hoursWrapper}>
                        <View style={internalStyles.hoursListContainer}>
                            <CustomText style={internalStyles?.listHeadText}>
                                Başlama saatı
                            </CustomText>
                            <HoursList type='start' isSelected={isSelectedStart} />
                        </View>
                        <View style={internalStyles.hoursListContainer}>
                            <CustomText style={internalStyles?.listHeadText}>
                                Qapanış saatı
                            </CustomText>

                            <HoursList type='end' isSelected={isSelectedEnd} />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            shopStates.setEndHour('');
                            shopStates.setStartHour('');
                            shopStates.setIsHourModalOpen(false);
                        }}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            zIndex: 9999,
                        }}
                    >
                        <CloseIcon style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <CustomMainButton
                    func={() => {
                        shopStates.setIsHourModalOpen(false);
                    }}
                    containerStyle={{
                        marginHorizontal: 20,
                        borderWidth: 1,
                        borderColor: '#fff',
                    }}
                    title='Saxla'
                />
            </View>
        </Modal>
    );
};

export default observer(HoursModal);

const internalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    hoursContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        minHeight: 300,
        overflow: 'hidden',
    },
    headText: {
        fontFamily: NunitoBold,
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingBottom: 8,
    },
    hoursWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 8,
        height: 280,
    },
    listHeadText: {
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: NunitoBold,
    },
    hoursListContainer: {
        flex: 1,
        width: '50%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hourItemText: {
        paddingVertical: 8,
        fontFamily: NunitoMedium,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        fontSize: 16,
    },
});
