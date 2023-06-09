import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium } from '@/styles/variables';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { makeSlugify } from '@/helper/makeSlugify';
import CheckIcon from '@/icons/categories/CheckIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import addProductStates from '@/states/product/addProduct/addProductStates';

const ColorFilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const colors = toJS(filterStates.colors);

    const handleSelectColor = (color: string) => {
        if (filterStates.query?.color?.includes(color)) {
            filterStates.setQuery(
                'color',
                filterStates.query.color.filter((item: string) => item !== color),
            );
            filterStates.setSelectedColors(
                filterStates.selectedColors.filter((item: string) => item !== color),
            );
            return;
        }
        filterStates.setQuery('color', [...(filterStates?.query?.color || []), color]);
        filterStates.setSelectedColors([...filterStates.selectedColors, color]);
    };

    useEffect(() => {
        filterStates.setSelectedColors(filterStates.query?.color || []);
    }, [filterStates.query?.color]);

    return (
        <View style={internalStyles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ rowGap: 24 }}
                    numColumns={3}
                    windowSize={10}
                    keyExtractor={(item, index) => index.toString()}
                    data={colors}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (generalStates.prevPage === 'AddProductPage') {
                                        addProductStates.setColorId(item.id);
                                        navigate.goBack();
                                        return;
                                    }
                                    handleSelectColor(makeSlugify(item.name));
                                }}
                                style={internalStyles.itemContainer}
                            >
                                <View
                                    style={{ ...internalStyles.badge, backgroundColor: item.color }}
                                >
                                    <View
                                        style={{
                                            position: 'absolute',
                                            justifyContent: 'center',
                                            height: '100%',
                                            width: '100%',
                                            alignItems: 'center',
                                            display:
                                                filterStates.selectedColors?.includes(
                                                    makeSlugify(item.name),
                                                ) || addProductStates.colorId === item.id
                                                    ? 'flex'
                                                    : 'none',
                                        }}
                                    >
                                        <CheckIcon />
                                    </View>
                                </View>

                                <CustomText style={internalStyles.name}>{item.name}</CustomText>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
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

export default observer(ColorFilterPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    badge: {
        borderRadius: 100,
        width: 56,
        height: 56,
    },
    name: {
        width: 100,
        textAlign: 'center',
        marginTop: 4,
        fontFamily: NunitoMedium,
        fontSize: 15,
    },
    btn: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 16,
    },
});
