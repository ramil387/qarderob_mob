import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, { memo, useEffect } from 'react';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    f8Color,
    inactiveColor,
    mainTextColor,
    phoneHeight,
    primaryColor,
} from '@/styles/variables';
import CustomText from '../ui/CustomText';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import searchStates from '@/states/search/searchStates';
import _ from 'lodash';
import { fetchSearchResult } from '@/states/search/fetchSearchResult';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import filterStates from '@/states/filter/filterStates';

const SearchComponent = () => {
    const debuenedSearch = _.debounce((text) => {
        fetchSearchResult(text, searchStates.searchType);
    }, 500);

    useEffect(() => {
        debuenedSearch(searchStates.searchKey);
    }, [searchStates.searchKey]);

    const selectedStyle = (type: 'user' | 'product') =>
        type === searchStates.searchType ? primaryColor : 'transparent';

    useEffect(() => {
        if (searchStates.searchKey.charAt(0) === '@') {
            searchStates.setSearchType('user');
        } else {
            searchStates.setSearchType('product');
        }
    }, [searchStates.searchKey]);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchTypeContainer}>
                <TouchableOpacity
                    style={{ width: '40%' }}
                    onPress={() => searchStates.setSearchType('product')}
                >
                    <CustomText
                        style={{
                            ...internalStyles.typeText,
                            borderBottomColor: selectedStyle('product'),
                            color:
                                selectedStyle('product') === 'transparent'
                                    ? inactiveColor
                                    : primaryColor,
                        }}
                    >
                        Məhsullar
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => searchStates.setSearchType('user')}
                    style={{ width: '40%' }}
                >
                    <CustomText
                        style={{
                            ...internalStyles.typeText,
                            borderBottomColor: selectedStyle('user'),
                            color:
                                selectedStyle('user') === 'transparent'
                                    ? inactiveColor
                                    : primaryColor,
                        }}
                    >
                        İstifadəçilər
                    </CustomText>
                </TouchableOpacity>
            </View>
            <ResultComponent />
        </View>
    );
};

export default memo(observer(SearchComponent));

const ResultComponent = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();
        const userResult = toJS(searchStates.userResults);
        const productResult = toJS(searchStates.productResults?.data);
        const goProducts = () => {
            filterStates.setQuery('q', searchStates.searchKey);
            navigate.navigate('ProductsPage');
        };
        return (
            <View style={internalStyles.resultContainer}>
                <FlatList
                    data={productResult}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={goProducts}
                                style={internalStyles.resultItemContainer}
                            >
                                <CustomText style={internalStyles.resultText}>
                                    {item.name}
                                </CustomText>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    }),
);
const internalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: f8Color,
        width: '100%',
        zIndex: 100,
        flex: 1,
        top: 64,
        height: '100%',
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
        paddingVertical: 8,
        textAlign: 'center',
    },
    resultContainer: {
        padding: 16,
        flex: 1,
        height: '100%',
        paddingBottom: 100,
    },
    resultItemContainer: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    resultText: {
        fontSize: 16,
        fontFamily: NunitoMedium,
    },
});
