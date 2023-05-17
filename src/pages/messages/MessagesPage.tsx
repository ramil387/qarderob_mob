import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    NunitoBold,
    blueColor,
    f5Color,
    f8Color,
    inactiveColor,
    lightBorder,
    phoneWidth,
    primaryColor,
    shadowColor,
} from '@/styles/variables';
import {
    NavigationProp,
    ParamListBase,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { fetchInbox } from '@/states/messages/fetchInbox';
import { toJS } from 'mobx';
import messageStates from '@/states/messages/messageStates';
import { MessageType } from '@/types/messageType';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import BlockIcon from '@/icons/message/BlockIcon';
import DeleteIcon from '@/icons/message/DeleteIcon';
import LoadingComponent from '@/components/common/LoadingComponent';
import { blockUser } from '@/states/messages/blockUser';
import generalStates from '@/states/general/generalStates';
import { deleteInboxItem } from '@/states/messages/deleteInboxItem';

const Tab = createMaterialTopTabNavigator();

const InboxItem = memo(
    observer(
        ({ item, navigate }: { item: MessageType; navigate: NavigationProp<ParamListBase> }) => {
            const block = (userId: number) => {
                if (!item?.conversation_partner.is_blocked) {
                    generalStates.setDialogAction(true);
                    generalStates.setCommonDialogVisible(true);
                    generalStates.setDialogCancelText('Xeyr');
                    generalStates.setDialogOkText('Bəli');
                    generalStates.setOkFunc(() => {
                        blockUser(userId);
                        generalStates.setCommonDialogVisible(false);
                    });
                    generalStates.setDialogHeader('Bloklamaq istədiyinizə əminsiniz?');
                    generalStates.setDialogType('warning');
                    generalStates.setDialogBody(
                        `${item?.conversation_partner?.name} sizə mesaj yaza bilməyəcək.`,
                    );
                    generalStates.setCancelFunc(() => {
                        generalStates.setCommonDialogVisible(false);
                    });
                } else {
                    generalStates.setDialogAction(true);
                    generalStates.setCommonDialogVisible(true);
                    generalStates.setDialogCancelText('Xeyr');
                    generalStates.setDialogOkText('Bəli');
                    generalStates.setOkFunc(() => {
                        blockUser(userId);
                        generalStates.setCommonDialogVisible(false);
                    });
                    generalStates.setDialogHeader('Blokdan çıxarmaq istədiyinizə əminsiniz?');
                    generalStates.setDialogType('warning');
                    generalStates.setDialogBody(
                        `${item?.conversation_partner?.name} sizə mesaj yaza biləcək.`,
                    );
                    generalStates.setCancelFunc(() => {
                        generalStates.setCommonDialogVisible(false);
                    });
                }
            };

            const deleteItem = (id: number) => {
                generalStates.setDialogAction(true);
                generalStates.setCommonDialogVisible(true);
                generalStates.setDialogCancelText('Xeyr');
                generalStates.setDialogOkText('Bəli');
                generalStates.setOkFunc(() => {
                    deleteInboxItem(id);
                    generalStates.setCommonDialogVisible(false);
                });
                generalStates.setDialogHeader('Mesajı silmək istədiyinizə əminsiniz?');
                generalStates.setDialogType('warning');
                generalStates.setCancelFunc(() => {
                    generalStates.setCommonDialogVisible(false);
                });
            };

            const goChat = () => {
                messageStates.setSelectedInbox(item);
                navigate.navigate('ChatPage', { id: item?.id });
            };

            return (
                <Pressable onPress={goChat} style={internalStyles.inboxItemContainer}>
                    <View style={internalStyles.avatarContainer}>
                        <Avatar
                            size={52}
                            rounded
                            source={{ uri: item.conversation_partner?.img }}
                        />
                        {item?.conversation_partner.is_blocked && (
                            <View style={internalStyles.blockedContainer}>
                                <BlockIcon style={{ color: 'red' }} />
                            </View>
                        )}
                    </View>
                    <View style={internalStyles.infoContainer}>
                        <CustomText style={internalStyles.username}>
                            {item?.conversation_partner.name}
                        </CustomText>
                        <CustomText style={internalStyles.productName}>
                            {item?.ad?.title}
                        </CustomText>
                        <CustomText numberOfLines={1}>
                            {item?.message}
                            adnsajkdnasjkndjkasndjkasndjkasndjkasndjka
                        </CustomText>
                    </View>
                    <View style={internalStyles.actionContainer}>
                        <TouchableOpacity
                            onPress={() => block(item?.conversation_partner.user_id)}
                            style={{ ...internalStyles.actionItemContainer }}
                        >
                            <BlockIcon style={{ color: blueColor }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => deleteItem(item?.id)}
                            style={{ ...internalStyles.actionItemContainer }}
                        >
                            <DeleteIcon style={{ color: primaryColor }} />
                        </TouchableOpacity>
                    </View>
                </Pressable>
            );
        },
    ),
);

const InboxComponent = observer(() => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);
    const route = useRoute();
    const inbox = toJS(messageStates.inbox);

    useFocusEffect(
        React.useCallback(() => {
            messageStates.setInboxType(route.name.toLowerCase());
            setIsLoading(true);
            fetchInbox(route.name.toLowerCase()).finally(() => {
                setIsLoading(false);
            });
        }, [route.name]),
    );

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <View style={internalStyles.inboxContainer}>
            <FlatList
                data={inbox?.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <InboxItem item={item} navigate={navigate} />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
        </View>
    );
});

const MessagesPage = () => {
    return (
        <View style={internalStyles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarPressColor: 'transparent',
                    tabBarActiveTintColor: primaryColor,
                    tabBarIndicatorStyle: {
                        backgroundColor: primaryColor,
                    },
                    tabBarInactiveTintColor: inactiveColor,
                    tabBarLabelStyle: {
                        fontFamily: NunitoBold,
                    },
                    tabBarStyle: {
                        backgroundColor: f5Color,
                        shadowColor: 'none',
                        elevation: 0,
                    },
                    tabBarItemStyle: {
                        width: phoneWidth / 3,
                    },
                    tabBarScrollEnabled: true,
                }}
                sceneContainerStyle={{
                    backgroundColor: f8Color,
                }}
            >
                <Tab.Screen
                    navigationKey='true'
                    name={'All'}
                    key='all'
                    component={InboxComponent}
                    options={{ tabBarLabel: 'Hamısı' }}
                />
                <Tab.Screen
                    navigationKey='true'
                    name={'Incoming'}
                    key='sell'
                    component={InboxComponent}
                    options={{ tabBarLabel: 'Satış' }}
                />
                <Tab.Screen
                    navigationKey='true'
                    name={'Outgoing'}
                    key='true'
                    component={InboxComponent}
                    options={{ tabBarLabel: 'Alış' }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default observer(MessagesPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inboxContainer: {
        padding: 16,
        flex: 1,
    },
    inboxItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: lightBorder,
    },
    avatarContainer: {
        width: '15%',
    },
    infoContainer: {
        width: '70%',
    },
    username: {
        fontSize: 16,
        fontFamily: NunitoBold,
    },
    productName: {
        color: inactiveColor,
    },
    actionContainer: {
        width: '10%',
    },
    actionItemContainer: {
        width: '100%',
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderLeftWidth: 1,
        paddingLeft: 4,
        borderBottomWidth: 1,
        borderBottomColor: shadowColor,
        borderLeftColor: shadowColor,
    },
    blockedContainer: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
});
