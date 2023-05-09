import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { NunitoBold, NunitoMedium, e5Color, primaryColor } from '@/styles/variables';
import generalStates from '@/states/general/generalStates';
import { AdListType } from '@/types/adListType';
import Product from './Product';
import productStates from '@/states/product/productStates';
import CustomText from '../ui/CustomText';
import CommonBottomSheet from '../common/CommonBottomSheet';
import FillRadioButtonIcon from '@/icons/product/FillRadioButtonIcon';
import filterStates from '@/states/filter/filterStates';
import OutlineRadioButton from '@/icons/product/OutlineRadioButton';

const ProductList = ({
    type,
    loadMore,
    isMoreLoading,
    data,
    selectSorting,
}: {
    type: string;
    loadMore: () => void;
    isMoreLoading?: boolean;
    data: AdListType[];
    selectSorting?: (value: string) => void;
}) => {
    const sorting = [
        {
            label: 'Yeniliyinə görə',
            value: '',
            selected: filterStates.query?.sortby === undefined || filterStates.query?.sortby === '',
        },
        { label: 'Əvvəlcə ucuz', value: 'cheap', selected: filterStates.query?.sortby === 'cheap' },
        {
            label: 'Əvvəlcə baha',
            value: 'expensive',
            selected: filterStates.query?.sortby === 'expensive',
        },
    ];

    return (
        <View style={internalStyles.container}>
            <View style={{ paddingHorizontal: 16 }}>
                <FlatList
                    onScroll={(e) => {
                        if (generalStates.curPage !== 'ProfilePage') return;
                        const yOffset = e.nativeEvent.contentOffset.y;
                        if (yOffset > 0) {
                            productStates.setProductListScrollDirection('down');
                        } else {
                            productStates.setProductListScrollDirection('up');
                        }
                    }}
                    data={data}
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
                        marginTop:
                            type === 'user_ads' || type === 'profile_ads' || type === 'products'
                                ? 0
                                : 16,
                    }}
                    onEndReached={loadMore}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    windowSize={50}
                    initialNumToRender={50}
                    extraData={data}
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
                                    onPress={() => {
                                        if (selectSorting) {
                                            selectSorting(item.value);
                                        }
                                    }}
                                    style={{
                                        ...internalStyles.bottomSheetItemContainer,
                                        borderBottomWidth: index === sorting.length - 1 ? 0 : 1,
                                    }}
                                    key={index}
                                >
                                    {item?.selected ? (
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
    bottomSheetContainer: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginTop: 28,
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
