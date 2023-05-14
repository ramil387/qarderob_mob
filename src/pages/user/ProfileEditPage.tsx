import { View, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { NunitoMedium, e5Color, f5Color, lightBorder, primaryColor } from '@/styles/variables';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import profileStates from '@/states/profile/profileStates';
import { shopCoverImage, userProfileImage } from '@/constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import { Avatar } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import AddPhotoIcon from '@/icons/shop/AddPhotoIcon';
import { ScrollView } from 'react-native';
import CustomText from '@/components/ui/CustomText';
import PhoneInput from '@/components/common/PhoneInput';
import CustomTextInput from '@/components/ui/CustomTextInput';
import { editProfile, uploadProfileImage } from '@/states/profile/editProfile';
import CustomMainButton from '@/components/ui/CustomMainButton';

const TopContainer = memo(
    observer(() => {
        const user = toJS(profileStates?.user);
        const coverImgUrl =
            Object.keys(profileStates?.setProfileCover).length > 1
                ? `data:image/png;base64,${profileStates?.setProfileCover?.base64}`
                : user?.cover
                ? user?.cover
                : shopCoverImage;
        const profileImgUrl =
            Object.keys(profileStates?.profileImg).length > 1
                ? `data:image/png;base64,${profileStates?.profileImg?.base64}`
                : user?.photo
                ? user?.photo
                : userProfileImage;

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
                    if (!profileStates?.imageDate) {
                        profileStates.setImageDate(Date.now().toString());
                    }
                    if (response?.assets) {
                        uploadProfileImage(image[0], profileStates?.imageDate, type);
                    }
                },
            );
        };

        return (
            <View style={internalStyles.topContainer}>
                <Image
                    style={{
                        ...internalStyles.coverImage,
                        display: user?.is_inf === 'true' || user?.isFamous ? 'flex' : 'none',
                    }}
                    source={{ uri: coverImgUrl }}
                />
                <View
                    style={{
                        ...internalStyles.logoImage,
                        position:
                            user?.is_inf === 'true' || user?.isFamous ? 'absolute' : 'relative',
                    }}
                >
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
                    style={{
                        ...internalStyles.coverAddIcon,
                        display: user?.is_inf === 'true' || user?.isFamous ? 'flex' : 'none',
                    }}
                >
                    <AddPhotoIcon style={{ color: primaryColor, width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>
        );
    }),
);

const ProfileEditPage = () => {
    const fields = [
        {
            label: 'Ad/Soyad',
            value: profileStates.full_name,
            key: 'full_name',
            placeholder: 'Ad və soyadınızı daxil edin',
            func: (text: string) => profileStates.setFullName(text),
        },
        {
            label: 'İstifadəçi adı',
            value: profileStates.username,
            key: 'username',
            placeholder: 'İstifadəçi adınızı daxil edin',
            func: (text: string) => profileStates.setUsername(text),
        },
        {
            label: 'E-mail',
            value: profileStates.email,
            key: 'email',
            placeholder: 'E-mailinizi daxil edin',
            func: (text: string) => profileStates.setEmail(text),
        },
        {
            label: 'Telefon',
            key: 'phone',
            placeholder: 'Telefon nömrənizi daxil edin',
            func: (text: string) => profileStates.setPhone(text),
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
                                <CustomText style={internalStyles?.label}>
                                    {field.label}:
                                </CustomText>
                                <View style={internalStyles?.inputContainer}>
                                    {field?.key === 'phone' ? (
                                        <PhoneInput
                                            phone={profileStates.phone}
                                            setPhone={(text) => profileStates.setPhone(text)}
                                        />
                                    ) : (
                                        <CustomTextInput
                                            onChangeText={field?.func}
                                            style={{
                                                paddingHorizontal: 16,
                                            }}
                                            placeholder={field?.placeholder}
                                            multiline={field?.key === 'desc' ? true : false}
                                            value={String(field?.value)}
                                        />
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={internalStyles.submitBtn}>
                <CustomMainButton func={editProfile} title={'Düzəliş et'} />
            </View>
        </View>
    );
};

export default observer(ProfileEditPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {},
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
