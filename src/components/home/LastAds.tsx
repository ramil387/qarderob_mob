import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import generalStates from '@/states/general/generalStates';
import { AdListType } from '@/types/adListType';
import Product from '../products/Product';
import SearchInput from '../common/SearchInput';
import Intro from './Intro';
import CateogrySection from './CateogrySection';
import CustomText from '../ui/CustomText';
import { NunitoBold, NunitoMedium, e5Color } from '@/styles/variables';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import { RefreshControl } from 'react-native';
import { fetchHome } from '@/states/general/fetchHome';
import LoadingComponent from '../common/LoadingComponent';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { toJS } from 'mobx';
import filterStates from '@/states/filter/filterStates';

const VipProducts = memo(
    observer(() => {
        const vip = toJS(generalStates.homeDatas?.vip_ads);
        return (
            <View
                style={{
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: e5Color,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                    flexWrap: 'wrap',
                }}
            >
                {vip?.map((product: AdListType) => {
                    return (
                        <View key={product?.id}>
                            <Product item={product} />
                        </View>
                    );
                })}
            </View>
        );
    }),
);

const HomeTopContainer = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();
        const goProducts = (type: string) => {
            if (type === 'vip') {
                filterStates.setQuery('isVip', true);
            } else {
                filterStates.setQuery('isVip', false);
            }
            navigate.navigate('ProductsPage');
        };

        const isVipExist =
            generalStates.homeDatas?.vip_ads && generalStates.homeDatas?.vip_ads?.length > 0;

        return (
            <View>
                <View style={{ marginBottom: 24 }}>
                    <SearchInput />
                    <Intro />
                    <CateogrySection />
                </View>
                {isVipExist && (
                    <View>
                        <View style={internalStyles.headContainer}>
                            <View>
                                <CustomText style={internalStyles.headText}>VIP ELANLAR</CustomText>
                            </View>
                            <TouchableOpacity
                                onPress={() => goProducts('vip')}
                                style={internalStyles.rightContainer}
                            >
                                <CustomText style={internalStyles.showMore}>
                                    Hamısına bax
                                </CustomText>
                                <ChevronRightIcon />
                            </TouchableOpacity>
                        </View>
                        <VipProducts />
                    </View>
                )}
                <View style={{ ...internalStyles.headContainer, paddingTop: isVipExist ? 16 : 0 }}>
                    <View>
                        <CustomText style={internalStyles.headText}>SON ELANLAR</CustomText>
                    </View>
                    <TouchableOpacity
                        onPress={() => goProducts('all')}
                        style={internalStyles.rightContainer}
                    >
                        <CustomText style={internalStyles.showMore}>Hamısına bax</CustomText>
                        <ChevronRightIcon />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }),
);

const LastAds = () => {
    const products: AdListType[] = generalStates.homeDatas?.last_ads;
    const scrollRef = React.useRef<FlatList>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            generalStates.setHomeScrollRef(scrollRef);
        }
    }, [scrollRef]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchHome();
        setRefreshing(false);
    }, []);

    if (refreshing) {
        return <LoadingComponent />;
    }

    return (
        <View>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
