import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import React, { memo } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { toJS } from 'mobx';
import generalStates from '@/states/general/generalStates';
import { observer } from 'mobx-react-lite';
import CustomText from '../ui/CustomText';
import { NunitoBold, primaryColor } from '@/styles/variables';
import DoubleRightArrowIcon from '@/icons/arrows/DoubleRightArrowIcon';

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
                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL(banners[index]?.link);
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: 4,
                                    borderRadius: 24,
                                    right: 8,
                                    backgroundColor: '#fff',
                                    height: 30,
                                    elevation: 2,
                                    display: banners[index]?.desc_az ? 'flex' : 'none',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontSize: 12,
                                        fontFamily: NunitoBold,
                                        color: primaryColor,
                                        paddingLeft: 8,
                                    }}
                                >
                                    {banners[index]?.desc_az}
                                </CustomText>
                                <View
                                    style={{
                                        width: 30,
                                        marginLeft: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 30,
                                        padding: 8,
                                        borderRadius: 24,
                                        backgroundColor: primaryColor,
                                    }}
                                >
                                    <DoubleRightArrowIcon style={{ color: '#fff' }} />
                                </View>
                            </TouchableOpacity>
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
