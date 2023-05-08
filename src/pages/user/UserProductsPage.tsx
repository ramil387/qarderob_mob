import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, NunitoMedium, e5Color, inactiveColor, primaryColor } from '@/styles/variables';
import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import generalStates from '@/states/general/generalStates';
import { fetchProducts } from '@/states/product/fetchProducts';
import filterStates from '@/states/filter/filterStates';
import Product from '@/components/products/Product';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';
import OutlineRadioButton from '@/icons/product/OutlineRadioButton';
import { FilterContainer } from '../products/ProductsPage';

const TopContainer = memo(
    observer(() => {
        const user = toJS(productStates.selectedProduct?._user);

        return (
            <View style={internalStyles.avatarContainer}>
                <Avatar
                    size={73}
                    rounded
                    source={{
                        uri: user?.photo,
                    }}
                />
                <View>
                    <CustomText style={internalStyles.fullName}>{user?.full_name}</CustomText>
                    <CustomText style={internalStyles.dateText}>
                        30.11.2022 18:42 tarixindən Qarderob.az - da
                    </CustomText>
                    <CustomText style={{ ...internalStyles.dateText, marginTop: 4 }}>
                        {toJS(productStates.products?.count)} elan
                    </CustomText>
                </View>
            </View>
        );
    }),
);

const UserProductsPage = () => {
    const user = toJS(productStates.selectedProduct?._user);
    const userProducts = toJS(productStates.products?.data);
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

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

    const selectSorting = async (value: string) => {
        filterStates.setQuery('sortby', value);
        fetchProducts(1).then((resp) => {
            productStates.setProducts(resp);
            generalStates.setBottomSheetVisible(false);
        });
    };
    useEffect(() => {
        filterStates.setQuery('user_id', user?.id);
        filterStates.setQuery('verified', true);
        fetchProducts(1).then((resp) => {
            productStates.setProducts(resp);
        });
        return () => {
            generalStates.setBottomSheetVisible(false);
        };
    }, []);

    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <FilterContainer search={false} />
            <FlatList
                data={userProducts}
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
                    marginBottom: 16,
                    paddingBottom: 16,
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
                visible={generalStates.bottomSheetVisible}
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
                                    {filterStates.query.sortby === item.value ? (
                                        <FillRadioButtonIcon />
                                    ) : (
                                        <OutlineRadioButton />
                                    )}
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

export default observer(UserProductsPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    fullName: {
        fontFamily: NunitoBold,
        fontSize: 16,
        lineHeight: 20,
        textTransform: 'capitalize',
    },
    dateText: {
        fontSize: 12,
        lineHeight: 20,
        color: inactiveColor,
        marginTop: 8,
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
