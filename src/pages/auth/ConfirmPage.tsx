import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, primaryColor } from '@/styles/variables';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import CustomTextInput from '@/components/ui/CustomTextInput';
import validator from 'validator';
import { api, http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import profileStates from '@/states/profile/profileStates';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ConfirmPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const route: any = useRoute();
    const phone = route?.params?.phone;
    const email = route?.params?.email;
    const [inp1, setInp1] = React.useState<string>('');
    const [inp2, setInp2] = React.useState<string>('');
    const [inp3, setInp3] = React.useState<string>('');
    const [inp4, setInp4] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const inpRef1 = React.useRef<any>(null);
    const inpRef2 = React.useRef<any>(null);
    const inpRef3 = React.useRef<any>(null);
    const inpRef4 = React.useRef<any>(null);

    const fields = [1, 2, 3, 4];

    const confirm = async (confirm_number: string) => {
        console.log(confirm_number);
        try {
            setIsLoading(false);
            const body = {
                email: email.trim().toLowerCase(),
                confirm_number: parseInt(confirm_number),
            };
            const resp = await http.post(`${APIS.auth}/confirm`, body);
            if (resp.status === 200 && resp?.data?.user) {
                profileStates.setUser(resp?.data?.user);
                profileStates.setToken(resp?.data?.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${resp?.data?.token}`;
                AsyncStorage.setItem('token', resp?.data?.token);
                navigate.navigate('HomePage');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(true);
        }
    };

    useEffect(() => {
        if (inp1 && inp2 && inp3 && inp4) {
            confirm(inp1 + inp2 + inp3 + inp4);
        }
    }, [inp1, inp2, inp3, inp4]);

    return (
        <View style={internalStyles.container}>
            <CustomText style={internalStyles.headText}>Şifrəni daxil edin</CustomText>
            <CustomText style={internalStyles.subText}>SMS aşağıdakı nömrəyə göndərildi</CustomText>
            <CustomText style={internalStyles.phone}>{phone}</CustomText>

            <View style={internalStyles.confirmContainer}>
                {fields.map((item, index) => {
                    return (
                        <View key={index} style={internalStyles.item}>
                            <CustomTextInput
                                editable={isLoading}
                                ref={
                                    index === 0
                                        ? inpRef1
                                        : index === 1
                                        ? inpRef2
                                        : index === 2
                                        ? inpRef3
                                        : inpRef4
                                }
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key === 'Backspace') {
                                        if (index === 0) {
                                            setInp1('');
                                        } else if (index === 1) {
                                            setInp2('');
                                            inpRef1.current.focus();
                                        } else if (index === 2) {
                                            setInp3('');
                                            inpRef2.current.focus();
                                        } else if (index === 3) {
                                            setInp4('');
                                            inpRef3.current.focus();
                                        }
                                    }
                                }}
                                onChangeText={(text) => {
                                    // if press backspace

                                    if (index === 0) {
                                        if (!validator.isNumeric(text)) return;
                                        setInp1(text);
                                        if (text.length === 1) {
                                            inpRef2.current.focus();
                                        }
                                    } else if (index === 1) {
                                        if (!validator.isNumeric(text)) return;
                                        setInp2(text);
                                        if (text.length === 1) {
                                            inpRef3.current.focus();
                                        }
                                    } else if (index === 2) {
                                        if (!validator.isNumeric(text)) return;
                                        setInp3(text);
                                        if (text.length === 1) {
                                            inpRef4.current.focus();
                                        }
                                    } else if (index === 3) {
                                        if (!validator.isNumeric(text)) return;
                                        setInp4(text);
                                    }
                                }}
                                value={
                                    index === 0
                                        ? inp1
                                        : index === 1
                                        ? inp2
                                        : index === 2
                                        ? inp3
                                        : inp4
                                }
                                keyboardType='number-pad'
                                maxLength={1}
                                style={internalStyles.inp}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ConfirmPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headText: {
        fontSize: 24,
        fontFamily: NunitoBold,
        lineHeight: 30.62,
    },
    subText: {
        fontFamily: NunitoMedium,
        marginTop: 8,
        letterSpacing: 0.8,
    },
    phone: {
        fontFamily: NunitoBold,
        marginTop: 4,
        letterSpacing: 1,
        fontSize: 16,
    },
    confirmContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 36,
        alignItems: 'center',
    },
    item: {
        width: 48,
        backgroundColor: '#F5F5F5',
        height: 48,
        borderRadius: 8,
    },
    inp: {
        textAlign: 'center',
        fontFamily: NunitoBold,
        fontSize: 18,
    },
});
