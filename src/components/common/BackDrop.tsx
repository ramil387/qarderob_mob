import { StyleSheet, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { backdropBackground, phoneWidth } from '@/styles/variables';
import generalStates from '@/states/general/generalStates';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const BackDrop = () => {
    const opacityBackDrop = useSharedValue(0);
    const zIndexBackDrop = useSharedValue(-1);
    const useChangeOpacityBackDropStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value,
            zIndex: zIndexBackDrop.value,
        };
    });

    useEffect(() => {
        if (generalStates.backDropVisible) {
            opacityBackDrop.value = withTiming(1, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            });
            zIndexBackDrop.value = withTiming(1, {
                duration: 100,
                easing: Easing.inOut(Easing.ease),
            });
        } else {
            opacityBackDrop.value = withTiming(0, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            });
            zIndexBackDrop.value = withTiming(-1, {
                duration: 100,
                easing: Easing.inOut(Easing.ease),
            });
        }
    }, [generalStates.backDropVisible]);

    return (
        <Animated.View
            style={[
                {
                    ...internalStyles.backdrop,
                },
                useChangeOpacityBackDropStyle,
            ]}
        />
    );
};

export default memo(observer(BackDrop));

const internalStyles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: -100,
        left: 0,
        width: phoneWidth,
        height: '100%',
        backgroundColor: backdropBackground,
        padding: 16,
    },
});
