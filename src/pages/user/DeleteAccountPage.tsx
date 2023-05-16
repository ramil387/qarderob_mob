import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { NunitoBold, NunitoMedium, e5Color } from '@/styles/variables';
import { api, http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import profileStates from '@/states/profile/profileStates';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStates from '@/states/general/generalStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const DeleteAccountPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const [isLoading, setIsLoading] = React.useState(false);
    const askDeleteAccount = () => {
        generalStates.setCommonDialogVisible(true);
        generalStates.setDialogOkText('Bəli');
        generalStates.setDialogCancelText('Xeyr');
        generalStates.setDialogHeader('Diqqət');
        generalStates.setDialogBody('Hesabınızı silmək istədiyinizə əminsiniz?');
        generalStates.setOkFunc(deleteAccount);
        generalStates.setDialogAction(true);
        generalStates.setDialogType('warning');
        generalStates.setCancelFunc(() => {
            generalStates.setCommonDialogVisible(false);
        });
    };
    const deleteAccount = async () => {
        try {
            setIsLoading(true);
            const resp = await http.delete(`${APIS.auth}/delete-user/${profileStates.user?.id}`);
            if (resp?.status === 200) {
                AsyncStorage.removeItem('token');
                profileStates.resetUserInfo();
                api.defaults.headers.common['Authorization'] = '';
                generalStates.setCommonDialogVisible(false);
                navigate.goBack();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.headText}>
                Hesabınızı silməklə sizə məxsus aşağıdakı məlumatlar silinəcək:
            </CustomText>
            <View style={internalStyles.itemContainer}>
                <CustomText style={internalStyles.itemText}>- Şəxsi məlumatlarınız</CustomText>
                <CustomText style={internalStyles.itemText}>- Elanlar və mesajlar</CustomText>
                <CustomText style={internalStyles.itemText}>
                    - Mağaza profili və elanları (əgər mövcuddursa)
                </CustomText>
            </View>
            <View style={{ marginTop: 36 }}>
                <CustomMainButton
                    func={askDeleteAccount}
                    title={isLoading ? <ActivityIndicator color={'white'} /> : 'Hesabı sil'}
                />
            </View>
        </View>
    );
};

export default DeleteAccountPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headText: {
        fontFamily: NunitoBold,
        fontSize: 18,
    },
    itemContainer: {
        marginVertical: 16,
    },
    itemText: {
        fontSize: 16,
        fontFamily: NunitoMedium,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
});
