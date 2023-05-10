import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native-gesture-handler';
import { toJS } from 'mobx';
import userStates from '@/states/user/userStates';
import { fetchInfluencers } from '@/states/user/fetchInfluencers';
import LoadingComponent from '@/components/common/LoadingComponent';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '@/components/ui/CustomText';
import { NunitoBold, f5Color, mainTextColor, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { Avatar } from '@rneui/themed';
import VerifiedIcon from '@/icons/user/VerifiedIcon';
import InstagramSquareIcon from '@/icons/user/InstagramSquareIcon';
import _ from 'lodash';
import { searchInfluencer } from '@/states/user/searchInfluencer';
import CloseIcon from '@/icons/error/CloseIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { InfluencerType } from '@/types/influencerType';
import { UserType } from '@/types/userType';
import { TouchableOpacity } from 'react-native';
import CustomMainButton from '@/components/ui/CustomMainButton';
import profileStates from '@/states/profile/profileStates';

const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};

const SuffixIcon = ({ hide }: { hide?: boolean }) => {
    return (
        <View style={{ ...internalStyles.suffixIcon, display: hide ? 'none' : 'flex' }}>
            <CloseIcon style={{ color: mainTextColor }} />
        </View>
    );
};

const InfluencerPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const influencers = toJS(userStates.influencers);
    const [page, setPage] = React.useState<number>(1);
    const [searchKey, setSearchKey] = React.useState<string>('');

    const goUserPage = (item: UserType) => {
        userStates.setSelectedAdOwner(item);
        navigate.navigate('UserProductsPage');
    };

    useEffect(() => {
        if (searchKey.length === 0) {
            fetchInfluencers(page).finally(() => {
                setIsLoading(false);
            });
        }
    }, [searchKey]);

    const debuenceSearch = _.debounce(() => {
        searchInfluencer(searchKey).finally(() => {
            setIsLoading(false);
        });
    }, 500);

    useEffect(() => {
        if (searchKey.length > 0) {
            setIsLoading(true);
            debuenceSearch();
        }
    }, [searchKey]);

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    onChangeText={(text) => setSearchKey(text)}
                    placeholder='influenser axtar'
                    style={internalStyles.inputStyle}
                    icon={
                        <>
                            <PrefixIcon />
                            <SuffixIcon hide={searchKey.length > 0 ? false : true} />
                        </>
                    }
                    value={searchKey}
                />
            </View>
            <View style={{ marginVertical: 16, display: profileStates?.token ? 'none' : 'flex' }}>
                <CustomMainButton
                    title='İnfluenser qeydiyyat formu'
                    func={() => {}}
                    style={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: primaryColor,
                    }}
                    titleStyle={{ color: primaryColor }}
                />
            </View>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ rowGap: 8, marginTop: profileStates?.token ? 16 : 0 }}
                    data={influencers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => goUserPage(item as any)}>
                            <ImageBackground
                                imageStyle={{ borderRadius: 8 }}
                                source={{
                                    uri: item.cover,
                                }}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1.35, y: 0 }}
                                    colors={[
                                        '#F70F4B',
                                        'rgba(246, 99, 137, 0.612819)',
                                        'rgba(255, 255, 255, 0)',
                                        'rgba(255, 255, 255, 0) 123.13%)',
                                    ]}
                                    style={internalStyles.itemContainer}
                                >
                                    <View style={internalStyles.avatarContainer}>
                                        <Avatar
                                            size={48}
                                            source={{
                                                uri: item.photo,
                                            }}
                                            rounded
                                        />
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 4,
                                            }}
                                        >
                                            <CustomText style={internalStyles.name}>
                                                {item.full_name}
                                            </CustomText>
                                            {item.isVip && <VerifiedIcon />}
                                        </View>
                                    </View>
                                    {(item?.social_links?.instagram || item.instagram) && (
                                        <View style={internalStyles.instagramContainer}>
                                            <InstagramSquareIcon />
                                            <Text style={{ color: 'white', paddingLeft: 4 }}>
                                                {item?.social_links?.instagram
                                                    ? item?.social_links?.instagram
                                                          .split('/')[3]
                                                          ?.split('?')[0]
                                                    : item?.instagram.split('/')[3]?.split('?')[0]}
                                            </Text>
                                        </View>
                                    )}
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default observer(InfluencerPage);

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
        padding: 16,
        borderRadius: 5,
        height: 128,
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
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
    suffixIcon: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
