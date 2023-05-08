import { View, StyleSheet } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    f5Color,
    inactiveColor,
    primaryColor,
} from '@/styles/variables';
import generalStates from '@/states/general/generalStates';
import { fetchProducts } from '@/states/product/fetchProducts';
import filterStates from '@/states/filter/filterStates';
import { FilterContainer } from '../products/ProductsPage';
import { fetchUserInfo } from '@/states/user/fetchUserInfo';
import userStates from '@/states/user/userStates';
import moment from 'moment';
import LoadingComponent from '@/components/common/LoadingComponent';
import NotFoundIcon from '@/icons/user/NotFoundIcon';
import ProductList from '@/components/products/ProductList';

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
                        {moment(userStates.selectedAdOwner?.createdAt).format('lll')} tarixindən
                        Qarderob.az - da
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
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
    const getPageInfo = async () => {
        filterStates.setQuery('user_id', user?.id);
        filterStates.setQuery('verified', true);
        await fetchUserInfo(user!.id);
        fetchProducts(1)
            .then((resp) => {
                productStates.setProducts(resp);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getPageInfo();
        return () => {
            generalStates.setBottomSheetVisible(false);
        };
    }, []);

    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <FilterContainer search={false} />
            {isLoading ? (
                <LoadingComponent />
            ) : !userProducts?.length ? (
                <View style={internalStyles.notFoundContainer}>
                    <View style={internalStyles.notFoundCircle}>
                        <NotFoundIcon style={{ color: primaryColor }} />
                    </View>
                    <CustomText style={internalStyles.notFoundText}>
                        İstadəçinin aktiv elanı yoxdur
                    </CustomText>
                </View>
            ) : (
                <ProductList
                    data={userProducts || []}
                    type='user_ads'
                    loadMore={loadMore}
                    isMoreLoading={isLoadingMore}
                    selectSorting={selectSorting}
                />
            )}
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
    notFoundContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundCircle: {
        padding: 16,
        borderRadius: 100,
        backgroundColor: f5Color,
        width: 92,
        height: 92,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    notFoundText: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: NunitoBold,
        color: inactiveColor,
    },
});
