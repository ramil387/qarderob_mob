import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium } from '@/styles/variables';
import CustomMainButton from '@/components/ui/CustomMainButton';

const ColorFilterPage = () => {
    const colors = toJS(filterStates.colors);

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
                            <View style={internalStyles.itemContainer}>
                                <View
                                    style={{ ...internalStyles.badge, backgroundColor: item.color }}
                                />
                                <CustomText style={internalStyles.name}>{item.name}</CustomText>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={internalStyles.btn}>
                <CustomMainButton func={() => {}} title='Təsdiqlə' />
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
