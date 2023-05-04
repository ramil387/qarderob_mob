import React, { JSXElementConstructor, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import { primaryColor, NunitoMedium, size18 } from '@/styles/variables';

type CustomMainButtonProps = {
    title: string | ReactElement<{}, string | JSXElementConstructor<any>> | undefined;
    func: () => void;
    style?: object;
    icon?: React.ReactNode;
    titleStyle?: object;
    disabled?: boolean;
    containerStyle?: object;
};

const CustomMainButton = ({
    title,
    func,
    style,
    icon,
    titleStyle,
    disabled,
    containerStyle,
}: CustomMainButtonProps) => {
    return (
        <View>
            <Button
                disabled={disabled}
                buttonStyle={{ ...internalStyle.button, ...style }}
                title={title}
                onPress={func}
                titleStyle={{ ...internalStyle.buttonTitle, ...titleStyle }}
                containerStyle={{ ...internalStyle.container, ...containerStyle }}
            />
            {icon}
        </View>
    );
};

export default CustomMainButton;

const internalStyle = StyleSheet.create({
    container: {
        height: 48,
        borderRadius: 8,
    },
    button: {
        backgroundColor: primaryColor,
        height: 48,
        borderRadius: 8,
    },
    buttonTitle: {
        fontSize: size18,
        fontFamily: NunitoMedium,
    },
});
