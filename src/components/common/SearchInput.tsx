import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import CustomTextInput from '../ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { f5Color } from '@/styles/variables';
import { observer } from 'mobx-react-lite';
import searchStates from '@/states/search/searchStates';
import CloseIcon from '@/icons/error/CloseIcon';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import filterStates from '@/states/filter/filterStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import BackIcon from '@/icons/product/BackIcon';

const SearchInput = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();

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

        const closeWidth = useSharedValue(0);
        const inputWidth = useSharedValue(100);

        const changeElementWidth = (closeW: number, inpW: number) => {
            closeWidth.value = withTiming(closeW, { duration: 300 });
            inputWidth.value = withTiming(inpW, { duration: 300 });
        };

        const useCloseStyles = useAnimatedStyle(() => {
            return {
                width: closeWidth.value + '%',
            };
        });

        const useInputStyles = useAnimatedStyle(() => {
            return {
                width: inputWidth.value + '%',
            };
        });

        useEffect(() => {
            if (searchStates.searchContainerVisible) {
                changeElementWidth(13, 85);
            } else {
                changeElementWidth(0, 100);
            }
        }, [searchStates.searchContainerVisible]);

        return (
            <>
                <View style={internalStyles.container}>
                    <Animated.View style={[internalStyles.closeContainer, useCloseStyles]}>
                        <TouchableOpacity
                            onPress={() => {
                                searchStates.setSearchContainerVisible(false);
                            }}
                        >
                            <BackIcon />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[internalStyles.inpContainer, useInputStyles]}>
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
                            onSubmitEditing={() => {
                                filterStates.setQuery('q', searchStates.searchKey);
                                searchStates.setSearchContainerVisible(false);
                                searchStates.setSearchKey('');
                                navigate.navigate('ProductsPage');
                            }}
                            placeholder='Məhsul və ya @istifadəçi axtar...'
                        />
                    </Animated.View>
                </View>
            </>
        );
    }),
);

export default SearchInput;

const internalStyles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inpContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: '85%',
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
    closeContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
        width: '13%',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
