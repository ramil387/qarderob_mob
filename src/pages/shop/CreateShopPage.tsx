import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { shopCoverImage, shopLogoImage } from '@/constants';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import { f5Color, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import AddPhotoIcon from '@/icons/shop/AddPhotoIcon';

const TopContainer = memo(
    observer(() => {
        const user = toJS(profileStates?.user);
        const shop = toJS(user?._store);
        const coverImgUrl = shop?.cover ? shop?.cover : shopCoverImage;
        const profileImgUrl = shop?.img ? shop?.img : shopLogoImage;
        return (
            <View style={internalStyles.topContainer}>
                <Image style={internalStyles.coverImage} source={{ uri: coverImgUrl }} />
                <View style={internalStyles.logoImage}>
                    <Avatar
                        source={{ uri: profileImgUrl }}
                        containerStyle={{ width: 92, height: 92 }}
                        avatarStyle={{ borderRadius: 100 }}
                    />
                    <TouchableOpacity style={internalStyles.profileAddIcon}>
                        <AddPhotoIcon style={{ color: primaryColor }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={internalStyles.coverAddIcon}>
                    <AddPhotoIcon style={{ color: primaryColor, width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
        );
    }),
);

const CreateShopPage = () => {
    const fields = [
        {
            label: 'Adı',
            placeholder: 'Mağaza Adını daxil edin',
            key: 'name',
        },
        {
            label: 'Haqqında',
            placeholder: 'Mağaza haqqında məlumat daxil edin',
            key: 'desc',
        },
        {
            label: 'Ünvan',
            placeholder: 'Ünvanı daxil edin',
            key: 'address',
        },
        {
            label: 'Telefon',
            placeholder: 'Telefonu daxil edin',
            key: 'phone',
        },
        {
            label: 'E-mail',
            placeholder: 'E-mail daxil edin',
            key: 'email',
        },
        {
            label: 'Başlama saatı',
            placeholder: 'Başlama saatını daxil edin',
            key: 'end_hour',
        },
        {
            label: 'Bitmə saatı',
            placeholder: 'Bitmə saatını daxil edin',
            key: 'start_hour',
        },
        {
            label: 'İş günləri',
            placeholder: 'İş günlərini seçin',
            key: 'work_days',
        },
    ];

    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <View style={internalStyles?.formContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {fields.map((field, index) => {
                        return (
                            <View style={internalStyles.formItemContainer} key={index}>
                                <CustomText>{field.label}</CustomText>
                                <View style={internalStyles?.inputContainer}>
                                    <CustomTextInput
                                        style={{ paddingHorizontal: 16 }}
                                        placeholder={field?.placeholder}
                                    />
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={internalStyles.submitBtn}>
                <CustomMainButton func={() => {}} title={'Mağazanı yarat'} />
            </View>
        </View>
    );
};

export default observer(CreateShopPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {},
    coverImage: {
        width: '100%',
        height: 120,
    },
    logoImage: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -46,
    },
    formContainer: {
        flex: 1,
        marginTop: 42,
        paddingHorizontal: 16,
        overflow: 'hidden',
        paddingBottom: 48,
    },
    formItemContainer: {
        paddingVertical: 16,
    },
    inputContainer: {
        borderRadius: 8,
        backgroundColor: f5Color,
    },
    submitBtn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    coverAddIcon: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: f5Color,
        padding: 8,
        borderRadius: 100,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAddIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: f5Color,
        padding: 4,
        borderRadius: 100,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
