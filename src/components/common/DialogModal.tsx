import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import CustomText from '../ui/CustomText';
import { observer } from 'mobx-react-lite';
import WarningIcon from '@/icons/error/WarningIcon';
import { NunitoBold, inactiveColor, primaryColor } from '@/styles/variables';
import CustomMainButton from '../ui/CustomMainButton';
import CloseIcon from '@/icons/error/CloseIcon';
import generalStates from '@/states/general/generalStates';

const DialogModal = () => {
    const ActionBody = () => {
        return (
            <View style={internalStyles.actionContainer}>
                <View style={internalStyles.btnItemContainer}>
                    <CustomMainButton
                        style={{
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: primaryColor,
                        }}
                        titleStyle={{ color: primaryColor }}
                        func={generalStates.dialogCancelFunc}
                        title={generalStates.dialogCancelText}
                    />
                </View>
                <View style={internalStyles.btnItemContainer}>
                    <CustomMainButton
                        func={generalStates.dialogOkFunc}
                        title={generalStates.dialogOkText}
                    />
                </View>
            </View>
        );
    };

    return (
        <Modal animationType='fade' visible={generalStates.commonDialogVisible} transparent={true}>
            <View style={internalStyles.container}>
                <View style={internalStyles.contentContainer}>
                    <TouchableOpacity
                        onPress={generalStates.resetDialogStates}
                        style={internalStyles.closeIcon}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                    <View style={internalStyles.iconContainer}>
                        <WarningIcon />
                    </View>
                    <CustomText style={internalStyles.errorHeader}>
                        {generalStates.dialogHeader}
                    </CustomText>
                    <CustomText style={internalStyles.errorBody}>
                        {generalStates.dialogBody}
                    </CustomText>
                    <ActionBody />
                </View>
            </View>
        </Modal>
    );
};

export default memo(observer(DialogModal));

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
    },
    contentContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        padding: 30,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
    },
    iconContainer: {
        alignSelf: 'center',
    },
    errorHeader: {
        fontSize: 18,
        fontFamily: NunitoBold,
        textAlign: 'center',
        marginTop: 16,
    },
    errorBody: {
        color: inactiveColor,
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 16,
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center',
    },
    btnItemContainer: {
        width: '48%',
    },
    closeIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});
