import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import OutlineLogo from '@/icons/logo/OutlineLogo';
import ShareIcon from '@/icons/product/ShareIcon';
import BackIcon from '@/icons/product/BackIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const ProductDetailPageHeader = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const shareAd = () => {};
    return (
        <View style={internalStyles.container}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <View>
                <OutlineLogo />
            </View>
            <View>
                <ShareIcon />
            </View>
        </View>
    );
};

export default ProductDetailPageHeader;

const internalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
    },
});
