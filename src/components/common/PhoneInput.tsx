import { View } from 'react-native';
import React from 'react';
import validator from 'validator';
import CustomTextInput from '../ui/CustomTextInput';

const PhoneInput = ({
    phone,
    setPhone,
    onBlur,
}: {
    phone: string;
    setPhone: (phone: string) => void;
    onBlur?: () => void;
}) => {
    const MAX_PHONE_LENGTH = 13; // Maximum length of phone number, including prefix
    const onTextChange = (text: string) => {
        // If input is not a number, or exceeds maximum length, exit function
        if (!validator.isNumeric(text) || text.length > MAX_PHONE_LENGTH) return;

        // If input equals prefix, or starts with prefix followed by non-zero digit, set phone state to input
        if (text === '+994' || /^(\+994)(?!0)\d+$/.test(text)) {
            setPhone(text);
        }
        // If input starts with prefix followed by zero, set phone state to prefix + first non-zero digit of input
        else if (/^(\+994)0\d+$/.test(text)) {
            setPhone('+994' + text.slice(4).replace(/^0+/, ''));
        }
    };
    return (
        <View>
            <CustomTextInput
                onBlur={onBlur}
                style={{ paddingLeft: 16 }}
                value={phone}
                onChangeText={onTextChange}
                placeholder='Telefon'
            />
        </View>
    );
};

export default PhoneInput;
