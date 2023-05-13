import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import profileStates from '@/states/profile/profileStates';
import CustomText from '@/components/ui/CustomText';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { NunitoMedium, f5Color } from '@/styles/variables';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';
import OutlineRadioButton from '@/icons/product/OutlineRadioButton';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { observer } from 'mobx-react-lite';
import validator from 'validator';
import PhoneInput from '@/components/common/PhoneInput';
import generalStates from '@/states/general/generalStates';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const ContactPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [full_name, setFullname] = React.useState<string>(profileStates.user?.full_name || '');
    const [email, setEmail] = React.useState<string>(profileStates.user?.email || '');
    const [phone, setPhone] = React.useState<string>(
        '+994' + profileStates.user?.phone?.slice(1) || '',
    );
    const [subject, setSubject] = React.useState<string>('0');
    const [message, setMessage] = React.useState<string>('');

    const [errors, setErrors] = React.useState<any>({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const fields = [
        {
            label: 'Ad Soyad',
            value: full_name,
            onChangeText: setFullname,
            key: 'full_name',
            blur: () => {
                if (!full_name) {
                    setErrors({ ...errors, full_name: 'Ad Soyad daxil edin' });
                } // 2 word and at least 3 letters
                else if (!validator.isLength(full_name, { min: 3, max: 30 })) {
                    setErrors({ ...errors, fullname: 'Ad Soyad 3-30 arası hərf daxil edin' });
                } else if (!validator.isAlpha(full_name.replace(/\s/g, ''))) {
                    setErrors({
                        ...errors,
                        full_name: 'Ad Soyad yalnız hərflərdən ibarət olmalıdır',
                    });
                } else {
                    setErrors({ ...errors, full_name: '' });
                }
            },
            error: () => <CustomText style={{ color: 'red' }}>{errors?.full_name}</CustomText>,
        },
        {
            label: 'Email',
            value: email,
            onChangeText: setEmail,
            key: 'email',
            blur: () => {
                if (!email) {
                    setErrors({ ...errors, email: 'Email daxil edin' });
                } else if (!validator.isEmail(email)) {
                    setErrors({ ...errors, email: 'Email düzgün deyil' });
                } else {
                    setErrors({ ...errors, email: '' });
                }
            },
            error: () => <CustomText style={{ color: 'red' }}>{errors?.email}</CustomText>,
        },
        {
            label: 'Telefon',
            value: phone,
            key: 'phone',
            blur: () => {
                if (!phone) {
                    setErrors({ ...errors, phone: 'Telefon daxil edin' });
                } else if (!validator.isMobilePhone(phone)) {
                    setErrors({ ...errors, phone: 'Telefon düzgün deyil' });
                } else {
                    setErrors({ ...errors, phone: '' });
                }
            },
            error: () => <CustomText style={{ color: 'red' }}>{errors?.phone}</CustomText>,
        },
        {
            label: 'Mövzu',
            value: subject,
            onChangeText: setSubject,
            key: 'subject',
            error: () => <CustomText style={{ color: 'red' }}></CustomText>,
        },
        {
            label: 'Mesaj',
            value: message,
            onChangeText: setMessage,
            key: 'message',
            blur: () => {
                if (!message) {
                    setErrors({ ...errors, message: 'Mesaj daxil edin' });
                } else if (!validator.isLength(message, { min: 10, max: 500 })) {
                    setErrors({ ...errors, message: 'Mesaj 10-500 arası simvol daxil edin' });
                } else {
                    setErrors({ ...errors, message: '' });
                }
            },
            error: () => <CustomText style={{ color: 'red' }}>{errors?.message}</CustomText>,
        },
    ];

    const sendMessage = async () => {
        const body = {
            full_name: full_name,
            email,
            phone,
            subject,
            message,
        };
        console.log(errors);
        // check exsit errors
        if (errors.full_name || errors.email || errors.phone || errors.subject || errors.message) {
            return;
        }
        const resp = await http.post(APIS.contact, body);
        if (resp.status === 201) {
            generalStates.setDialogAction(true);
            generalStates.setCommonDialogVisible(true);
            generalStates.setDialogHeader(
                `${subject === '0' ? 'Şikayətiniz' : 'Təklifiniz'} göndərildi`,
            );
            generalStates.setDialogBody(`
         Ən qısa zamanda sizinlə əlaqə saxlanılacaq.
        `);
            generalStates.setDialogOkText('Əsas səhifə');
            generalStates.setDialogCancelText('Bağla');
            generalStates.setOkFunc(() => {
                generalStates.setCommonDialogVisible(false);
                navigate.navigate('HomePage');
            });
            generalStates.setCancelFunc(() => {
                generalStates.setCommonDialogVisible(false);
                navigate.goBack();
            });
        } else [navigate.goBack()];
    };

    useEffect(() => {
        generalStates.setBottomSheetVisible(false);
    }, []);

    return (
        <View style={internalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {fields.map((field, index) => {
                    return (
                        <View style={internalStyles.itemContainer} key={field?.key}>
                            <CustomText style={internalStyles.fieldText}>{field.label}:</CustomText>

                            {field?.key === 'subject' ? (
                                <View style={internalStyles.subjectContainer}>
                                    <TouchableOpacity
                                        onPress={() => setSubject('0')}
                                        style={internalStyles.subjectItemContainer}
                                    >
                                        {subject === '0' ? (
                                            <FillRadioButtonIcon />
                                        ) : (
                                            <OutlineRadioButton />
                                        )}
                                        <CustomText style={internalStyles.subjectText}>
                                            Şikayət
                                        </CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setSubject('1')}
                                        style={internalStyles.subjectItemContainer}
                                    >
                                        {subject === '1' ? (
                                            <FillRadioButtonIcon />
                                        ) : (
                                            <OutlineRadioButton />
                                        )}
                                        <CustomText style={internalStyles.subjectText}>
                                            Təklif
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            ) : field?.key === 'phone' ? (
                                <View style={internalStyles.inpContainer}>
                                    <PhoneInput
                                        onBlur={field?.blur}
                                        phone={phone}
                                        setPhone={setPhone}
                                    />
                                </View>
                            ) : (
                                <View style={internalStyles.inpContainer}>
                                    <CustomTextInput
                                        onBlur={field.blur}
                                        style={{
                                            ...internalStyles.inp,
                                            height: field?.key === 'message' ? 100 : 48,
                                        }}
                                        placeholder={field?.label}
                                        value={field.value}
                                        onChangeText={field.onChangeText}
                                        multiline={field?.key === 'message'}
                                        textAlignVertical={
                                            field?.key === 'message' ? 'top' : 'center'
                                        }
                                        maxLength={field?.key === 'phone' ? 13 : undefined}
                                    />
                                </View>
                            )}
                            {errors[field?.key]?.length > 0 && field?.error()}
                        </View>
                    );
                })}
                <CustomMainButton func={sendMessage} title='Göndər' />
            </ScrollView>
        </View>
    );
};

export default observer(ContactPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        paddingVertical: 16,
    },
    fieldText: {
        marginBottom: 4,
        fontSize: 16,
        fontFamily: NunitoMedium,
    },
    inpContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    inp: {
        paddingHorizontal: 16,
    },
    subjectContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    subjectItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    subjectText: {
        fontFamily: NunitoMedium,
        fontSize: 16,
    },
});
