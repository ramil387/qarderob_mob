import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native-gesture-handler';
import { toJS } from 'mobx';
import { fetchInfluencers } from '@/states/user/fetchInfluencers';
import LoadingComponent from '@/components/common/LoadingComponent';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, f5Color, inactiveColor, phoneWidth } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { Avatar } from '@rneui/themed';
import shopStates from '@/states/shop/shopStates';
import { fetchShops } from '@/states/shop/fetchShops';
import { defineWorkingDays } from '@/helper/defineWorkingDays';
import LocationIcon from '@/icons/shop/LocationIcon';
import _ from 'lodash';
import { searchShop } from '@/states/shop/searchShop';
import { ShopType } from '@/types/shopType';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// TODO ADD NO RESULT COMPONENT FOR SHOP AND INFLUENCER
const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};
const ShopPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const shops = toJS(shopStates.shops);
    const [searchKey, setSearchKey] = React.useState<string>('');

    const debueceSearch = _.debounce(() => {
        searchShop(searchKey).finally(() => {
            setIsLoading(false);
        });
    }, 500);

    useEffect(() => {
        if (searchKey.length === 0) {
            fetchShops().finally(() => {
                setIsLoading(false);
            });
        }
    }, [searchKey]);

    useEffect(() => {
        if (searchKey.length > 0) {
            setIsLoading(true);
            debueceSearch();
        }
    }, [searchKey]);

    const goShopProductsPage = (item: ShopType) => {
        shopStates.setSelectedShop(item);
        navigate.navigate('ShopProductsPage');
    };

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    onChangeText={(text) => setSearchKey(text)}
                    placeholder='Mağaza axtar'
                    style={internalStyles.inputStyle}
                    icon={<PrefixIcon />}
                />
            </View>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <View style={{ flex: 1, width: '100%', marginVertical: 16 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ rowGap: 8, width: '100%' }}
                        data={shops}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => goShopProductsPage(item)}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: 8 }}
                                    source={{
                                        uri: item.cover,
                                    }}
                                    blurRadius={5}
                                    style={internalStyles.itemContainer}
                                >
                                    <View
                                        style={{
                                            backgroundColor: '#2a2a2a',
                                            position: 'absolute',
                                            height: 128,
                                            top: 0,
                                            width: '100%',
                                            opacity: 0.4,
                                            borderRadius: 8,
                                        }}
                                    />
                                    <View style={internalStyles.avatarContainer}>
                                        <Avatar
                                            size={48}
                                            source={{
                                                uri: item.img,
                                            }}
                                            rounded
                                        />
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 4,
                                            }}
                                        >
                                            <View>
                                                <CustomText style={internalStyles.name}>
                                                    {item.name}
                                                </CustomText>
                                                <CustomText style={internalStyles.workingDays}>
                                                    {defineWorkingDays(item.work_days)}:{' '}
                                                    {item.start_hour}-{item.end_hour}
                                                </CustomText>
                                                <CustomText
                                                    style={internalStyles.desc}
                                                    numberOfLines={2}
                                                >
                                                    {item.desc}
                                                </CustomText>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={internalStyles.address}>
                                        <LocationIcon style={{ color: '#fff' }} />
                                        <CustomText
                                            numberOfLines={1}
                                            style={internalStyles.addressText}
                                        >
                                            {item.address}
                                        </CustomText>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default observer(ShopPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    inputStyle: {
        paddingLeft: 48,
    },
    prefixIcon: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    itemContainer: {
        flex: 1,
        borderRadius: 5,
        height: 128,
        width: '100%',
        position: 'relative',
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        padding: 16,
    },
    name: {
        fontFamily: NunitoBold,
        fontSize: 16,
        lineHeight: 21,
        color: '#fff',
        paddingTop: 4,
    },
    instagramContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    workingDays: {
        color: '#ddd',
        fontSize: 12,
        lineHeight: 16,
    },
    desc: {
        color: '#fff',
        fontFamily: NunitoBold,
        width: phoneWidth - phoneWidth * 0.2 - 32,
        marginTop: 4,
    },
    address: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 70,
        position: 'absolute',
        bottom: 4,
    },

    addressText: {
        color: '#ddd',
        width: phoneWidth - phoneWidth * 0.2 - 32 - 20,
    },
});
