import { View, TextInput, TextInputProps } from 'react-native';
import React, { forwardRef } from 'react';
import { primaryColor } from '@/styles/variables';

interface CustomTextInputProps extends TextInputProps {
    indicator?: React.ReactNode;
    icon?: React.ReactNode;
    error?: React.ReactNode;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>((props, ref) => {
    return (
        <View style={{ position: 'relative' }}>
            {props?.indicator}
            <TextInput
                selectionColor={primaryColor}
                {...props}
                style={{ ...(props.style as TextInputProps) }}
                ref={ref}
            />
            {props?.icon}
            {props?.error}
        </View>
    );
});

export default CustomTextInput;
