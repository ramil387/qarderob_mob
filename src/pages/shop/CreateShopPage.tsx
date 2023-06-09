import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { shopCoverImage, shopLogoImage } from '@/constants';
import { Avatar } from '@rneui/themed';
import CustomText from '@/components/ui/CustomText';
import { NunitoMedium, e5Color, f5Color, lightBorder, primaryColor } from '@/styles/variables';
import CustomTextInput from '@/components/ui/CustomTextInput';
import CustomMainButton from '@/components/ui/CustomMainButton';
import AddPhotoIcon from '@/icons/shop/AddPhotoIcon';
import PhoneInput from '@/components/common/PhoneInput';
import shopStates from '@/states/shop/shopStates';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import { defineWorkingDays } from '@/helper/defineWorkingDays';
import { createShop, uploadShopImage } from '@/states/shop/createShop';
import HoursModal from '@/components/common/HoursModal';
import { launchImageLibrary } from 'react-native-image-picker';
import LoadingComponent from '@/components/common/LoadingComponent';

const TopContainer = memo(
    observer(() => {
        const user = toJS(profileStates?.user);
        const shop = toJS(user?._store);
        const coverImgUrl =
            Object.keys(shopStates?.shopCover).length > 1
                ? `data:image/png;base64,${shopStates?.shopCover?.base64}`
                : shop?.cover
                ? shop?.cover
                : shopCoverImage;
        const profileImgUrl =
            Object.keys(shopStates?.shopImg).length > 1
                ? `data:image/png;base64,${shopStates?.shopImg?.base64}`
                : shop?.img
                ? shop?.img
                : shopLogoImage;

        const setImg = (type: string) => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    quality: 0.7,
                    selectionLimit: 1,
                },
                (response) => {
                    const image: any = response?.assets;
                    if (!shopStates?.imageDate) {
                        shopStates.setImageDate(Date.now().toString());
                    }
                    if (response?.assets) {
                        uploadShopImage(image[0], shopStates?.imageDate, type);
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
    const [isWorkingDaysModalVisible, setIsWorkingDaysModalVisible] = React.useState(false);
    const workingDays = [
        {
            label: 'Bazar e. - Cümə',
            id: '1',
        },
        {
            label: 'Bazar e. - Şənbə',
            id: '2',
        },
        {
            label: 'Hər gün',
            id: '3',
        },
    ];
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
            func: (text: string) => shopStates.setWorkDays(text as '1' | '2' | '3'),
        },
        {
            label: 'Facebook linki',
            placeholder: 'Facebook linkini daxil edin',
            key: 'facebook',
            value: shopStates?.facebook,
            func: (text: string) => shopStates.setFacebook(text),
        },
        {
            label: 'Instagram linki*',
            placeholder: 'Instagram linkini daxil edin',
            key: 'instagram',
            value: shopStates?.instagram,
            func: (text: string) => shopStates.setInstagram(text),
        },
        {
            label: 'Tiktok linki',
            placeholder: 'Tiktok linkini daxil edin',
            key: 'tiktok',
            value: shopStates?.tiktok,
            func: (text: string) => shopStates.setTiktok(text),
        },
    ];

    useEffect(() => {
        if (shopStates?.address === 'Onlayn mağaza') {
            shopStates?.setIsOnline(true);
        }
        return () => {
            shopStates.resetCreateShop();
        };
    }, []);

    if (shopStates?.isCreateShopLoading) {
        return <LoadingComponent />;
    }

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
                                    ) : field?.key === 'work_days' ? (
                                        <View style={{ position: 'relative' }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setIsWorkingDaysModalVisible(
                                                        !isWorkingDaysModalVisible,
                                                    )
                                                }
                                                style={internalStyles.workDays}
                                            >
                                                <CustomText>
                                                    {defineWorkingDays(shopStates?.work_days)}
                                                </CustomText>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    ...internalStyles.workDaysModal,
                                                    display: isWorkingDaysModalVisible
                                                        ? 'flex'
                                                        : 'none',
                                                }}
                                            >
                                                {workingDays.map((day, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={{
                                                                ...internalStyles.workDayItem,
                                                                borderBottomWidth:
                                                                    index === workingDays.length - 1
                                                                        ? 0
                                                                        : 1,
                                                            }}
                                                            key={index}
                                                            onPress={() => {
                                                                shopStates.setWorkDays(
                                                                    day?.id as '1' | '2' | '3',
                                                                );
                                                                setIsWorkingDaysModalVisible(false);
                                                            }}
                                                        >
                                                            <CustomText
                                                                style={{ fontFamily: NunitoMedium }}
                                                            >
                                                                {day?.label}
                                                            </CustomText>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        </View>
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
                                        onPress={() => {
                                            shopStates.setAddress('Onlayn mağaza');
                                            shopStates.setIsOnline(!shopStates?.isOnline);
                                        }}
                                        style={internalStyles?.isOnlineContainer}
                                    >
                                        {shopStates?.isOnline ? (
                                            <FillSquareIcon />
                                        ) : (
                                            <OutlineSquareIcon />
                                        )}
                                        <CustomText>Onlayn mağaza</CustomText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={internalStyles.submitBtn}>
                <CustomMainButton
                    func={createShop}
                    title={shopStates?.isUpdate ? 'Düzəliş et' : 'Mağazanı yarat'}
                />
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
    topContainer: { zIndex: 999 },
    coverImage: {
        width: '100%',
        height: 150,
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
        bottom: 8,
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
    workDays: {
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    workDaysModal: {
        position: 'absolute',
        bottom: 48,
        width: '100%',
        minHeight: 90,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: 16,
        // shadow top
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: e5Color,
    },
    workDayItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: lightBorder,
    },
});
