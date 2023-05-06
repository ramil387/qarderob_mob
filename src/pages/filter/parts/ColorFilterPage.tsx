import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium } from '@/styles/variables';

const ColorFilterPage = () => {
    const colors = toJS(filterStates.colors);

    return (
        <View style={internlStyles.container}>
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
                        <View style={internlStyles.itemContainer}>
                            <View style={{ ...internlStyles.badge, backgroundColor: item.color }} />
                            <CustomText style={internlStyles.name}>{item.name}</CustomText>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default observer(ColorFilterPage);

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
});
