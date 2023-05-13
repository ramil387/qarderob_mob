import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { shopCoverImage, shopLogoImage } from '@/constants';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, f5Color, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import AddPhotoIcon from '@/icons/shop/AddPhotoIcon';
import PhoneInput from '@/components/common/PhoneInput';
import shopStates from '@/states/shop/shopStates';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import { defineWorkingDays } from '@/helper/defineWorkingDays';
import { createShop } from '@/states/shop/createShop';
import HoursModal from '@/components/common/HoursModal';
import { launchImageLibrary } from 'react-native-image-picker';

const TopContainer = memo(
    observer(() => {
        const user = toJS(profileStates?.user);
        const shop = toJS(user?._store);
        const coverImgUrl = shop?.cover ? shop?.cover : shopCoverImage;
        const profileImgUrl = shop?.img ? shop?.img : shopLogoImage;

        const setImg = (type: string) => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    quality: 0.7,
                    selectionLimit: 1,
                },
                (response) => {
                    if (response?.assets) {
                        const image: any = response?.assets[0];
                        if (type === 'img') {
                            shopStates.setImg(image);
                        } else {
                            shopStates.setCover(image);
                        }
                    }
                },
            );
        };

        return (
            <View style={internalStyles.topContainer}>
                <Image style={internalStyles.coverImage} source={{ uri: coverImgUrl }} />
                <View style={internalStyles.logoImage}>
                    <Avatar
                        source={{ uri: profileImgUrl }}
                        containerStyle={{ width: 92, height: 92 }}
                        avatarStyle={{ borderRadius: 100 }}
                    />
                    <TouchableOpacity
                        onPress={() => setImg('img')}
                        style={internalStyles.profileAddIcon}
                    >
                        <AddPhotoIcon style={{ color: primaryColor }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => setImg('cover')}
                    style={internalStyles.coverAddIcon}
                >
                    <AddPhotoIcon style={{ color: primaryColor, width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
        );
    }),
);

const CreateShopPage = () => {
    const fields = [
        {
            label: 'Adı*',
            placeholder: 'Mağaza Adını daxil edin',
            key: 'name',
            value: shopStates?.name,
            func: (text: string) => shopStates.setName(text),
        },
        {
            label: 'Haqqında*',
            placeholder: 'Mağaza haqqında məlumat daxil edin',
            key: 'desc',
            value: shopStates?.desc,
            func: (text: string) => shopStates.setDesc(text),
        },
        {
            label: 'Ünvan',
            placeholder: 'Ünvanı daxil edin',
            key: 'address',
            value: shopStates?.address,
            func: (text: string) => shopStates.setAddress(text),
        },
        {
            label: 'Telefon*',
            placeholder: 'Telefonu daxil edin',
            key: 'phone',
            value: '',
            func: (text: string) => shopStates.setPhone(text),
        },
        {
            label: 'E-mail*',
            placeholder: 'E-mail daxil edin',
            key: 'email',
            value: shopStates?.email,
            func: (text: string) => shopStates.setEmail(text),
        },
        {
            label: 'İş saatları*',
            // placeholder: 'Başlama saatını daxil edin',
            key: 'hours',
            value: shopStates?.start_hour,
            func: (text: string) => shopStates.setStartHour(text),
        },
        {
            label: 'İş günləri*',
            placeholder: 'İş günlərini seçin',
            key: 'work_days',
            value: defineWorkingDays(shopStates?.work_days),
            func: (text: string) => shopStates.setWorkDays(Number(text)),
        },
    ];

    useEffect(() => {
        if (shopStates?.isOnline) {
            shopStates.setAddress('Onlayn mağaza');
        } else {
            shopStates.setAddress('');
        }
    }, [shopStates?.isOnline]);

    return (
        <View style={internalStyles.container}>
            <TopContainer />
            <View style={internalStyles?.formContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {fields.map((field, index) => {
                        return (
                            <View style={internalStyles.formItemContainer} key={index}>
                                <CustomText style={internalStyles?.label}>
                                    {field.label}:
                                </CustomText>
                                <View
                                    style={{
                                        ...internalStyles?.inputContainer,
                                        backgroundColor:
                                            field?.key === 'hours' ? 'transparent' : f5Color,
                                    }}
                                >
                                    {field?.key === 'phone' ? (
                                        <PhoneInput
                                            phone={shopStates.phone}
                                            setPhone={(text) => shopStates.setPhone(text)}
                                        />
                                    ) : field?.key === 'hours' ? (
                                        <TouchableOpacity
                                            onPress={() => shopStates.setIsHourModalOpen(true)}
                                            style={internalStyles.hourContainer}
                                        >
                                            <CustomText style={internalStyles.hourText}>
                                                <CustomText>Başlama saatı: </CustomText>
                                                {shopStates?.start_hour}
                                            </CustomText>
                                            <CustomText style={internalStyles.hourText}>
                                                <CustomText>Qapanış saatı: </CustomText>
                                                {shopStates?.end_hour}
                                            </CustomText>
                                        </TouchableOpacity>
                                    ) : (
                                        <CustomTextInput
                                            editable={
                                                field?.key === 'address' && shopStates?.isOnline
                                                    ? false
                                                    : true
                                            }
                                            onChangeText={field?.func}
                                            style={{
                                                paddingHorizontal: 16,
                                                height: field?.key === 'desc' ? 80 : 'auto',
                                                textAlignVertical:
                                                    field?.key === 'desc' ? 'top' : 'center',
                                            }}
                                            placeholder={field?.placeholder}
                                            multiline={field?.key === 'desc' ? true : false}
                                            value={String(field?.value)}
                                        />
                                    )}
                                </View>
                                {field?.key === 'address' && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            shopStates.setIsOnline(!shopStates?.isOnline)
                                        }
                                        style={internalStyles?.isOnlineContainer}
                                    >
                                        {shopStates?.isOnline ? (
                                            <FillSquareIcon />
                                        ) : (
                                            <OutlineSquareIcon />
                                        )}
                                        <CustomText>Online mağaza</CustomText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={internalStyles.submitBtn}>
                <CustomMainButton func={createShop} title={'Mağazanı yarat'} />
            </View>
            <HoursModal />
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
    label: {
        fontFamily: NunitoMedium,
        fontSize: 16,
        paddingBottom: 4,
    },
    isOnlineContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
    },
    hourContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: f5Color,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    hourText: {
        fontFamily: NunitoMedium,
        width: '50%',
        textAlign: 'center',
        color: primaryColor,
    },
});
