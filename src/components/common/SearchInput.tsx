import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import CustomTextInput from '../ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { f5Color } from '@/styles/variables';
import { observer } from 'mobx-react-lite';
import searchStates from '@/states/search/searchStates';
import CloseIcon from '@/icons/error/CloseIcon';

const SearchInput = memo(
    observer(() => {
        const Prefix = () => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        console.log('sala,');
                        searchStates.setSearchContainerVisible(true);
                        searchStates.setSearchKey('');
                    }}
                    style={{
                        ...internalStyles.prefixIcon,
                    }}
                >
                    <SearchIcon />
                </TouchableOpacity>
            );
        };
        const Suffix = () => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        searchStates.setSearchKey('');
                        searchStates.setSearchContainerVisible(false);
                    }}
                    style={{ ...internalStyles.suffix }}
                >
                    <CloseIcon />
                </TouchableOpacity>
            );
        };

        return (
            <>
                <View style={internalStyles.container}>
                    <CustomTextInput
                        value={searchStates.searchKey}
                        onPressIn={() => searchStates.setSearchContainerVisible(true)}
                        onChangeText={(text) => searchStates.setSearchKey(text)}
                        style={internalStyles.inputStyle}
                        icon={
                            <>
                                <Prefix />
                                {searchStates.searchKey.length > 0 && <Suffix />}
                            </>
                        }
                        placeholder='Məhsul və ya @istifadəçi axtar...'
                    />
                </View>
            </>
        );
    }),
);

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
    suffix: {
        right: 16,
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
});
