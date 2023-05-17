import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchChat } from '@/states/messages/fetchChat';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { toJS } from 'mobx';
import messageStates from '@/states/messages/messageStates';
import CustomText from '@/components/ui/CustomText';
import profileStates from '@/states/profile/profileStates';
import {
    NunitoBold,
    NunitoMedium,
    e0Color,
    f5Color,
    inactiveColor,
    primaryColor,
} from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SendIcon from '@/icons/notification/SendIcon';
import moment from 'moment';
import { getAdImageBySize } from '@/utils/getImageBySize';
import filterStates from '@/states/filter/filterStates';
import { fetchSingleProductById } from '@/states/product/fetchSingleProduct';
import productStates from '@/states/product/productStates';

const SuffixIcon = ({ sendMessage }: { sendMessage: () => void }) => {
    return (
        <TouchableOpacity onPress={sendMessage} style={internalStyles.suffix}>
            <SendIcon />
        </TouchableOpacity>
    );
};

const TopContainer = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();

        const inbox = toJS(messageStates.selectedInbox);
        const product = inbox?.ad;
        const categoryName = filterStates.sortedCategories.find(
            (item) => item.id === product?.category_id,
        )?.name_az;

        const goProductDetailPage = async () => {
            const resp = await fetchSingleProductById(product?.id);
            if (resp) {
                productStates.setSelectedProduct(resp.data);
                navigate.navigate('ProductDetailPage');
            }
        };

        return (
            <TouchableOpacity onPress={goProductDetailPage} style={internalStyles.topContainer}>
                <View>
                    <Image
                        style={internalStyles.productImage}
                        source={{ uri: getAdImageBySize('md', product?.id, product?.images[0]) }}
                    />
                </View>
                <View>
                    <CustomText style={internalStyles.category}>{categoryName}</CustomText>
                    <CustomText style={internalStyles.productName}>{product?.title}</CustomText>
                    <CustomText style={internalStyles.productPrice}>{product?.price}₼</CustomText>
                </View>
            </TouchableOpacity>
        );
    }),
);

const chatItem = ({ item }: { item: any }) => {
    const isMyMessage = item.message_sender?.user_id === profileStates?.user?.id;
    return (
        <View
            style={{
                ...internalStyles.chatItemContainer,
                alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                backgroundColor: isMyMessage ? primaryColor : e0Color,
                padding: 16,
                borderRadius: 10,
                borderTopRightRadius: isMyMessage ? 0 : 10,
                borderTopLeftRadius: isMyMessage ? 10 : 0,
                marginTop: 16,
                width: '70%',
            }}
        >
            <View>
                <CustomText
                    style={{
                        color: isMyMessage ? '#fff' : '#000',
                        fontFamily: NunitoMedium,
                        fontSize: 16,
                    }}
                >
                    {item?.message}
                </CustomText>
                <CustomText
                    style={{
                        ...internalStyles.chatDate,
                        color: isMyMessage ? '#fff' : inactiveColor,
                    }}
                >
                    {moment(item.createdAt).format('lll')}
                </CustomText>
            </View>
        </View>
    );
};

const ChatPage = () => {
    const route: any = useRoute();
    const { id } = route.params;
    const chat = toJS(messageStates.chat);

    useEffect(() => {
        fetchChat(id);
    }, []);

    return (
        <>
            <View>
                <TopContainer />
            </View>
            <View style={internalStyles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            display: 'flex',
                            minHeight: '100%',
                            flexDirection: 'column-reverse',
                            justifyContent: 'flex-end',
                        }}
                        inverted
                        data={chat?.data?.messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={chatItem}
                    />
                </View>
                <View style={internalStyles.inpContainer}>
                    <CustomTextInput
                        icon={<SuffixIcon />}
                        placeholder='Mesaj göndər'
                        style={internalStyles.inp}
                    />
                </View>
            </View>
        </>
    );
};

export default observer(ChatPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    chatItemContainer: {
        paddingVertical: 8,
    },
    inpContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
        marginTop: 16,
    },
    inp: {
        paddingLeft: 16,
    },
    suffix: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    chatDate: {
        fontSize: 10,
        fontFamily: NunitoMedium,
        textAlign: 'right',
    },
    topContainer: {
        backgroundColor: f5Color,
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    category: {
        fontSize: 12,
        fontFamily: NunitoBold,
        color: inactiveColor,
    },
    productName: {
        fontSize: 16,
        fontFamily: NunitoBold,
    },
    productPrice: {
        fontFamily: NunitoBold,
    },
});
