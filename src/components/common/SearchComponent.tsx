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
import { fetchUserInfo } from '@/states/user/fetchUserInfo';
import errorStates from '@/states/error/errorStates';
import { Avatar } from '@rneui/themed';
import { SearchKeywordType } from '@/types/searchKeywordType';
import { SearchedUserType } from '@/types/searchedUserType';
import LoadingComponent from './LoadingComponent';

const SearchComponent = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const debuenedSearch = _.debounce((text) => {
        fetchSearchResult(text, searchStates.searchType).finally(() => {
            setIsLoading(false);
        });
    }, 500);

    useEffect(() => {
        setIsLoading(true);
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
        return () => {
            searchStates.setSearchType('product');
            searchStates.setUserResults(null);
            searchStates.setProductResults(null);
        };
    }, [searchStates.searchKey]);

    return (
        <View style={internalStyles.container}>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
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
                </>
            )}
        </View>
    );
};

export default memo(observer(SearchComponent));

const ResultComponent = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();

        const userResult = toJS(searchStates.userResults?.data);
        const productResult = toJS(searchStates.productResults?.data);
        const data: any = searchStates.searchType === 'user' ? userResult : productResult;

        const goResultPage = (item: Partial<SearchedUserType & SearchKeywordType>) => {
            if (searchStates.searchType === 'product') {
                filterStates.setQuery('q', searchStates.searchKey);
                navigate.navigate('ProductsPage');
            } else {
                fetchUserInfo(item!.id).then((resp) => {
                    if (resp?.data?.id) {
                        filterStates.resetQuery();
                        navigate.navigate('UserProductsPage');
                    } else {
                        errorStates.setErrorAction(false);
                        errorStates.setErrorHeader('İstifadəçi tapılmadı');
                        errorStates.setErrorBody(
                            'İstifadəçi silinmiş və ya istifadəçi adı dəyişdirilmiş ola bilər.',
                        );
                        errorStates.setCommonErrorVisible(true);
                    }
                });
            }
        };

        if (data?.length === 0)
            return (
                <View style={internalStyles.resultContainer}>
                    <CustomText
                        style={{
                            ...internalStyles.resultText,
                            textAlign: 'center',
                            marginTop: 24,
                            color: inactiveColor,
                        }}
                    >
                        Nəticə tapılmadı
                    </CustomText>
                </View>
            );

        return (
            <View style={internalStyles.resultContainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <ListItem item={item} goResultPage={goResultPage} />;
                    }}
                />
            </View>
        );
    }),
);
const ListItem = ({
    item,
    goResultPage,
}: {
    item: Partial<SearchedUserType & SearchKeywordType>;
    goResultPage: (item: Partial<SearchedUserType & SearchKeywordType>) => void;
}) => {
    const Users = () => {
        return (
            <View style={internalStyles.userItemContainer}>
                <Avatar rounded source={{ uri: item?.photo }} />
                <CustomText style={internalStyles.userText}>{item?.username}</CustomText>
            </View>
        );
    };
    const Products = () => {
        return <CustomText style={internalStyles.resultText}>{item.name}</CustomText>;
    };

    return (
        <TouchableOpacity
            onPress={() => {
                if (item) {
                    goResultPage(item);
                }
            }}
            style={internalStyles.resultItemContainer}
        >
            {searchStates.searchType === 'user' ? <Users /> : <Products />}
        </TouchableOpacity>
    );
};

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
    userItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    userText: {
        fontFamily: NunitoMedium,
        fontSize: 16,
    },
});
