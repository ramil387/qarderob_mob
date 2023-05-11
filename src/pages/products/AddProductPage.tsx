import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import BigCameraIcon from '@/icons/product/BigCameraIcon';
import { NunitoBold, NunitoMedium, e5Color, f5Color, primaryColor } from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import SmCameraIcon from '@/icons/product/SmCameraIcon';
import { observer } from 'mobx-react-lite';
import CustomTextInput from '@/components/ui/CustomTextInput';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import profileStates from '@/states/profile/profileStates';
import { toJS } from 'mobx';
import PhoneInput from '@/components/common/PhoneInput';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '@/states/product/addProduct/setImage';
import { ImageBackground } from 'react-native';

const ImagesContainer = memo(
    observer(() => {
        const images = [1, 2, 3, 4];
        const addImage = () => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    // includeBase64: true,
                    includeExtra: true,
                    quality: 0.7,
                    selectionLimit: 5,
                },
                (response) => {
                    const images = response.assets;
                    setImages(images || undefined);
                },
            );
        };

        const imagesUrls = [
            {
                updatedUrl: '',
                currentUrl: '',
            },
        ];

        return (
            <View style={internalStyles.imageContainer}>
                <View style={internalStyles.firstImage}>
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 8 }}
                        source={{
                            uri: 'https://storage.qarderob.az/a/2123/lg/rc-upload-1683827611802-6573.jpg',
                        }}
                    />

                    {/* <TouchableOpacity onPress={addImage}>
                        <BigCameraIcon />
                    </TouchableOpacity> */}
                </View>
                <View style={internalStyles.secondImageContainer}>
                    {images.map((image) => {
                        return (
                            <View style={internalStyles.secondImage} key={image}>
                                {/* <CustomText>{image}</CustomText> */}
                                <SmCameraIcon />
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }),
);

const FormContainer = memo(
    observer(() => {
        const fields = [
            {
                label: 'Kateqoriya',
                key: 'category',
            },
            {
                label: 'Brend',
                key: 'brand',
            },
            {
                label: 'Məhsulun vəziyyəti',
                key: 'productStatus',
            },
            {
                label: 'Ölçü',
                key: 'size',
            },
            {
                label: 'Rəng',
                key: 'color',
            },
            {
                label: 'Qiymət',
                key: 'price',
            },
        ];
        return (
            <View style={internalStyles.formContainer}>
                <View style={internalStyles.formItemContainer}>
                    <CustomText style={internalStyles.headText}>Məhsul haqqında</CustomText>
                    <View style={internalStyles.descInpContainer}>
                        <CustomTextInput
                            style={internalStyles.inp}
                            placeholder='Məs: Yeni alınıb və bir dəfə geyinilib.'
                        />
                    </View>
                </View>
                <View style={internalStyles.formItemContainer}>
                    <CustomText style={internalStyles.headText}>Xüsusiyyətləri</CustomText>
                </View>
                {fields.map((field, index) => {
                    return (
                        <View key={index}>
                            {field?.key === 'price' ? (
                                <View style={internalStyles.fieldItem}>
                                    <CustomText style={internalStyles.fieldText}>
                                        {field.label}
                                    </CustomText>
                                    <View style={internalStyles.priceInpContainer}>
                                        <CustomTextInput
                                            placeholder='Qiymət'
                                            icon={
                                                <View style={internalStyles.priceInpSuffix}>
                                                    <CustomText
                                                        style={internalStyles.placeHolderText}
                                                    >
                                                        ₼
                                                    </CustomText>
                                                </View>
                                            }
                                            style={internalStyles.priceInp}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity style={internalStyles.fieldItem}>
                                    <CustomText style={internalStyles.fieldText}>
                                        {field.label}
                                    </CustomText>
                                    <ChevronRightIcon style={{ color: primaryColor }} />
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    }),
);

const ContactContainer = memo(
    observer(() => {
        const user = toJS(profileStates.user);
        return (
            <View style={internalStyles.contactContainer}>
                <CustomText style={internalStyles.headText}>Əlaqə məlumatları</CustomText>

                <View style={{ marginTop: 16 }}>
                    <CustomText style={internalStyles.contactLabel}>Ad/Soyad *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <CustomTextInput
                            style={internalStyles.inp}
                            placeholder='Ad soyadı daxil edin'
                        />
                    </View>
                    <CustomText style={internalStyles.contactLabel}>E-mail *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <CustomTextInput
                            style={internalStyles.inp}
                            placeholder='Ad soyadı daxil edin'
                        />
                    </View>
                    <CustomText style={internalStyles.contactLabel}>Telefon *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <PhoneInput
                        // style={internalStyles.inp}
                        />
                    </View>
                </View>
                <View style={internalStyles.hidePhoneContainer}>
                    {/* <OutlineSquareIcon /> */}
                    <FillSquareIcon />
                    <CustomText>Nömrəni gizlət</CustomText>
                </View>
            </View>
        );
    }),
);

const AddProductPage = () => {
    return (
        <View style={internalStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImagesContainer />
                <FormContainer />
                <ContactContainer />
            </ScrollView>
            <CustomMainButton func={() => {}} title='Dərc et' />
        </View>
    );
};

export default AddProductPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        height: 160,
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    firstImage: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: e5Color,
        width: '48%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    secondImageContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '48%',
        height: 160,
        rowGap: 10,
    },
    secondImage: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: e5Color,
        width: '48%',
        height: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // form
    formContainer: {
        display: 'flex',
        flex: 1,
    },
    formItemContainer: {
        marginVertical: 8,
    },
    headText: {
        fontSize: 22,
        fontFamily: NunitoBold,
        lineHeight: 28,
    },
    descInpContainer: {
        height: 88,
        backgroundColor: f5Color,
        borderRadius: 8,
        marginTop: 8,
    },
    inp: {
        paddingLeft: 16,
    },
    fieldItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldText: {
        fontFamily: NunitoMedium,
        lineHeight: 21,
        fontSize: 16,
    },
    priceInpContainer: {
        backgroundColor: f5Color,
        height: 40,
        width: 100,
        borderRadius: 8,
    },
    priceInp: {
        height: '100%',
        paddingLeft: 16,
    },
    priceInpSuffix: {
        position: 'absolute',
        right: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
    },
    placeHolderText: {
        fontSize: 20,
        fontFamily: NunitoBold,
        color: primaryColor,
    },
    // contact
    contactContainer: {
        marginVertical: 24,
    },
    inpContainer: {
        backgroundColor: f5Color,
        borderRadius: 8,
    },
    contactLabel: {
        fontFamily: NunitoMedium,
        lineHeight: 21,
        fontSize: 16,
        marginVertical: 8,
    },
    hidePhoneContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
    },
});
