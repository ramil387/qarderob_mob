import { StyleProp, TextProps, TextStyle } from 'react-native';
import React from 'react';
import { NunitoRegular, mainTextColor } from '@/styles/variables';
import { Text } from '@rneui/themed';
const CustomText = (props: TextProps & { style?: StyleProp<TextStyle> }) => {
    return (
        <Text
            {...props}
            style={{
                color: mainTextColor,
                fontFamily: NunitoRegular,
                ...(props.style as TextStyle),
            }}
        >
            {props.children}
        </Text>
    );
};

export default CustomText;
