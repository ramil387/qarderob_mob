import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { observer } from 'mobx-react-lite';
import { phoneWidth } from '@/styles/variables';
import BackDrop from './BackDrop';
import CloseIcon from '@/icons/error/CloseIcon';

const CommonBottomSheet = ({
    visible,
    onClose,
    height,
    children,
}: {
    visible: boolean;
    onClose: () => void;
    height: number;
    children: React.ReactNode;
}) => {
    const bottomHeight = useSharedValue(0);

    const changeBottomHeight = () => {
        bottomHeight.value = withTiming(height, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
        });
    };

    const useChangeBottomHeightStyle = useAnimatedStyle(() => {
        return {
            height: bottomHeight.value,
            overflow: 'hidden',
        };
    });

    useEffect(() => {
        if (visible) {
            changeBottomHeight();
        } else {
            bottomHeight.value = withTiming(0, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
            });
        }
    }, [visible]);

    return (
        <>
            <BackDrop />

            <Animated.View style={[internalStyles.container, useChangeBottomHeightStyle]}>
                <TouchableOpacity
                    onPress={() => {
                        onClose();
                    }}
                    style={internalStyles.closeIconContainer}
                >
                    <CloseIcon />
                </TouchableOpacity>
                {children}
            </Animated.View>
        </>
    );
};

export default memo(observer(CommonBottomSheet));

const internalStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 5,
        zIndex: 1,
        overflow: 'hidden',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
});
