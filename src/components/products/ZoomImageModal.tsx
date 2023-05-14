import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { zoomImageBackground } from '@/styles/variables';
import { toJS } from 'mobx';
import productStates from '@/states/product/productStates';
import { getAdImageBySize } from '@/utils/getImageBySize';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const ZoomImageModal = () => {
    const product = toJS(productStates.selectedProduct);
    const scaleValue = useSharedValue(1);

    return (
        <Modal visible={true} transparent={false} animationType='fade'>
            <View style={internalStyles.container}>
                <PanGestureHandler
                    onGestureEvent={(e) => {
                        console.log(e.nativeEvent.y);
                    }}
                >
                    {product?.images.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                style={{
                                    resizeMode: 'contain',
                                    width: '100%',
                                    height: '100%',
                                    transform: [{ scale: 1 }],
                                }}
                                source={{
                                    uri: getAdImageBySize('lg', product?.id, image),
                                }}
                            />
                        );
                    })}
                </PanGestureHandler>
            </View>
        </Modal>
    );
};

export default observer(ZoomImageModal);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: zoomImageBackground,
        zIndex: 999,
    },
});
