import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction, toJS } from 'mobx';
import userStates from '@/states/user/userStates';
import { fetchLikedAds } from '@/states/user/fetchLikedAds';
import LoadingComponent from '@/components/common/LoadingComponent';
import FavouriteCircleIcon from '@/icons/fav/FavouriteCircleIcon';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import { FlatList } from 'react-native';
import Product from '@/components/products/Product';
import { useIsFocused } from '@react-navigation/native';

const FavouritePage = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);
    const products = toJS(userStates.likedProducts);
    const [toggleCheckLike, setToggleCheckLike] = React.useState<boolean>(false);
    const isFocused = useIsFocused();

    if (!isFocused) return null;

    useEffect(() => {
        setIsLoading(true);
        fetchLikedAds(1).finally(() => {
            setIsLoading(false);
        });
    }, [toggleCheckLike]);

    const loadMore = () => {
        if (products?.has_next_page) {
            setIsLoadingMore(true);
            fetchLikedAds(products?.next_page).finally(() => {
                setIsLoadingMore(false);
            });
        }
    };

    if (isLoading) return <LoadingComponent />;

    if (!products?.data.length) {
        return (
            <View
                style={{
                    ...internalStyles.container,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FavouriteCircleIcon />
                <CustomText style={internalStyles.notFoundText}>Favori elanınız yoxdur</CustomText>
            </View>
        );
    }

    return (
        <View style={internalStyles.container}>
            <FlatList
                data={userStates.likedProducts.data}
                keyExtractor={(item) => item?.ad?.id?.toString()}
                renderItem={({ item }) => {
                    return (
                        <Product
                            toggleCheckLike={toggleCheckLike}
                            setToggleCheckLike={setToggleCheckLike}
                            item={item?.ad}
                        />
                    );
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
                extraData={userStates.likedProducts.data}
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
        </View>
    );
};

export default observer(FavouritePage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    notFoundText: {
        fontSize: 16,
        fontFamily: NunitoBold,
        marginTop: 16,
    },
});
