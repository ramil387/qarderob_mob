import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
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
import { makeSlugify } from '@/helper/makeSlugify';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import addProductStates from '@/states/product/addProduct/addProductStates';
import { CityType } from '@/types/cityType';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};

const BrandItem = React.memo(({ item, onSelect, selected }: any) => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const shownFillSquare = selected;
    const handleSelect = useCallback(() => {
        if (generalStates.prevPage === 'AddProductPage') {
            addProductStates.setCityId(item.id);
            navigate.goBack();
            return;
        }
        onSelect(item);
    }, [item, onSelect]);

    return (
        <TouchableOpacity onPress={handleSelect} style={internalStyles.item}>
            <CustomText style={internalStyles.brandName}>{item.name_az}</CustomText>
            <View
                style={{
                    display:
                        shownFillSquare || item?.id === addProductStates?.cityId ? 'flex' : 'none',
                }}
            >
                <FillSquareIcon />
            </View>
            <View
                style={{
                    display:
                        shownFillSquare || item?.id === addProductStates?.cityId ? 'none' : 'flex',
                }}
            >
                <OutlineSquareIcon />
            </View>
        </TouchableOpacity>
    );
});

const BrandFilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const cities = useMemo(() => toJS(filterStates.cities), []);
    const [searchKey, setSearchKey] = useState('');
    const selectedCities = toJS(filterStates.query.city || {});

    const selectCity = useCallback(
        (city: CityType) => {
            const selected = selectedCities[city?.id];
            const newCities = { ...selectedCities, [city.id]: !selected };
            filterStates.setQuery('city', newCities);
        },
        [filterStates.query.city],
    );

    const renderedCity = useCallback(
        ({ item }: { item: CityType }) => {
            const selected = Boolean(selectedCities[item.id]);
            return <BrandItem item={item} onSelect={selectCity} selected={selected} />;
        },
        [selectedCities, selectCity],
    );

    const filteredCities = useMemo(
        () => cities.filter((city) => makeSlugify(city.name_az).includes(makeSlugify(searchKey))),
        [cities, searchKey],
    );

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
            <View style={{ flex: 1 }}>
                <FlatList
                    windowSize={10}
                    initialNumToRender={20}
                    showsVerticalScrollIndicator={false}
                    data={filteredCities}
                    extraData={selectedCities}
                    renderItem={renderedCity}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={internalStyles.btn}>
                <CustomMainButton
                    func={() => {
                        if (generalStates.prevPage === 'HomePage') {
                            navigate.navigate('ProductsPage');
                            return;
                        }
                        navigate.goBack();
                    }}
                    title='Təsdiqlə'
                />
            </View>
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
    btn: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 16,
    },
});
