import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, f5Color, inactiveColor, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import EyeIcon from '@/icons/user/EyeIcon';
import ClosedEyeIcon from '@/icons/user/ClosedEyeIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import validator from 'validator';
import generalStates from '@/states/general/generalStates';
import { observer } from 'mobx-react-lite';
import { APIS, website } from '@/constants';
import PhoneInput from '@/components/common/PhoneInput';
import { http } from '@/services/httpMethods';
import { ActivityIndicator } from 'react-native';

const SuffixIcon = ({ hide, showPassword }: { hide: boolean; showPassword: () => void }) => {
    return (
        <TouchableOpacity onPress={showPassword} style={internalStyles.suffixIcon}>
            {hide ? <ClosedEyeIcon /> : <EyeIcon />}
        </TouchableOpacity>
    );
};

const RegisterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [hide, setHide] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [phone, setPhone] = React.useState<string>('+994');
    const [fullName, setFullName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [fullNameError, setFullNameError] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState<string>('');
    const [passwordError, setPasswordError] = React.useState<string>('');
    const [phoneError, setPhoneError] = React.useState<string>('');

    const showPassword = () => {
        setHide(!hide);
    };

    const goLoginPage = () => {
        navigate.navigate('LoginPage');
    };

    const register = async () => {
        try {
            setIsLoading(true);
            const body = {
                full_name: fullName,
                email: email?.trim()?.toLowerCase(),
                password: password,
                phone: phone,
            };
            console.log(body);
            if (!body?.full_name) {
                setFullNameError('Ad / soyad daxil edin');
            } else if (!validator.isLength(body?.full_name, { min: 6, max: 255 })) {
                setFullNameError('Ad / soyad ən az 6 hərf olmalıdır');
                return false;
            } else {
                setFullNameError('');
            }
            if (!body?.email) {
                setEmailError('E-mail daxil edin');
                return false;
            } else if (!validator.isEmail(body?.email)) {
                setEmailError('E-mail düzgün deyil');
                return false;
            } else {
                setEmailError('');
            }

            if (!body?.phone) {
                setPhoneError('Telefon nömrəsi daxil edin');
                return false;
            } else if (!validator.isMobilePhone(body?.phone)) {
                setPhoneError('Telefon nömrəsi düzgün deyil');
                return false;
            } else {
                setPhoneError('');
            }

            if (!body?.password) {
                setPasswordError('Şifrə daxil edin');
                return false;
            } else if (!validator.isLength(body?.password, { min: 6, max: 255 })) {
                setPasswordError('Şifrə ən az 6 hərf olmalıdır');
                return false;
            } else {
                setPasswordError('');
            }
            body['phone'] = '0' + body?.phone.slice(4);
            const resp = await http.post(`${APIS.auth}/register`, body);
            if (resp.status === 201) {
                navigate.navigate('ConfirmPage', { phone: phone, email });
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
                        onChangeText={(text) => setFullName(text)}
                        placeholder='Ad / soyad'
                    />
                </View>
                <CustomText
                    style={{ ...internalStyles.error, display: fullNameError ? 'flex' : 'none' }}
                >
                    {fullNameError}
                </CustomText>

                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                        placeholder='E-mail'
                    />
                </View>
                <CustomText
                    style={{
                        ...internalStyles.error,
                        display: emailError.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {emailError}
                </CustomText>

                <View style={{ ...internalStyles.inputContainer, paddingLeft: 0 }}>
                    <PhoneInput setPhone={setPhone} phone={phone} />
                </View>
                <CustomText
                    style={{
                        ...internalStyles.error,
                        display: phoneError.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {phoneError}
                </CustomText>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={hide}
                        icon={<SuffixIcon showPassword={showPassword} hide={hide} />}
                        placeholder='Şifrə'
                    />
                </View>
                <CustomText
                    style={{
                        ...internalStyles.error,
                        display: passwordError.length > 0 ? 'flex' : 'none',
                    }}
                >
                    {passwordError}
                </CustomText>
            </View>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`${website}/istifadeci-razilasmasi`);
                }}
            >
                <CustomText>
                    Qeydiyyatdan keçməklə{' '}
                    <CustomText style={{ color: primaryColor }}>Qarderob.az</CustomText> - ın
                    <CustomText style={{ color: primaryColor }}>
                        istifadəçi razılaşması və məxfilik siyasəti
                    </CustomText>{' '}
                    ilə razlaşmış olursunuz.
                </CustomText>
            </TouchableOpacity>
            <View style={internalStyles.btnContainer}>
                <CustomMainButton
                    disabled={isLoading}
                    func={register}
                    title={isLoading ? <ActivityIndicator color={primaryColor} /> : 'Daxil ol'}
                />
            </View>
            <View
                style={{
                    ...internalStyles.authFooter,
                    display: !generalStates.authFooterVisible ? 'none' : 'flex',
                }}
            >
                <CustomText>
                    Hesabınız mövcuddur?{' '}
                    <CustomText onPress={goLoginPage} style={{ fontFamily: NunitoBold }}>
                        Daxil olun
                    </CustomText>
                </CustomText>
            </View>
        </View>
    );
};

export default observer(RegisterPage);

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
    error: {
        color: 'red',
        bottom: 8,
    },
});
