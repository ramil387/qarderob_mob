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
import { NunitoBold, f5Color } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SearchIcon from '@/icons/home/SearchIcon';
import { Avatar } from '@rneui/themed';
import VerifiedIcon from '@/icons/user/VerifiedIcon';
import InstagramSquareIcon from '@/icons/user/InstagramSquareIcon';
const PrefixIcon = () => {
    return (
        <View style={internalStyles.prefixIcon}>
            <SearchIcon />
        </View>
    );
};
const InfluencerPage = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const influencers = toJS(userStates.influencers);
    const [page, setPage] = React.useState<number>(1);
    const [searchKey, setSearchKey] = React.useState<string>('');

    useEffect(() => {
        fetchInfluencers(page).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingComponent />;

    return (
        <View style={internalStyles.container}>
            <View style={internalStyles.searchContainer}>
                <CustomTextInput
                    onChangeText={(text) => setSearchKey(text)}
                    placeholder='influenser axtar'
                    style={internalStyles.inputStyle}
                    icon={<PrefixIcon />}
                />
            </View>
            <FlatList
                contentContainerStyle={{ marginTop: 16, rowGap: 8 }}
                data={influencers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
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
                )}
            />
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
});
