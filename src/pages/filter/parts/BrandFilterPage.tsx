import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NunitoMedium, e5Color, f5Color } from '@/styles/variables';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import { BrandType } from '@/types/brandType';
import CustomText from '@/components/ui/CustomText';
import { observer } from 'mobx-react-lite';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};

const BrandItem = React.memo(({ item, onSelect, selected }: any) => {
    const shownFillSquare = selected;

    const handleSelect = useCallback(() => {
        onSelect(item);
    }, [item, onSelect]);

    return (
        <TouchableOpacity onPress={handleSelect} style={internalStyles.item}>
            <CustomText style={internalStyles.brandName}>{item.name}</CustomText>
            <View style={{ display: shownFillSquare ? 'flex' : 'none' }}>
                <FillSquareIcon />
            </View>
            <View style={{ display: shownFillSquare ? 'none' : 'flex' }}>
                <OutlineSquareIcon />
            </View>
        </TouchableOpacity>
    );
});

const BrandFilterPage = () => {
    const brands = useMemo(() => toJS(filterStates.brands), []);
    const [searchKey, setSearchKey] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<Record<number, boolean>>({});

    const selectBrand = useCallback((brand: BrandType) => {
        setSelectedBrands((prev) => {
            const selected = prev[brand.id];
            return { ...prev, [brand.id]: !selected };
        });
    }, []);
    const renderedBrand = useCallback(
        ({ item }: { item: BrandType }) => {
            const selected = Boolean(selectedBrands[item.id]);
            return <BrandItem item={item} onSelect={selectBrand} selected={selected} />;
        },
        [selectedBrands, selectBrand],
    );

    const filteredBrands = useMemo(
        () => brands.filter((brand) => brand.name.toLowerCase().includes(searchKey.toLowerCase())),
        [brands, searchKey],
    );

    useEffect(() => {
        filterStates.setQuery('brand', selectedBrands);
    }, [selectedBrands]);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    onChangeText={(text) => setSearchKey(text)}
                    placeholder='Brend axtar'
                    style={internalStyles.inputStyle}
                    icon={<PrefixIcon />}
                />
            </View>
            <FlatList
                windowSize={10}
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                data={filteredBrands}
                extraData={selectedBrands}
                renderItem={renderedBrand}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default observer(BrandFilterPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    prefixIcon: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    searchContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    inputStyle: {
        paddingLeft: 48,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
    brandName: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: NunitoMedium,
    },
});
