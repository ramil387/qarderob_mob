import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, f5Color, inactiveColor, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import EyeIcon from '@/icons/user/EyeIcon';
import ClosedEyeIcon from '@/icons/user/ClosedEyeIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import validator from 'validator';
import { api, http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { TextInput } from 'react-native-gesture-handler';
import profileStates from '@/states/profile/profileStates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStates from '@/states/general/generalStates';
import { observer } from 'mobx-react-lite';

const SuffixIcon = ({ hide, showPassword }: { hide: boolean; showPassword: () => void }) => {
    return (
        <TouchableOpacity onPress={showPassword} style={internalStyles.suffixIcon}>
            {hide ? <ClosedEyeIcon /> : <EyeIcon />}
        </TouchableOpacity>
    );
};

const LoginPage = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [emailValidationMessage, setEmailValidationMessage] = React.useState<string>('');
    const [passwordValidationMessage, setPasswordValidationMessage] = React.useState<string>('');
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [hide, setHide] = React.useState<boolean>(true);
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const showPassword = () => {
        setHide(!hide);
    };

    const goRegisterPage = () => {
        navigate.navigate('RegisterPage');
    };
    const goForgotPasswordPage = () => {
        navigate.navigate('ForgotPasswordPage');
    };

    const onEmailChange = (value: string) => {
        const email = value.trim().toLowerCase();
        setEmail(email);
    };
    const onEmailBlur = () => {
        if (email.length === 0) {
            setEmailValidationMessage('E-mail boş ola bilməz');
            return;
        }
        if (validator.isEmail(email) === false) {
            setEmailValidationMessage('E-mail düzgün deyil');
            return;
        }
        setEmailValidationMessage('');
    };

    const onPasswordChange = (value: string) => {
        setPassword(value);
    };

    const onPasswordBlur = () => {
        if (validator.isLength(password, { min: 6 }) === false) {
            setPasswordValidationMessage('Şifrə 6 simvoldan az ola bilməz');
            return;
        }
        setPasswordValidationMessage('');
    };

    const login = async () => {
        try {
            setIsLoading(true);
            emailRef.current?.blur();
            passwordRef.current?.blur();
            const data = {
                email: email.trim().toLowerCase(),
                password,
            };
            if (validator.isEmail(email) === false) {
                setEmailValidationMessage('Email düzgün deyil');
                return;
            }
            if (validator.isLength(password, { min: 6 }) === false) {
                setPasswordValidationMessage('Şifrə 6 simvoldan az ola bilməz');
                return;
            }
            const resp = await http.post(APIS.login, data);
            if (resp.status === 200 && resp.data.token) {
                api.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;
                profileStates.setUser(resp.data.user);
                profileStates.setToken(resp.data.token);
                AsyncStorage.setItem('token', resp.data.token);
                navigate.navigate('HomePage');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.welcomeText}>Qarderoba xoş gəldiniz!</CustomText>
            <CustomText style={internalStyles.continueText}>Davam etmək üçün daxil olun</CustomText>
            <View style={{ marginTop: 16 }}>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        ref={emailRef}
                        onEndEditing={onEmailBlur}
                        autoCapitalize='none'
                        onChangeText={onEmailChange}
                        placeholder='E-mail'
                        value={email}
                    />
                </View>
                <CustomText
                    style={{
                        ...internalStyles.errorText,
                        display: emailValidationMessage.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {emailValidationMessage}
                </CustomText>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        ref={passwordRef}
                        onEndEditing={onPasswordBlur}
                        onChangeText={onPasswordChange}
                        secureTextEntry={hide}
                        icon={<SuffixIcon showPassword={showPassword} hide={hide} />}
                        placeholder='Şifrə'
                    />
                </View>
                <CustomText
                    style={{
                        ...internalStyles.errorText,
                        display: passwordValidationMessage.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {passwordValidationMessage}
                </CustomText>
            </View>

            <TouchableOpacity onPress={goForgotPasswordPage}>
                <CustomText style={internalStyles.forgotText}>Şifrəni unutmusunuz?</CustomText>
            </TouchableOpacity>
            <View style={internalStyles.btnContainer}>
                <CustomMainButton
                    func={login}
                    title={isLoading ? <ActivityIndicator color='#fff' /> : 'Daxil ol'}
                />
            </View>
            <View
                style={{
                    ...internalStyles.authFooter,
                    display: generalStates.authFooterVisible ? 'flex' : 'none',
                }}
            >
                <CustomText>
                    Hesabınız yoxdur?{' '}
                    <CustomText onPress={goRegisterPage} style={{ fontFamily: NunitoBold }}>
                        Qeydiyyatdan keçin
                    </CustomText>
                </CustomText>
            </View>
        </View>
    );
};

export default observer(LoginPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    logoContainer: {
        alignSelf: 'center',
    },
    welcomeText: {
        marginTop: 24,
        fontSize: 34,
        fontFamily: NunitoBold,
        lineHeight: 41,
        width: 227,
    },
    continueText: {
        marginTop: 8,
        fontSize: 17,
        color: inactiveColor,
    },
    inputContainer: {
        backgroundColor: f5Color,
        marginVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    btnContainer: {
        marginTop: 24,
    },
    forgotText: {
        fontFamily: NunitoMedium,
    },
    suffixIcon: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    },
    authFooter: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        fontFamily: NunitoMedium,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        bottom: 6,
    },
});
