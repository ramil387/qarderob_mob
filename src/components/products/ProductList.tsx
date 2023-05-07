import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import CustomText from '../ui/CustomText';
import { NunitoBold, NunitoMedium, phoneWidth, primaryColor } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import generalStates from '@/states/general/generalStates';
import { AdListType } from '@/types/adListType';
import Product from './Product';
import userStates from '@/states/user/userStates';
import productStates from '@/states/product/productStates';

const ProductList = ({
    type,
    loadMore,
    isMoreLoading,
}: {
    type: string;
    loadMore: () => void;
    isMoreLoading?: boolean;
}) => {
    const products: AdListType[] =
        type === 'vip'
            ? generalStates.homeDatas?.vip_ads
            : type === 'last'
            ? generalStates.homeDatas?.last_ads
            : userStates.userProducts?.data;

    return (
        <View style={internalStyles.container}>
            <View
                style={{
                    ...internalStyles.headContainer,
                    display: type === 'user_ads' ? 'none' : 'flex',
                }}
            >
                <View>
                    <CustomText style={internalStyles.headText}>
                        {type === 'vip' ? 'VIP ELANLAR' : 'SON ELANLAR'}
                    </CustomText>
                </View>
                <View style={internalStyles.rightContainer}>
                    <CustomText style={internalStyles.showMore}>Hamısına bax</CustomText>
                    <ChevronRightIcon />
                </View>
            </View>
            <FlatList
                onScroll={(e) => {
                    const yOffset = e.nativeEvent.contentOffset.y;
                    if (yOffset > 0) {
                        productStates.setProductListScrollDirection('down');
                    } else {
                        productStates.setProductListScrollDirection('up');
                    }
                }}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Product item={item} />}
                stickyHeaderHiddenOnScroll={true}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                numColumns={2}
                decelerationRate='fast'
                snapToAlignment='center'
                contentContainerStyle={{
                    rowGap: 8,
                    marginTop: type === 'user_ads' ? 0 : 16,
                }}
                onEndReached={loadMore}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                windowSize={50}
                initialNumToRender={50}
                extraData={products}
                ListFooterComponent={() => {
                    if (isMoreLoading) {
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

export default memo(observer(ProductList));

const internalStyles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headText: {
        fontSize: 16,
        fontFamily: NunitoBold,
        lineHeight: 25,
        letterSpacing: 0.38,
    },
    rightContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    showMore: {
        fontSize: 12,
        fontFamily: NunitoMedium,
        lineHeight: 20,
        letterSpacing: -0.24,
        marginRight: 8,
    },
});
