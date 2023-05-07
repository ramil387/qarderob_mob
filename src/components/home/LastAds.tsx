import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import generalStates from '@/states/general/generalStates';
import { AdListType } from '@/types/adListType';
import Product from '../products/Product';
import SearchInput from '../common/SearchInput';
import Intro from './Intro';
import CateogrySection from './CateogrySection';
import CustomText from '../ui/CustomText';
import { NunitoBold, NunitoMedium } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';

const HomeTopContainer = memo(() => {
    return (
        <View>
            <View style={{ marginBottom: 24 }}>
                <SearchInput />
                <Intro />
                <CateogrySection />
            </View>
            <View style={internalStyles.headContainer}>
                <View>
                    <CustomText style={internalStyles.headText}>SON ELANLAR</CustomText>
                </View>
                <View style={internalStyles.rightContainer}>
                    <CustomText style={internalStyles.showMore}>Hamısına bax</CustomText>
                    <ChevronRightIcon />
                </View>
            </View>
        </View>
    );
});

const LastAds = () => {
    const products: AdListType[] = generalStates.homeDatas?.last_ads;
    const scrollRef = React.useRef<FlatList>(null);

    useEffect(() => {
        if (scrollRef.current) {
            generalStates.setHomeScrollRef(scrollRef);
        }
    }, [scrollRef]);

    return (
        <View>
            <FlatList
                ref={scrollRef}
                ListHeaderComponent={<HomeTopContainer />}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Product item={item} />}
                stickyHeaderHiddenOnScroll={true}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                numColumns={2}
                decelerationRate='fast'
                snapToAlignment='center'
                contentContainerStyle={{
                    rowGap: 16,
                    paddingBottom: 48,
                    marginTop: 16,
                }}
                onEndReached={() => {
                    // if (mapStates.spotsByPage.length >= 10) {
                    //     mapStates.setSpotPage(
                    //         mapStates.spotsByPage[mapStates.spotsByPage.length - 1].sort,
                    //     );
                    // }
                }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                windowSize={50}
                initialNumToRender={50}
                extraData={products}
            />
        </View>
    );
};

export default memo(observer(LastAds));
const internalStyles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headText: {
        fontSize: 16,
        fontFamily: NunitoBold,
        lineHeight: 25,
        letterSpacing: 0.38,
    },
    rightContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    showMore: {
        fontSize: 12,
        fontFamily: NunitoMedium,
        lineHeight: 20,
        letterSpacing: -0.24,
        marginRight: 8,
    },
});
