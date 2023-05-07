import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color } from '@/styles/variables';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';

const ProductStatusFilterPage = () => {
    const [selectedProductStatus, setSelectedProductStatus] = useState<any[]>([]);
    const selectProductStatus = (selected: any) => {
        const selectedIndex = selectedProductStatus.findIndex(
            (status) => status?.id === selected.id,
        );
        if (selectedIndex !== -1) {
            setSelectedProductStatus(
                selectedProductStatus.filter((status) => status?.id !== selected.id),
            );
            return;
        }
        setSelectedProductStatus([...selectedProductStatus, selected]);
    };

    useEffect(() => {
        filterStates.setQuery('productStatus', selectedProductStatus);
    }, [selectedProductStatus.length]);

    return (
        <View style={internalStyles.container}>
            {filterStates.productStatus.map((status, index) => {
                const showFillSquare =
                    selectedProductStatus.findIndex((s) => s?.id === status?.id) !== -1;
                return (
                    <TouchableOpacity
                        onPress={() => selectProductStatus(status)}
                        style={internalStyles.itemContainer}
                        key={index}
                    >
                        <CustomText style={internalStyles.item}>{status.label}</CustomText>
                        <View style={{ display: showFillSquare ? 'flex' : 'none' }}>
                            <FillSquareIcon />
                        </View>
                        <View style={{ display: showFillSquare ? 'none' : 'flex' }}>
                            <OutlineSquareIcon />
                        </View>
                    </TouchableOpacity>
                );
            })}
            <View style={internalStyles.btn}>
                <CustomMainButton func={() => {}} title='Təsdiqlə' />
            </View>
        </View>
    );
};

export default observer(ProductStatusFilterPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: NunitoMedium,
    },
    btn: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
});
