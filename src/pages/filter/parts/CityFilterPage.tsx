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
import { CityType } from '@/types/cityType';
import slugify from 'slugify';
import { makeSlugify } from '@/components/helper/makeSlugify';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};

const CityItem = React.memo(({ item, onSelect, selected }: any) => {
    const shownFillSquare = selected;

    const handleSelect = useCallback(() => {
        onSelect(item);
    }, [item, onSelect]);

    return (
        <TouchableOpacity onPress={handleSelect} style={internalStyles.item}>
            <CustomText style={internalStyles.brandName}>{item.name_az}</CustomText>
            <View style={{ display: shownFillSquare ? 'flex' : 'none' }}>
                <FillSquareIcon />
            </View>
            <View style={{ display: shownFillSquare ? 'none' : 'flex' }}>
                <OutlineSquareIcon />
            </View>
        </TouchableOpacity>
    );
});

const CityFilterPage = () => {
    const cities = useMemo(() => toJS(filterStates.cities), []);
    const [searchKey, setSearchKey] = useState('');
    const [selectedCities, setSelectedCities] = useState<Record<number, boolean>>({});

    const selectCity = useCallback((city: CityType) => {
        setSelectedCities((prev) => {
            const selected = prev[city.id];
            return { ...prev, [city.id]: !selected };
        });
    }, []);
    const renderedBrand = useCallback(
        ({ item }: { item: CityType }) => {
            const selected = Boolean(selectedCities[item.id]);
            return <CityItem item={item} onSelect={selectCity} selected={selected} />;
        },
        [selectedCities, selectCity],
    );

    const filteredCities = useMemo(
        () => cities.filter((city) => makeSlugify(city.name_az).includes(makeSlugify(searchKey))),
        [cities, searchKey],
    );

    useEffect(() => {
        filterStates.setQuery('city', selectedCities);
    }, [selectedCities]);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    onChangeText={(text) => setSearchKey(text)}
                    placeholder='Şəhər axtar'
                    style={internalStyles.inputStyle}
                    icon={<PrefixIcon />}
                />
            </View>
            <FlatList
                windowSize={10}
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                data={filteredCities}
                extraData={selectedCities}
                renderItem={renderedBrand}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default observer(CityFilterPage);

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
