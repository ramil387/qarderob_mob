import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { e5Color, f5Color } from '@/styles/variables';
import SearchIcon from '@/icons/home/SearchIcon';
import CustomText from '@/components/ui/CustomText';
import FilterHorizantalIcon from '@/icons/product/FilterHorizantalIcon';
import SortArrowsIcon from '@/icons/product/SortArrowsIcon';
import { fetchProducts } from '@/states/product/fetchProducts';
import productStates from '@/states/product/productStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import filterStates from '@/states/filter/filterStates';
import ProductList from '@/components/products/ProductList';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIconContainer}>
            <SearchIcon />
        </View>
    );
};

export const FilterContainer = memo(({ search }: { search?: boolean }) => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const goFilterPage = () => {
        navigate.navigate('FilterPage');
    };
    return (
        <View>
            {search && (
                <View style={internalStyles.searchContainer}>
                    <CustomTextInput
                        icon={<PrefixIcon />}
                        placeholder='Məhsul və ya @istifadəçi axtar'
                        style={{ paddingLeft: 48 }}
                    />
                </View>
            )}
            <View style={{ ...internalStyles.filterContainer, marginTop: 16 }}>
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
        </View>
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

    const selectSorting = async (value: string) => {
        filterStates.setQuery('sortby', value);
        fetchProducts(1).then((resp) => {
            productStates.setProducts(resp);
            generalStates.setBottomSheetVisible(false);
        });
    };

    return (
        <View style={internalStyles.container}>
            <FilterContainer />
            <ProductList
                data={productStates.products?.data || []}
                loadMore={loadMore}
                isMoreLoading={isLoadingMore}
                type='products'
                selectSorting={selectSorting}
            />
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
});
