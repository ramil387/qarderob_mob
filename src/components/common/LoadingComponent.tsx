import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { primaryColor } from '@/styles/variables';

const LoadingComponent = () => {
    return (
        <View style={internalStyles.container}>
            <ActivityIndicator color={primaryColor} size='large' />
        </View>
    );
};

export default LoadingComponent;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
