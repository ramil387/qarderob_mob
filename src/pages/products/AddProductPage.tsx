import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    ActivityIndicator,
} from 'react-native';
import React, { memo, useEffect } from 'react';
import BigCameraIcon from '@/icons/product/BigCameraIcon';
import {
    NunitoBold,
    NunitoMedium,
    e5Color,
    f5Color,
    phoneWidth,
    primaryColor,
} from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import SmCameraIcon from '@/icons/product/SmCameraIcon';
import { observer } from 'mobx-react-lite';
import CustomTextInput from '@/components/ui/CustomTextInput';
import ChevronRightIcon from '@/icons/home/ChevronRightIcon';
import CustomMainButton from '@/components/ui/CustomMainButton';
import profileStates from '@/states/profile/profileStates';
import { runInAction, toJS } from 'mobx';
import PhoneInput from '@/components/common/PhoneInput';
import OutlineSquareIcon from '@/icons/filter/OutlineSquareIcon';
import FillSquareIcon from '@/icons/filter/FillSquareIcon';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setImages } from '@/states/product/addProduct/setImage';
import addProductStates from '@/states/product/addProduct/addProductStates';
import { getAdImageBySize } from '@/utils/getImageBySize';
import CloseIcon from '@/icons/error/CloseIcon';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import filterStates from '@/states/filter/filterStates';
import { defineProductStatus } from '@/helper/defineProductStatus';
import { addProductValidator } from '@/helper/addProductValidator';
import { createProduct } from '@/states/product/addProduct/createProduct';
import LoadingComponent from '@/components/common/LoadingComponent';

const ImageVariantModal = ({
    isCamera,
    setIsCamera,
}: {
    isCamera: boolean;
    setIsCamera: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <Modal visible={isCamera} transparent={true}>
            <View style={internalStyles.modalContainer}>
                <View style={internalStyles.contentContainer}>
                    <CustomMainButton
                        containerStyle={internalStyles.btnContainer}
                        title='Şəkil yüklə'
                        func={() => {
                            launchImageLibrary(
                                {
                                    mediaType: 'photo',
                                    includeBase64: true,
                                    includeExtra: true,
                                    quality: 0.7,
                                    selectionLimit: 5,
                                },
                                (response) => {
                                    const images = response.assets;
                                    setImages(images || undefined, setIsCamera);
                                },
                            );
                        }}
                    />
                    <CustomMainButton
                        containerStyle={internalStyles.btnContainer}
                        title='Şəkil çək'
                        func={() => {
                            launchCamera(
                                {
                                    mediaType: 'photo',
                                    includeBase64: true,
                                    includeExtra: true,
                                    quality: 0.7,
                                },
                                (response) => {
                                    const images = response.assets;
                                    setImages(images || undefined, setIsCamera);
                                },
                            );
                        }}
                    />
                    <CustomMainButton
                        containerStyle={internalStyles.btnContainer}
                        title='İmtina'
                        func={() => {
                            setIsCamera(false);
                        }}
                    ></CustomMainButton>
                </View>
            </View>
        </Modal>
    );
};

const ImagesContainer = memo(
    observer(() => {
        const product = toJS(addProductStates.updatedProduct);
        const [isCamera, setIsCamera] = React.useState(false);
        const images = [1, 2, 3, 4];
        const addImage = () => {
            setIsCamera(true);
        };

        const removeImage = (index: number) => {
            const images = addProductStates.images;
            runInAction(() => {
                images.splice(index, 1);
            });
        };

        const mainImageUrl = product
            ? getAdImageBySize('md', product?.id, product?.images[0])
            : addProductStates.images[0]
            ? `data:image/jpeg;base64,${addProductStates.images[0]?.base64}`
            : '';

        console.log(mainImageUrl);

        const secondaryImagesUrl = (index: number) => {
            return addProductStates.images[index]
                ? `data:image/jpeg;base64,${addProductStates.images[index]?.base64}`
                : product
                ? product?.images[index]
                    ? getAdImageBySize('md', product?.id, product?.images[index])
                    : ''
                : '';
        };

        return (
            <View style={internalStyles.imageContainer}>
                <View style={internalStyles.firstImage}>
                    {mainImageUrl.length > 0 ? (
                        <>
                            <Image
                                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                                source={{
                                    uri: mainImageUrl,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => removeImage(0)}
                                style={internalStyles.closeIcon}
                            >
                                <CloseIcon style={{ color: '#fff', width: 18, height: 18 }} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity onPress={addImage}>
                            <BigCameraIcon />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={internalStyles.secondImageContainer}>
                    {images.map((image, index) => {
                        return (
                            <View style={internalStyles.secondImage} key={image}>
                                {secondaryImagesUrl(index + 1).length > 0 ? (
                                    <>
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 8,
                                            }}
                                            source={{
                                                uri: secondaryImagesUrl(index + 1),
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => removeImage(image)}
                                            style={{
                                                ...internalStyles.closeIcon,
                                                right: 4,
                                                top: 4,
                                            }}
                                        >
                                            <CloseIcon
                                                style={{ color: '#fff', width: 12, height: 12 }}
                                            />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <TouchableOpacity onPress={addImage}>
                                        <SmCameraIcon />
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </View>
                <ImageVariantModal isCamera={isCamera} setIsCamera={setIsCamera} />
            </View>
        );
    }),
);

const FormContainer = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();
        const fields = [
            {
                label: 'Kateqoriya',
                key: 'category',
                page: () => navigate.navigate('CategoryFilterPage'),
                value: filterStates.sortedCategories.find(
                    (cat) => cat.id === addProductStates.categoryId,
                )?.name_az,
            },
            {
                label: 'Brend',
                key: 'brand',
                page: () => navigate.navigate('BrandFilterPage'),
                value: filterStates.brands.find((brand) => brand.id === addProductStates.brandId)
                    ?.name,
            },
            {
                label: 'Məhsulun vəziyyəti',
                key: 'productStatus',
                page: () => navigate.navigate('ProductStatusFilterPage'),
                value: defineProductStatus(addProductStates.productStatus),
            },
            {
                label: 'Ölçü',
                key: 'size',
                page: () => navigate.navigate('SizeFilterPage'),
                value: filterStates.sizes?.find((size) => size.id === addProductStates.sizeId)
                    ?.size,
            },
            {
                label: 'Rəng',
                key: 'color',
                page: () => navigate.navigate('ColorFilterPage'),
                value: filterStates.colors?.find((color) => color.id === addProductStates.colorId)
                    ?.name,
            },
            {
                label: 'Şəhər',
                key: 'city',
                page: () => navigate.navigate('CityFilterPage'),
                value: filterStates.cities?.find((city) => city.id === addProductStates.cityId)
                    ?.name_az,
            },
            {
                label: 'Qiymət',
                key: 'price',
                page: () => navigate.navigate('PriceFilterPage'),
            },
        ];
        const onChangeDesc = (text: string) => {
            addProductStates.setProductDescription(text);
        };
        const onChangePrice = (text: string) => {
            // string can be empty
            if (text.length === 0) {
                addProductStates.setProductPrice('');
                return;
            }
            // shuld numeric
            if (isNaN(Number(text))) {
                return;
            }
            // should be positive
            if (Number(text) < 0) {
                return;
            }
            addProductStates.setProductPrice(text);
        };

        return (
            <View style={internalStyles.formContainer}>
                <View style={internalStyles.formItemContainer}>
                    <CustomText style={internalStyles.headText}>Məhsul haqqında</CustomText>
                    <View style={internalStyles.descInpContainer}>
                        <CustomTextInput
                            onChangeText={onChangeDesc}
                            style={internalStyles.inp}
                            placeholder='Məs: Yeni alınıb və bir dəfə geyinilib.'
                            value={addProductStates.productDescription}
                            maxLength={500}
                            multiline={true}
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
                                            onChangeText={onChangePrice}
                                            value={addProductStates.productPrice}
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
                                            maxLength={5}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={field.page}
                                    style={internalStyles.fieldItem}
                                >
                                    <CustomText style={internalStyles.fieldText}>
                                        {field.label}
                                    </CustomText>
                                    <View style={internalStyles.itemRightContainer}>
                                        <CustomText style={internalStyles.valueText}>
                                            {field.value ? field.value : ''}
                                        </CustomText>
                                        <ChevronRightIcon style={{ color: primaryColor }} />
                                    </View>
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

        const onChangeFullname = (text: string) => {
            addProductStates.setFullName(text);
        };

        const onChangeEmail = (text: string) => {
            addProductStates.setEmail(text);
        };

        useEffect(() => {
            addProductStates.setPhone('+994' + user?.phone?.slice(1) || '');
            addProductStates.setFullName(user?.full_name || '');
            addProductStates.setEmail(user?.email || '');
        }, []);
        return (
            <View style={internalStyles.contactContainer}>
                <CustomText style={internalStyles.headText}>Əlaqə məlumatları</CustomText>

                <View style={{ marginTop: 16 }}>
                    <CustomText style={internalStyles.contactLabel}>Ad/Soyad *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <CustomTextInput
                            onChangeText={onChangeFullname}
                            defaultValue={user?.full_name}
                            style={internalStyles.inp}
                            placeholder='Ad soyadı daxil edin'
                        />
                    </View>
                    <CustomText style={internalStyles.contactLabel}>E-mail *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <CustomTextInput
                            onChangeText={onChangeEmail}
                            defaultValue={user?.email}
                            style={internalStyles.inp}
                            placeholder='E-mail'
                        />
                    </View>
                    <CustomText style={internalStyles.contactLabel}>Telefon *</CustomText>
                    <View style={internalStyles.inpContainer}>
                        <PhoneInput
                            setPhone={(text) => addProductStates.setPhone(text)}
                            phone={addProductStates.phone}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        addProductStates.setHideNumber(!addProductStates.hideNumber);
                    }}
                    style={internalStyles.hidePhoneContainer}
                >
                    <View style={{ top: 4 }}>
                        {addProductStates.hideNumber ? <FillSquareIcon /> : <OutlineSquareIcon />}
                    </View>
                    <View>
                        <CustomText style={internalStyles.hideNumberText}>
                            Nömrəni gizlət
                        </CustomText>
                        <CustomText
                            style={{ display: addProductStates.hideNumber ? 'flex' : 'none' }}
                        >
                            Nömrəni gizlətməklə sizə yalnız mesaj yazmaq mümkün olacaq
                        </CustomText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }),
);

const AddProductPage = () => {
    const publish = () => {
        if (addProductValidator()) {
            createProduct();
        }
    };

    useEffect(() => {
        return () => {
            addProductStates.resetAddProductStates();
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    ...internalStyles.loading,
                    display: addProductStates.isLoading ? 'flex' : 'none',
                }}
            >
                <LoadingComponent />
            </View>
            <View style={internalStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImagesContainer />
                    <FormContainer />
                    <ContactContainer />
                </ScrollView>
                <CustomMainButton
                    func={publish}
                    title={
                        addProductStates?.isLoading ? (
                            <ActivityIndicator color={'#fff'} />
                        ) : (
                            'Dərc et'
                        )
                    }
                />
            </View>
        </View>
    );
};

export default memo(observer(AddProductPage));

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
        paddingHorizontal: 16,
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
        fontFamily: NunitoBold,
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
        // alignItems: 'center',
        gap: 8,
        marginTop: 16,
    },
    closeIcon: {
        backgroundColor: 'red',
        borderRadius: 100,
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: 'transparent',
        width: '80%',
        borderRadius: 8,
        padding: 16,
        height: 200,
    },
    btnContainer: {
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#fff',
    },
    itemRightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    valueText: {
        fontFamily: NunitoBold,
        fontSize: 16,
    },
    hideNumberText: {
        fontSize: 16,
    },
    loading: {
        position: 'absolute',
        height: '100%',
        width: phoneWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
    },
});
