import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { NunitoBold, NunitoMedium, e5Color, f5Color, primaryColor } from '@/styles/variables';
import SearchIcon from '@/icons/home/SearchIcon';
import CustomText from '@/components/ui/CustomText';
import FilterHorizantalIcon from '@/icons/product/FilterHorizantalIcon';
import SortArrowsIcon from '@/icons/product/SortArrowsIcon';
import { fetchProducts } from '@/states/product/fetchProducts';
import productStates from '@/states/product/productStates';
import Product from '@/components/products/Product';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import generalStates from '@/states/general/generalStates';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIconContainer}>
            <SearchIcon />
        </View>
    );
};

const TopContainer = memo(() => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goFilterPage = () => {
        navigate.navigate('FilterPage');
    };
    return (
        <React.Fragment>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    icon={<PrefixIcon />}
                    placeholder='Məhsul və ya @istifadəçi axtar'
                    style={{ paddingLeft: 48 }}
                />
            </View>
            <View style={internalStyles.filterContainer}>
                <TouchableOpacity onPress={goFilterPage} style={internalStyles.filterItemContainer}>
                    <FilterHorizantalIcon />
                    <CustomText style={internalStyles.filterText}>Filtr</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={internalStyles.filterItemContainer}
                    onPress={() => generalStates.setBottomSheetVisible(true)}
                >
                    <SortArrowsIcon />
                    <CustomText style={internalStyles.filterText}>Sıralama</CustomText>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
});

const ProductsPage = () => {
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    useEffect(() => {
        fetchProducts(1).then((resp) => {
            productStates.setProducts(resp);
        });
        return () => {
            generalStates.setBottomSheetVisible(false);
        };
    }, []);

    const loadMore = () => {
        // working only one time

        if (productStates.products?.has_next_page && !isLoadingMore) {
            setIsLoadingMore(true);
            fetchProducts(productStates.products?.next_page).then((resp) => {
                // spread operator is not working here
                productStates.setProducts({
                    data: [...(productStates?.products?.data || []), ...resp.data],
                    has_next_page: resp.has_next_page,
                    next_page: resp.next_page,
                    count: resp.count,
                });

                setIsLoadingMore(false);
            });
        }
    };

    const sorting = [
        { label: 'Yeniliyinə görə', value: '' },
        { label: 'Əvvəlcə ucuz', value: 'cheap' },
        { label: 'Əvvəlcə baha', value: 'expensive' },
    ];

    const selectSorting = (value: string) => {
        console.log(value);
    };

    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <FlatList
                data={productStates.products?.data}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => {
                    return <Product item={item} />;
                }}
                stickyHeaderHiddenOnScroll={true}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                numColumns={2}
                decelerationRate='fast'
                snapToAlignment='center'
                contentContainerStyle={{
                    rowGap: 8,
                    marginTop: 16,
                }}
                onEndReached={loadMore}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                windowSize={50}
                initialNumToRender={50}
                extraData={productStates.products?.data}
                ListFooterComponent={() => {
                    if (isLoadingMore) {
                        return (
                            <View>
                                <ActivityIndicator size='large' color={primaryColor} />
                            </View>
                        );
                    }
                    return null;
                }}
            />
            <CommonBottomSheet
                height={300}
                visible={true}
                onClose={() => {
                    generalStates.setBottomSheetVisible(false);
                }}
            >
                <View style={internalStyles.bottomSheetContainer}>
                    <CustomText style={internalStyles.bottomHeadText}>Elanları sırala</CustomText>
                    <View
                        style={{
                            marginTop: 16,
                        }}
                    >
                        {sorting.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => selectSorting(item.value)}
                                    style={{
                                        ...internalStyles.bottomSheetItemContainer,
                                        borderBottomWidth: index === sorting.length - 1 ? 0 : 1,
                                    }}
                                    key={index}
                                >
                                    <FillRadioButtonIcon />
                                    <CustomText style={internalStyles.bottomSheetItemText}>
                                        {item.label}
                                    </CustomText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </CommonBottomSheet>
        </View>
    );
};

export default observer(ProductsPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
        width: '100%',
    },
    prefixIconContainer: {
        position: 'absolute',
        left: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 16,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        borderColor: e5Color,
    },
    filterItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    filterText: {
        fontSize: 15,
    },
    bottomSheetContainer: {
        padding: 16,
        marginTop: 18,
    },
    bottomHeadText: {
        fontSize: 20,
        fontFamily: NunitoBold,
        lineHeight: 28,
        textAlign: 'center',
    },
    bottomSheetItemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bottomSheetItemText: {
        fontFamily: NunitoMedium,
        fontSize: 16,
        lineHeight: 21,
    },
});
