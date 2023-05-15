import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchNotifications } from '@/states/notifications/fetchNotifications';
import { toJS } from 'mobx';
import notificationStates from '@/states/notifications/notificationStates';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import {
    NunitoBold,
    NunitoMedium,
    blueColor,
    e5Color,
    inactiveColor,
    lightBorder,
    mainTextColor,
    primaryColor,
} from '@/styles/variables';
import DotsIcon from '@/icons/user/DotsIcon';
import LoadingComponent from '@/components/common/LoadingComponent';
import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import generalStates from '@/states/general/generalStates';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { fetchUserInfo } from '@/states/user/fetchUserInfo';
import userStates from '@/states/user/userStates';
import { deleteNotification } from '@/states/notifications/deleteNotification';
import NotificationCircleIcon from '@/icons/notification/NotificationCircleIcon';
import { fetchSingleProductById } from '@/states/product/fetchSingleProduct';
import { fetchComments } from '@/states/notifications/fetchComments';
import productStates from '@/states/product/productStates';

const NotificationPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const notifications = toJS(notificationStates.notifications?.data);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);

    const goCommentsPage = async (id: number | null) => {
        if (!id) return;
        const resp = await fetchSingleProductById(id);
        if (resp) {
            productStates.setSelectedProduct(resp.data);
        }
        await fetchComments(id);
        navigate.navigate('CommentsPage');
    };

    const userProfile = async (id: number | null) => {
        if (!id) return;
        await fetchUserInfo(id);
        generalStates.setBottomSheetVisible(false);
        navigate.navigate('UserProductsPage');
    };

    const loadMore = () => {
        if (notificationStates.notifications?.has_next_page && !isLoadingMore) {
            setIsLoadingMore(true);
            fetchNotifications(notificationStates.notifications?.next_page).then(() => {
                setIsLoadingMore(false);
            });
        }
    };

    useEffect(() => {
        fetchNotifications().finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingComponent />;

    return (
        <View style={internalStyles.container}>
            {notificationStates.notificationCount === 0 ? (
                <View style={internalStyles.notFoundContainer}>
                    <NotificationCircleIcon />
                    <CustomText style={internalStyles.notFoundText}>
                        Hazırda bildiriş yoxdur
                    </CustomText>
                    <CustomText style={internalStyles.notFoundSubText}>
                        Bildirişləriniz olduğu zaman, onları burada görəcəksiniz.
                    </CustomText>
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={{ padding: 16 }}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    data={notifications}
                    keyExtractor={(item) => item?.id.toString()}
                    renderItem={({ item }) => {
                        console.log(item?.ad);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    goCommentsPage(item?.ad?.id);
                                }}
                            >
                                <View style={internalStyles.notItem}>
                                    <View style={{ width: '20%' }}>
                                        <Avatar
                                            size={60}
                                            source={{ uri: item.sender?.photo }}
                                            rounded
                                        />
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <CustomText style={internalStyles.title}>
                                            <CustomText
                                                style={{
                                                    ...internalStyles.title,
                                                    fontFamily: NunitoBold,
                                                    color: mainTextColor,
                                                }}
                                            >
                                                {item.sender?.username}
                                            </CustomText>
                                            {item?.title.split(`@${item.sender?.username}`)[1]}
                                        </CustomText>
                                        <CustomText style={internalStyles.body}>
                                            {item?.body}
                                        </CustomText>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            notificationStates.setSelectedNotification(item);
                                            generalStates.setBottomSheetVisible(true);
                                        }}
                                        style={{ width: '10%', height: 30 }}
                                    >
                                        <DotsIcon />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListFooterComponent={() => {
                        if (isLoadingMore) return <ActivityIndicator color={primaryColor} />;
                        return null;
                    }}
                />
            )}
            <CommonBottomSheet
                visible={generalStates.bottomSheetVisible}
                onClose={() => {
                    generalStates.setBottomSheetVisible(false);
                }}
                height={350}
            >
                {notificationStates.selectedNotification && (
                    <View style={{ marginTop: 24 }}>
                        <View
                            style={{
                                alignSelf: 'center',
                            }}
                        >
                            <Avatar
                                size={92}
                                source={{
                                    uri: notificationStates.selectedNotification?.sender?.photo,
                                }}
                                rounded
                            />
                        </View>
                        <CustomText style={internalStyles.bottomUserName}>
                            {notificationStates.selectedNotification?.sender?.username}
                        </CustomText>
                        <View style={internalStyles.bottomContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!notificationStates.selectedNotification?.sender?.id)
                                        return;
                                    userProfile(
                                        notificationStates.selectedNotification?.sender?.id,
                                    );
                                }}
                                style={internalStyles.menuItem}
                            >
                                <CustomText style={internalStyles.menuText}>
                                    İstifadəçinin profili
                                </CustomText>
                            </TouchableOpacity>
                            <View style={internalStyles.menuItem}>
                                <CustomText style={internalStyles.menuText}>Blok et</CustomText>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!notificationStates.selectedNotification?.id) return;
                                    deleteNotification(notificationStates.selectedNotification?.id);
                                    generalStates.setBottomSheetVisible(false);
                                }}
                                style={{ ...internalStyles.menuItem, borderBottomWidth: 0 }}
                            >
                                <CustomText style={{ ...internalStyles.menuText, color: 'red' }}>
                                    Bildirişi sil
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </CommonBottomSheet>
        </View>
    );
};

export default observer(NotificationPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: lightBorder,
        paddingVertical: 12,
    },
    username: {
        fontFamily: NunitoBold,
        fontSize: 16,
    },
    title: {
        fontFamily: NunitoMedium,
        fontSize: 14,
        width: '100%',
        color: inactiveColor,
    },
    body: {
        fontSize: 14,
        fontFamily: NunitoBold,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    bottomUserName: {
        textAlign: 'center',
        fontFamily: NunitoBold,
        fontSize: 16,
        marginTop: 8,
    },
    menuItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
    },
    menuText: {
        fontFamily: NunitoBold,
        fontSize: 16,
        textAlign: 'center',
        color: blueColor,
    },
    notFoundContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    notFoundText: {
        fontFamily: NunitoBold,
        fontSize: 16,
        lineHeight: 25,
        marginTop: 16,
    },
    notFoundSubText: {
        color: inactiveColor,
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
});
