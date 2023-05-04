import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomTextInput from '../ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { f5Color } from '@/styles/variables';

const SearchInput = () => {
    const Prefix = () => {
        return (
            <View style={{ ...internalStyles.prefixIcon }}>
                <SearchIcon />
            </View>
        );
    };

    return (
        <View style={internalStyles.container}>
            <CustomTextInput
                style={internalStyles.inputStyle}
                icon={<Prefix />}
                placeholder='Məhsul və ya @istifadəçi axtar...'
            />
        </View>
    );
};

export default SearchInput;

const internalStyles = StyleSheet.create({
    container: {
        backgroundColor: f5Color,
        borderRadius: 8,
        position: 'relative',
    },
    inputStyle: {
        paddingLeft: 48,
    },
    prefixIcon: {
        left: 16,
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
});
