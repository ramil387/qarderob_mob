import { View, StyleSheet, Dimensions, Image } from 'react-native';
import React, { memo } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { toJS } from 'mobx';
import generalStates from '@/states/general/generalStates';
import { observer } from 'mobx-react-lite';

const Intro = () => {
    const width = Dimensions.get('window').width;
    const banners = toJS(generalStates.homeDatas?.banners);

    return (
        <View style={internalStyles.container}>
            <Carousel
                loop
                width={width - 32}
                height={width / 2}
                autoPlay={true}
                data={banners}
                scrollAnimationDuration={4000}
                renderItem={({ data, index }: any) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                padding: 0,
                                margin: 0,
                                justifyContent: 'center',
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                style={{
                                    width: width - 32,
                                    height: width / 2,
                                    resizeMode: 'contain',
                                    borderRadius: 8,
                                }}
                                source={{ uri: banners[index]?.images[0] }}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default memo(observer(Intro));

export const internalStyles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
});
