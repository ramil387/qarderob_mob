import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import OutlineLogo from '@/icons/logo/OutlineLogo';
import ShareIcon from '@/icons/product/ShareIcon';
import BackIcon from '@/icons/product/BackIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import { website } from '@/constants';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import { observer } from 'mobx-react-lite';

const ProductDetailPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const product = toJS(productStates.selectedProduct);
    const shareProduct = () => {
        Share.open({
            url: `${website}/elan/${product?.slug}-${product?.id}`,
        });
    };
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <View>
                <OutlineLogo />
            </View>
            <TouchableOpacity onPress={shareProduct}>
                <ShareIcon />
            </TouchableOpacity>
        </View>
    );
};

export default observer(ProductDetailPageHeader);

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
});
