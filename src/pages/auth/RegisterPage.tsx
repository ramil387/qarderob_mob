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
import { website } from '@/constants';
import PhoneInput from '@/components/common/PhoneInput';

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
    const [phone, setPhone] = React.useState<string>('');

    const showPassword = () => {
        setHide(!hide);
    };

    const goLoginPage = () => {
        navigate.navigate('LoginPage');
    };

    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.welcomeText}>Qarderoba xoş gəldiniz!</CustomText>
            <CustomText style={internalStyles.continueText}>Davam etmək üçün daxil olun</CustomText>
            <View style={{ marginTop: 16 }}>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput placeholder='Ad / soyad' />
                </View>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput placeholder='E-mail' />
                </View>
                <View style={{ ...internalStyles.inputContainer, paddingLeft: 0 }}>
                    <PhoneInput
                        blur={() => {
                            // if (!phone) {
                            //     generalStates.setErrors({ ...generalStates.errors, phone: 'Telefon nömrəsi daxil edin' });
                            // } else if (!validator.isMobilePhone(phone)) {
                            //     generalStates.setErrors({ ...generalStates.errors, phone: 'Telefon nömrəsi düzgün deyil' });
                            // } else {
                            //     generalStates.setErrors({ ...generalStates.errors, phone: '' });
                            // }
                        }}
                        setPhone={setPhone}
                        phone={phone}
                    />
                </View>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        secureTextEntry={hide}
                        icon={<SuffixIcon showPassword={showPassword} hide={hide} />}
                        placeholder='Şifrə'
                    />
                </View>
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
                <CustomMainButton func={() => {}} title='Daxil ol' />
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
});
