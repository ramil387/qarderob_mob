import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NunitoBold, f8Color, phoneHeight } from '@/styles/variables';
import CustomText from '../ui/CustomText';

const SearchComponent = () => {
    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchTypeContainer}>
                <CustomText style={internalStyles.typeText}>Məhsullar</CustomText>
                <CustomText style={internalStyles.typeText}>İstifadəçilər</CustomText>
            </View>
        </View>
    );
};

export default SearchComponent;

const internalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: f8Color,
        minHeight: phoneHeight,
        width: '100%',
        zIndex: 100,
        flex: 1,
        top: 64,
    },
    searchTypeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 8,
    },
    typeText: {
        fontSize: 16,
        fontFamily: NunitoBold,
        borderBottomWidth: 1,
        width: '40%',
        paddingVertical: 8,
        textAlign: 'center',
    },
});
