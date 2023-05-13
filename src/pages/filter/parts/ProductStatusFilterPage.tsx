import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color } from '@/styles/variables';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import addProductStates from '@/states/product/addProduct/addProductStates';

const ProductStatusFilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const selectProductStatus = (selected: any) => {
        if (generalStates.prevPage === 'AddProductPage') {
            addProductStates.setProductStatus(selected?.id);
            navigate.goBack();
            return;
        }
        const selectedIndex = filterStates.selectedProductStatus.findIndex(
            (status: any) => status?.id === selected.id,
        );
        if (selectedIndex !== -1) {
            filterStates.setSelectedProductStatus(
                filterStates.selectedProductStatus.filter(
                    (status: any) => status?.id !== selected.id,
                ),
            );
            return;
        }
        filterStates.setSelectedProductStatus([...filterStates.selectedProductStatus, selected]);
    };

    useEffect(() => {
        filterStates.setQuery('productStatus', filterStates.selectedProductStatus);
    }, [filterStates.selectedProductStatus.length]);

    return (
        <View style={internalStyles.container}>
            {filterStates.productStatus.map((status, index) => {
                const showFillSquare =
                    filterStates.selectedProductStatus.findIndex(
                        (s: any) => s?.id === status?.id,
                    ) !== -1;
                return (
                    <TouchableOpacity
                        onPress={() => selectProductStatus(status)}
                        style={internalStyles.itemContainer}
                        key={index}
                    >
                        <CustomText style={internalStyles.item}>{status.label}</CustomText>
                        {showFillSquare || addProductStates?.productStatus === status?.id ? (
                            <FillSquareIcon />
                        ) : (
                            <OutlineSquareIcon />
                        )}
                    </TouchableOpacity>
                );
            })}
            <View style={internalStyles.btn}>
                <CustomMainButton
                    func={() => {
                        navigate.goBack();
                    }}
                    title='Təsdiqlə'
                />
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
