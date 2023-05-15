import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { memo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import CustomText from '@/components/ui/CustomText';
import { toJS } from 'mobx';
import notificationStates from '@/states/notifications/notificationStates';
import { CommentType } from '@/types/commentType';
import { Avatar } from '@rneui/themed';
import {
    NunitoBold,
    NunitoSemiBold,
    chatItemBackground,
    f5Color,
    inactiveColor,
    lightBorder,
    mainTextColor,
    phoneWidth,
} from '@/styles/variables';
import productStates from '@/states/product/productStates';
import { getAdImageBySize } from '@/utils/getImageBySize';
import { getImageRotations } from '@/helper/getImageRotations';
import TagIcon from '@/icons/product/TagIcon';
import SizeIcon from '@/icons/product/SizeIcon';
import ColorIcon from '@/icons/product/ColorIcon';
import { defineProductStatus } from '@/helper/defineProductStatus';
import moment from 'moment';
import CustomTextInput from '@/components/ui/CustomTextInput';
import SendIcon from '@/icons/notification/SendIcon';
import profileStates from '@/states/profile/profileStates';
import { showShouldAuth } from '@/helper/showShouldAuth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { fetchComments } from '@/states/notifications/fetchComments';

const SuffixIcon = ({ sendComment }: { sendComment: () => void }) => {
    return (
        <TouchableOpacity onPress={sendComment} style={internalStyles.suffix}>
            <SendIcon />
        </TouchableOpacity>
    );
};

const TopContainer = memo(
    observer(() => {
        const product = toJS(productStates.selectedProduct);
        return (
            <View style={internalStyles.topContainer}>
                <Image
                    style={{
                        transform: getImageRotations(product),
                        width: '25%',
                        height: '100%',
                        borderRadius: 8,
                    }}
                    source={{ uri: getAdImageBySize('md', product?.id, product?.images[0]) }}
                />
                <View>
                    <CustomText style={internalStyles.productName}>
                        {product?.title} / {product?.price}₼
                    </CustomText>
                    <CustomText
                        style={{
                            width: phoneWidth - 32 - 80,
                        }}
                        numberOfLines={1}
                    >
                        {product?.description}
                    </CustomText>
                    <View style={internalStyles.specContainer}>
                        <View style={internalStyles.specItemContainer}>
                            <TagIcon style={{ width: 14, height: 14 }} />
                            <CustomText>{defineProductStatus(product?.product_status)}</CustomText>
                        </View>
                        <View style={internalStyles.specItemContainer}>
                            <SizeIcon style={{ width: 14, height: 14 }} />
                            <CustomText>{product?.size}</CustomText>
                        </View>
                        <View style={internalStyles.specItemContainer}>
                            <ColorIcon style={{ width: 14, height: 14 }} />
                            <CustomText>{product?._color?.name}</CustomText>
                        </View>
                    </View>
                </View>
            </View>
        );
    }),
);

const CommentItem = ({ item }: { item: CommentType }) => {
    return (
        <>
            <View style={internalStyles.commentItem}>
                <Avatar
                    onPress={() => {
                        console.log('necesen');
                    }}
                    size={36}
                    source={{ uri: item?.sender.photo }}
                    rounded
                />
                <View
                    style={{
                        backgroundColor: chatItemBackground,
                        padding: 16,
                        borderRadius: 16,
                        width: phoneWidth - 32 - 24 - 36 - 16,
                    }}
                >
                    <CustomText style={internalStyles.username}>{item.sender?.username}</CustomText>
                    <CustomText style={internalStyles.comment}>
                        <CustomText
                            onPress={() => {
                                console.log(item);
                            }}
                            style={{ fontFamily: NunitoBold }}
                        >
                            @{item?.receiver?.username}
                        </CustomText>{' '}
                        {item?.comment.includes(`${item?.receiver?.username}`)
                            ? item?.comment.split(`${item?.receiver?.username}`)[1]
                            : item?.comment}
                    </CustomText>
                </View>
            </View>
            <View
                style={{
                    display: 'flex',
                    gap: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                }}
            >
                <CustomText style={{ paddingLeft: 44, color: inactiveColor, fontSize: 12 }}>
                    {moment(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                </CustomText>
                <View style={internalStyles.commentActions}>
                    <TouchableOpacity>
                        <CustomText style={internalStyles.deleteText}>Sil</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CustomText style={internalStyles.deleteText}>Cavabla</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 24, flex: 1 }}>
                <FlatList
                    // optimize
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    data={item.replies}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <CommentItem item={item} />;
                    }}
                />
            </View>
        </>
    );
};

const CommentsPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const comments = toJS(notificationStates.comments?.data);
    const flatRef = useRef<FlatList>(null);
    const sendComment = async () => {
        if (profileStates.token) {
            const body = {
                comment: notificationStates.commentText,
                receiver_id: notificationStates.receiver || productStates?.selectedProduct?.user_id,
                parent_id: notificationStates.parentCommentId,
                ad_id: productStates?.selectedProduct?.id,
            };
            const resp = await http.post(`${APIS.comments}/create`, body);
            if (resp?.status === 201) {
                await fetchComments(productStates?.selectedProduct?.id);
                notificationStates.setCommentText('');
                flatRef.current?.scrollToEnd();
            }
        } else {
            showShouldAuth(
                navigate,
                'Rəyiniz göndərilmədi',
                'Rəy bildirmək üçün hesabınıza daxil olun',
            );
        }
    };
    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <View style={{ flex: 1, paddingBottom: 66 }}>
                <FlatList
                    ref={flatRef}
                    showsVerticalScrollIndicator={false}
                    // optimize
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    ListHeaderComponent={() => {
                        return (
                            <CustomText style={internalStyles.commentCount}>
                                {notificationStates.comments?.count} rəy
                            </CustomText>
                        );
                    }}
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <CommentItem item={item} />;
                    }}
                />
            </View>
            <View style={internalStyles.inputContainer}>
                <CustomTextInput
                    onPressIn={() => {
                        flatRef.current?.scrollToEnd();
                    }}
                    icon={<SuffixIcon sendComment={sendComment} />}
                    style={{ paddingHorizontal: 16 }}
                    placeholder='Rəy bildir...'
                    onChangeText={(text) => {
                        notificationStates.setCommentText(text);
                    }}
                    value={notificationStates.commentText}
                />
            </View>
        </View>
    );
};

export default observer(CommentsPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    topContainer: {
        display: 'flex',
        borderBottomWidth: 1,
        paddingVertical: 16,
        borderBottomColor: lightBorder,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    productName: {
        fontSize: 18,
        fontFamily: NunitoBold,
    },
    commentCount: {
        fontFamily: NunitoBold,
        fontSize: 16,
        paddingVertical: 8,
    },
    specContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        flexWrap: 'wrap',
        width: '75%',
        justifyContent: 'space-between',
    },
    specItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    commentItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    username: {
        fontFamily: NunitoBold,
    },
    comment: {
        fontSize: 16,
        marginTop: 4,
    },
    commentActions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        // marginTop: 8,
        justifyContent: 'flex-end',
    },
    deleteText: {
        fontFamily: NunitoBold,
        fontSize: 12,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        backgroundColor: f5Color,
        borderRadius: 8,
        alignSelf: 'center',
    },
    suffix: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});
