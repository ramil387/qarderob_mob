import { View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { memo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import productStates from '@/states/product/productStates';
import { runInAction, toJS } from 'mobx';
import Carousel from 'react-native-reanimated-carousel';
import {
    NunitoBold,
    e0Color,
    e5Color,
    errorBackground,
    errorColor,
    inactiveColor,
    mainTextColor,
    phoneWidth,
    primaryColor,
    successBackground,
    successColor,
    warningBackground,
    warningColor,
} from '@/styles/variables';
import { getAdImageBySize } from '@/utils/getImageBySize';
import CustomText from '@/components/ui/CustomText';
import { StyleSheet } from 'react-native';
import VipIcon from '@/icons/home/VipIcon';
import OutlineHeartIcon from '@/icons/home/OutlineHeartIcon';
import TagIcon from '@/icons/product/TagIcon';
import SizeIcon from '@/icons/product/SizeIcon';
import ColorIcon from '@/icons/product/ColorIcon';
import { defineProductStatus } from '@/helper/defineProductStatus';
import { Avatar } from '@rneui/themed';
import PhoneIcon from '@/icons/product/PhoneIcon';
import MailIcon from '@/icons/product/MailIcon';
import { increaseViewCount } from '@/states/product/increaseViewCount';
import moment from 'moment';
import CustomMainButton from '@/components/ui/CustomMainButton';
import RocketIcon from '@/icons/product/RocketIcon';
import filterStates from '@/states/filter/filterStates';
import {
    NavigationProp,
    ParamListBase,
    StackActions,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import profileStates from '@/states/profile/profileStates';
import { fetchRelatedProducts } from '@/states/product/fetchRelatedProducts';
import Product from '@/components/products/Product';
import { showShouldAuth } from '@/helper/showShouldAuth';
import { checkLikeByPage } from '@/helper/checkLikeByPage';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { fetchLikeCount } from '@/states/product/fetchLikeCount';
import FillHeartIcon from '@/icons/home/FillHeartIcon';
import addProductStates from '@/states/product/addProduct/addProductStates';
import { fillUpdateProductForm } from '@/helper/fillUpdateProductForm';
import { showProductActionDialog } from '@/helper/showProductActionDialog';
import { defineProductVerifiedMessage } from '@/helper/defineProductVerifiedMessage';
import CheckIcon from '@/icons/categories/CheckIcon';
import ClockIcon from '@/icons/product/ClockIcon';
import CloseIcon from '@/icons/error/CloseIcon';

const ProductImages = memo(
    observer(() => {
        const product = toJS(productStates.selectedProduct);
        return (
            <Carousel<any>
                style={{ height: 400 }}
                loop={false}
                enabled={product?.images?.length === 1 ? false : true}
                width={phoneWidth}
                data={product?.images || []}
                renderItem={({ image, index }: any) => {
                    return (
                        <View>
                            <Image
                                style={{ width: phoneWidth, height: 400, resizeMode: 'cover' }}
                                source={{
                                    uri: getAdImageBySize(
                                        'lg',
                                        product!.id,
                                        product!.images[index],
                                    ),
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    backgroundColor: '#000',
                                    opacity: 0.8,
                                    borderRadius: 8,
                                    padding: 8,
                                }}
                            >
                                <CustomText style={{ color: '#fff', fontFamily: NunitoBold }}>
                                    {index + 1}/{product?.images.length}
                                </CustomText>
                            </View>
                        </View>
                    );
                }}
            />
        );
    }),
);

const ProductVerifiedStatus = memo(
    observer(() => {
        const product = toJS(productStates.selectedProduct);
        const verified = product?.verified;

        const borderColor =
            verified === 'false'
                ? successColor
                : verified === 'exp'
                ? warningColor
                : verified === 'rej'
                ? errorColor
                : inactiveColor;

        const backgroundColor =
            verified === 'false'
                ? successBackground
                : verified === 'exp'
                ? warningBackground
                : verified === 'rej' && errorBackground;

        const headText = defineProductVerifiedMessage(product?.verified)?.split('\n')[0];

        const tailText = defineProductVerifiedMessage(product?.verified)
            ?.split('\n')[1]
            ?.split(' ')
            ?.map((d) => d)
            ?.join(' ');

        const badCoolor =
            verified === 'false' ? 'green' : verified === 'exp' ? warningColor : 'red';

        const Icon = () =>
            verified === 'false' ? (
                <CheckIcon style={internalStyles.iconStyle} />
            ) : verified === 'exp' ? (
                <ClockIcon style={internalStyles.iconStyle} />
            ) : verified === 'rej' ? (
                <CloseIcon style={internalStyles.iconStyle} />
            ) : null;

        console.log(headText);

        return (
            <View
                style={{
                    ...internalStyles?.verifiedMessageContainer,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                }}
            >
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                    <View style={{ ...internalStyles.badge, backgroundColor: badCoolor }}>
                        <Icon />
                    </View>
                    <CustomText style={internalStyles.headVerifiedText}>{headText}</CustomText>
                </View>
                <CustomText style={internalStyles?.bodyVeifiedText}>{tailText}</CustomText>
            </View>
        );
    }),
);

const TopInfoContainer = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();
        const [disableHeart, setDisableHeart] = React.useState(false);

        const product = toJS(productStates.selectedProduct);
        const showLikeIcon = product?.user_id === profileStates.user?.id;
        const toggleLike = async (id: number | undefined) => {
            try {
                if (!id) return;
                if (!profileStates.token) {
                    showShouldAuth(
                        navigate,
                        'Bildiriş',
                        'Favorilərə əlavə etmək üçün hesabınıza daxil olun',
                    );
                    return;
                }

                setDisableHeart(true);
                const resp = await http.post(`${APIS.stats}/like/${id}`);
                if (resp.data.fav === 1) {
                    runInAction(() => {
                        if (productStates.selectedProduct) {
                            productStates.selectedProduct = {
                                ...productStates.selectedProduct,
                                isFavourite: '1',
                            };
                        }
                    });
                    checkLikeByPage(id, 1);
                } else {
                    runInAction(() => {
                        if (productStates.selectedProduct) {
                            productStates.selectedProduct = {
                                ...productStates.selectedProduct,
                                isFavourite: '0',
                            };
                        }
                    });
                    checkLikeByPage(id, 0);
                }
            } catch (error) {
                console.log(error);
            } finally {
                await fetchLikeCount(product?.id);
                setDisableHeart(false);
            }
        };

        // todo add like count
        return (
            <View style={internalStyles.topInfoContainer}>
                <View>
                    <View style={internalStyles.brandNameContainer}>
                        <CustomText style={internalStyles.brandName}>
                            {product?.brand?.name}
                        </CustomText>
                        <View style={{ display: product?.isVip ? 'flex' : 'none' }}>
                            <VipIcon />
                        </View>
                    </View>
                    <View>
                        <CustomText style={internalStyles.price}>{product?.price}₼</CustomText>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => toggleLike(product?.id)}
                    disabled={disableHeart}
                    style={{ display: !showLikeIcon ? 'flex' : 'none', bottom: 20 }}
                >
                    {product?.isFavourite === '1' ? (
                        <FillHeartIcon />
                    ) : (
                        <OutlineHeartIcon style={{ color: mainTextColor }} />
                    )}
                    <CustomText style={{ textAlign: 'center' }}>
                        {productStates?.selectedProduct?.like_count}
                    </CustomText>
                </TouchableOpacity>
            </View>
        );
    }),
);

const SpecContainer = () => {
    const product = toJS(productStates.selectedProduct);
    return (
        <View style={internalStyles.specContainer}>
            <View style={internalStyles.specItemContainer}>
                <TagIcon />
                <CustomText>{defineProductStatus(product?.product_status ?? null)}</CustomText>
            </View>
            <View style={internalStyles.specItemContainer}>
                <SizeIcon />
                <CustomText>{product?._size?.size}</CustomText>
            </View>
            <View style={internalStyles.specItemContainer}>
                <ColorIcon />
                <CustomText>{product?._color?.name}</CustomText>
            </View>
        </View>
    );
};

const ServiceContainer = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    return (
        <View style={internalStyles.servicesContainer}>
            <View style={{ width: '48%' }}>
                <CustomMainButton
                    func={() => {
                        navigate.navigate('MoveForwardPage');
                    }}
                    title={
                        <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 8,
                            }}
                        >
                            <CustomText
                                style={{
                                    color: '#fff',
                                    fontFamily: NunitoBold,
                                    lineHeight: 21,
                                    fontSize: 16,
                                }}
                            >
                                Elanı irəli çək
                            </CustomText>
                            <RocketIcon />
                        </View>
                    }
                />
            </View>
            <View style={{ width: '48%' }}>
                <CustomMainButton
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: primaryColor,
                    }}
                    func={() => {
                        navigate.navigate('VipServicePage');
                    }}
                    title={
                        <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 8,
                            }}
                        >
                            <CustomText
                                style={{
                                    color: primaryColor,
                                    fontFamily: NunitoBold,
                                    lineHeight: 21,
                                    fontSize: 16,
                                }}
                            >
                                Vip et
                            </CustomText>
                            <VipIcon style={{ color: primaryColor }} />
                        </View>
                    }
                />
            </View>
        </View>
    );
};

const ContactContainer = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const product = toJS(productStates.selectedProduct);
    const goUserProductsPage = () => {
        filterStates.resetQuery();
        navigate.dispatch(StackActions.push('UserProductsPage'));
    };

    const imageUrl =
        (product?.store_id ?? 0) > 0 ? product?._store?.img ?? '' : product?._user?.photo;
    const name =
        (product?.store_id ?? 0) > 0 ? product?._store?.name ?? '' : product?._user?.username;
    return (
        <View style={internalStyles.contactContainer}>
            <View style={internalStyles.avatarContainer}>
                <TouchableOpacity onPress={goUserProductsPage}>
                    <Avatar size={52} source={{ uri: imageUrl }} rounded />
                </TouchableOpacity>
                <View>
                    <CustomText style={internalStyles.ownerHeadText}>Elanın sahibi</CustomText>
                    <TouchableOpacity onPress={goUserProductsPage}>
                        <CustomText style={internalStyles.username}>{name}</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={internalStyles.contactItemContainer}>
                <TouchableOpacity>
                    <PhoneIcon style={{ color: 'black' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MailIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const StatsContainer = () => {
    const product = toJS(productStates.selectedProduct);
    return (
        <View style={internalStyles.statsContainer}>
            <CustomText style={{ paddingVertical: 2 }}>
                Elanın nömrəsi:{' '}
                <CustomText style={{ fontFamily: NunitoBold }}>{product?.id}</CustomText>
            </CustomText>
            <CustomText style={{ paddingVertical: 2 }}>
                Baxış sayı:{' '}
                <CustomText style={{ fontFamily: NunitoBold }}>
                    {product?.viewCount?.count ?? 0}
                </CustomText>
            </CustomText>
            <CustomText style={{ paddingVertical: 2 }}>
                Yeniləndi:{' '}
                <CustomText style={{ fontFamily: NunitoBold }}>
                    {moment(product?.publishedAt).format('lll')}
                </CustomText>
            </CustomText>
            <CustomText style={{ paddingVertical: 2 }}>
                Şəhər:{' '}
                <CustomText style={{ fontFamily: NunitoBold }}>
                    {filterStates.cities.length > 0 &&
                        filterStates?.cities.find((city) => city?.id === product?.city)?.name_az}
                </CustomText>
            </CustomText>
        </View>
    );
};

const ProductDetailPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();

    const product = toJS(productStates.selectedProduct);

    useFocusEffect(
        useCallback(() => {
            increaseViewCount(product?.id || null, product?.slug || null);
            fetchRelatedProducts(product!.category!.slug_az);
            fetchLikeCount(product?.id);
            return () => {
                productStates.setRelatedProducts(null);
            };
        }, [product?.id]),
    );

    const updateProduct = () => {
        addProductStates.setUpdatedProduct(product);
        fillUpdateProductForm(product);
        navigate.navigate('AddProductPage');
    };

    const deleteProduct = () => {
        showProductActionDialog();
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <ProductImages />
                {productStates?.selectedProduct?.user_id === profileStates.user?.id && (
                    <ProductVerifiedStatus />
                )}
                <View style={internalStyles.contentContainer}>
                    <CustomText style={internalStyles.catName}>
                        {product?.category?.name_az}
                    </CustomText>
                    <TopInfoContainer />
                    <SpecContainer />
                    <View
                        style={{
                            ...internalStyles.descContainer,
                            display: product?.description ? 'flex' : 'none',
                        }}
                    >
                        <CustomText style={internalStyles.desc}>{product?.description}</CustomText>
                    </View>
                    {product?.user_id === profileStates.user?.id && <ServiceContainer />}
                    <ContactContainer />
                    <StatsContainer />
                    <RelatedProducts />
                </View>
            </ScrollView>
            <View
                style={{
                    ...internalStyles.footerContainer,
                    display: product?.user_id === profileStates.user?.id ? 'flex' : 'none',
                }}
            >
                <View style={internalStyles.footerItemContainer}>
                    <CustomMainButton
                        func={deleteProduct}
                        title='Elanı sil'
                        style={{
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: primaryColor,
                        }}
                        titleStyle={{ color: primaryColor }}
                    />
                </View>
                <View style={internalStyles.footerItemContainer}>
                    <CustomMainButton func={updateProduct} title='Düzəliş et' />
                </View>
            </View>
        </View>
    );
};

const RelatedProducts = memo(
    observer(() => {
        const relatedProducts = toJS(productStates.relatedProducts?.data);

        return (
            <View style={{ marginTop: 16 }}>
                <CustomText
                    style={{
                        paddingVertical: 16,
                        fontFamily: NunitoBold,
                        fontSize: 18,
                    }}
                >
                    OXŞAR ELANLAR
                </CustomText>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 16,
                    }}
                    horizontal={true}
                    data={relatedProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Product item={item} />}
                />
            </View>
        );
    }),
);

export default observer(ProductDetailPage);

const internalStyles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
    catName: {
        fontSize: 16,
        lineHeight: 21,
        color: inactiveColor,
    },
    topInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingTop: 4,
        paddingBottom: 16,
    },
    brandNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    brandName: {
        fontSize: 24,
        fontFamily: NunitoBold,
        letterSpacing: 0.36,
    },
    price: {
        fontFamily: NunitoBold,
        fontSize: 20,
        color: primaryColor,
    },
    specContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingVertical: 16,
    },
    specItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    descContainer: {
        marginTop: 16,
    },
    desc: {
        fontSize: 16,
    },
    contactContainer: {
        marginTop: 16,
        backgroundColor: e0Color,
        height: 100,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    ownerHeadText: {
        fontSize: 16,
        color: inactiveColor,
        lineHeight: 21,
    },
    username: {
        fontSize: 16,
        width: phoneWidth / 2,
    },
    contactItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    statsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        paddingVertical: 16,
    },
    servicesContainer: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'transparent',
    },
    footerItemContainer: {
        width: '48%',
    },
    verifiedMessageContainer: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        margin: 16,
    },
    headVerifiedText: {
        fontSize: 16,
        fontFamily: NunitoBold,
        marginBottom: 4,
        width: phoneWidth - 84,
    },
    bodyVeifiedText: {
        color: inactiveColor,
        fontSize: 16,
        marginTop: 8,
    },
    badge: {
        borderRadius: 100,
        backgroundColor: 'green',
        padding: 4,
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 4,
    },
    iconStyle: { color: '#fff', width: 14, height: 14 },
});
