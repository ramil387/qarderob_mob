import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color, mainTextColor, primaryColor } from '@/styles/variables';
import CustomMainButton from '@/components/ui/CustomMainButton';
import { makeSlugify } from '@/helper/makeSlugify';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import generalStates from '@/states/general/generalStates';
import addProductStates from '@/states/product/addProduct/addProductStates';

const SizesFilterPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const sizes = toJS(filterStates.sizes);
    const handleSelectSize = (selected: string) => {
        if (filterStates.query.size?.includes(selected)) {
            filterStates.setQuery(
                'size',
                filterStates.query.size?.filter((item: string) => item !== selected),
            );
            return;
        }
        filterStates.setQuery('size', [...(filterStates.query?.size || []), selected]);
    };

    console.log(filterStates.query.size);

    return (
        <View style={internalStyles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ rowGap: 24 }}
                numColumns={4}
                windowSize={10}
                keyExtractor={(item, index) => index.toString()}
                data={sizes}
                renderItem={({ item }) => {
                    const isSelected = filterStates.query?.size?.find(
                        (selected: string) => selected === makeSlugify(item.size),
                    );
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (generalStates.prevPage === 'AddProductPage') {
                                    addProductStates.setSizeId(item.id);
                                    navigate.goBack();
                                    return;
                                }
                                handleSelectSize(makeSlugify(item.size));
                            }}
                            style={internalStyles.itemContainer}
                        >
                            <View
                                style={{
                                    ...internalStyles.badge,
                                    borderColor: isSelected ? primaryColor : e5Color,
                                }}
                            >
                                <CustomText
                                    style={{
                                        ...internalStyles.name,

                                        color: isSelected ? primaryColor : mainTextColor,
                                    }}
                                >
                                    {item.size}
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
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

export default observer(SizesFilterPage);

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
        width: '25%',
    },
    badge: {
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderColor: e5Color,
        width: '80%',
    },
    name: {
        textAlign: 'center',
        marginTop: 4,
        fontFamily: NunitoMedium,
        fontSize: 13,
    },
    btn: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
});
