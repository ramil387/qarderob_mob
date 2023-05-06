import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color } from '@/styles/variables';

const SizesFilterPage = () => {
    const sizes = toJS(filterStates.sizes);

    return (
        <View style={internlStyles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ rowGap: 24 }}
                numColumns={4}
                windowSize={10}
                keyExtractor={(item, index) => index.toString()}
                data={sizes}
                renderItem={({ item }) => {
                    return (
                        <View style={internlStyles.itemContainer}>
                            <View style={internlStyles.badge}>
                                <CustomText style={internlStyles.name}>{item.size}</CustomText>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default observer(SizesFilterPage);

const internlStyles = StyleSheet.create({
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
});
