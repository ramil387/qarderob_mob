import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, f5Color, inactiveColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import EyeIcon from '@/icons/user/EyeIcon';
import ClosedEyeIcon from '@/icons/user/ClosedEyeIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const SuffixIcon = ({ hide, showPassword }: { hide: boolean; showPassword: () => void }) => {
    return (
        <TouchableOpacity onPress={showPassword} style={internalStyles.suffixIcon}>
            {hide ? <ClosedEyeIcon /> : <EyeIcon />}
        </TouchableOpacity>
    );
};

const LoginPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [hide, setHide] = React.useState<boolean>(true);
    const showPassword = () => {
        setHide(!hide);
    };

    const goRegisterPage = () => {
        navigate.navigate('RegisterPage');
    };
    const goForgotPasswordPage = () => {
        navigate.navigate('ForgotPasswordPage');
    };

    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.welcomeText}>Qarderoba xoş gəldiniz!</CustomText>
            <CustomText style={internalStyles.continueText}>Davam etmək üçün daxil olun</CustomText>
            <View style={{ marginTop: 16 }}>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput placeholder='E-mail' />
                </View>
                <View style={internalStyles.inputContainer}>
                    <CustomTextInput
                        secureTextEntry={hide}
                        icon={<SuffixIcon showPassword={showPassword} hide={hide} />}
                        placeholder='Şifrə'
                    />
                </View>
            </View>
            <TouchableOpacity onPress={goForgotPasswordPage}>
                <CustomText style={internalStyles.forgotText}>Şifrəni unutmusunuz?</CustomText>
            </TouchableOpacity>
            <View style={internalStyles.btnContainer}>
                <CustomMainButton func={() => {}} title='Daxil ol' />
            </View>
            <View style={internalStyles.authFooter}>
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

export default LoginPage;

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
        paddingLeft: 16,
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
