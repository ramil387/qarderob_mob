import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomText from '@/components/ui/CustomText';
import validator from 'validator';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { NunitoSemiBold, f5Color } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import profileStates from '@/states/profile/profileStates';
import generalStates from '@/states/general/generalStates';
import EyeIcon from '@/icons/user/EyeIcon';
import { TouchableOpacity } from 'react-native';
import ClosedEyeIcon from '@/icons/user/ClosedEyeIcon';
import { ActivityIndicator } from 'react-native';

type SuffixIconProps = {
    hide: () => void;
    isHide: boolean;
};

const SuffixIcon = ({ hide, isHide }: SuffixIconProps) => {
    return (
        <View style={internalStyles.suffix}>
            {!isHide ? (
                <TouchableOpacity onPress={hide}>
                    <ClosedEyeIcon />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={hide}>
                    <EyeIcon />
                </TouchableOpacity>
            )}
        </View>
    );
};

const ChangePassPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState<string>('');

    const [passwordError, setPasswordError] = React.useState<string>('');
    const [newPasswordError, setNewPasswordError] = React.useState<string>('');
    const [newPasswordConfirmError, setNewPasswordConfirmError] = React.useState<string>('');

    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState<boolean>(false);
    const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] =
        React.useState<boolean>(false);

    const isValidate = () => {
        console.log('bira gririr');
        if (!password) {
            setPasswordError('Şifrəni daxil edin');
            return;
        } else if (!validator.isLength(password, { min: 6 })) {
            setPasswordError('Şifrə ən azı 6 simvoldan ibarət olmalıdır');
            console.log('bira gririr 1');

            return;
        } else {
            setPasswordError('');
        }

        if (!newPassword) {
            setNewPasswordError('Şifrəni daxil edin');
            return;
        } else if (!validator.isLength(password, { min: 6 })) {
            setNewPasswordError('Şifrə ən azı 6 simvoldan ibarət olmalıdır');
            return;
        } else {
            setNewPasswordError('');
        }

        if (!newPasswordConfirm) {
            setNewPasswordConfirmError('Şifrəni daxil edin');
            return;
        } else if (!validator.isLength(password, { min: 6 })) {
            setNewPasswordConfirmError('Şifrə ən azı 6 simvoldan ibarət olmalıdır');
            return;
        } else if (newPasswordConfirm !== newPassword) {
            setNewPasswordConfirmError('Şifrənin təsdiqi yanlışdır');
            return;
        } else {
            setNewPasswordConfirmError('');
        }

        return true;
    };

    const changePassword = async () => {
        try {
            if (!isValidate()) return;
            setIsLoading(true);
            const body = {
                password,
                email: profileStates.user?.email,
                new_password: newPassword,
            };
            const resp = await http.patch(APIS.forgotPassword, body);
            if (resp.status === 200) {
                generalStates.setDialogAction(false);
                generalStates.setCommonDialogVisible(true);
                generalStates.setDialogHeader('Şifrəniz uğurla dəyişdirildi');
                navigate.goBack();
                setNewPassword('');
                setPassword('');
                setNewPasswordConfirm('');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.itemContainer}>
                <CustomText style={internalStyles.label}>Cari şifrə</CustomText>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        secureTextEntry={!isPasswordVisible}
                        icon={
                            <SuffixIcon
                                hide={() => setIsPasswordVisible(!isPasswordVisible)}
                                isHide={isPasswordVisible}
                            />
                        }
                        style={{ paddingHorizontal: 16 }}
                        placeholder='Cari şifrəni daxil edin'
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <CustomText
                    style={{
                        display: passwordError.length > 0 ? 'flex' : 'none',
                        color: 'red',
                        paddingTop: 4,
                    }}
                >
                    {passwordError}
                </CustomText>
            </View>
            <View style={internalStyles.itemContainer}>
                <CustomText style={internalStyles.label}>Yeni şifrə</CustomText>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        secureTextEntry={!isNewPasswordVisible}
                        icon={
                            <SuffixIcon
                                hide={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                                isHide={isNewPasswordVisible}
                            />
                        }
                        placeholder='Yeni şifrəni daxil edin'
                        style={{ paddingHorizontal: 16 }}
                        onChangeText={(text) => setNewPassword(text)}
                    />
                </View>
                <CustomText
                    style={{
                        display: newPasswordError.length > 0 ? 'flex' : 'none',
                        color: 'red',
                        paddingTop: 4,
                    }}
                >
                    {newPasswordError}
                </CustomText>
            </View>
            <View style={internalStyles.itemContainer}>
                <CustomText style={internalStyles.label}>Yeni şifrəni təsdiq edin</CustomText>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        secureTextEntry={!isNewPasswordConfirmVisible}
                        icon={
                            <SuffixIcon
                                hide={() =>
                                    setIsNewPasswordConfirmVisible(!isNewPasswordConfirmVisible)
                                }
                                isHide={isNewPasswordConfirmVisible}
                            />
                        }
                        placeholder='Yeni şifrəni təsdiq edin'
                        style={{ paddingHorizontal: 16 }}
                        onChangeText={(text) => setNewPasswordConfirm(text)}
                    />
                </View>
                <CustomText
                    style={{
                        display: newPasswordConfirmError.length > 0 ? 'flex' : 'none',
                        color: 'red',
                        paddingTop: 4,
                    }}
                >
                    {newPasswordConfirmError}
                </CustomText>
            </View>
            <View style={internalStyles.submitBtn}>
                <CustomMainButton
                    disabled={isLoading}
                    func={changePassword}
                    title={isLoading ? <ActivityIndicator color='#fff' /> : 'Şifrəni yenilə'}
                />
            </View>
        </View>
    );
};

export default ChangePassPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        paddingVertical: 16,
    },
    label: {
        fontSize: 16,
        fontFamily: NunitoSemiBold,
        marginBottom: 4,
    },
    inputContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    submitBtn: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignSelf: 'center',
    },
    suffix: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
    },
});
