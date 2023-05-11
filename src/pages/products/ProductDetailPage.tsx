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
    inactiveColor,
    mainTextColor,
    phoneWidth,
    primaryColor,
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

const ProductImages = memo(
    observer(() => {
        const product = toJS(productStates.selectedProduct);
        return (
            <Carousel<any>
                style={{ height: 400 }}
                loop={false}
                enabled={product?.images.length === 1 ? false : true}
                width={phoneWidth}
                data={product!.images}
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

const TopInfoContainer = memo(
    observer(() => {
        const navigate: NavigationProp<ParamListBase> = useNavigation();
        const [disableHeart, setDisableHeart] = React.useState(false);

        const product = toJS(productStates.selectedProduct);
        const showLikeIcon = product?.user_id === profileStates.user?.id;
        const toggleLike = async (id: number) => {
            try {
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
                        productStates.selectedProduct = {
                            ...productStates.selectedProduct,
                            isFavourite: '1',
                        };
                    });
                    checkLikeByPage(id, 1);
                } else {
                    runInAction(() => {
                        productStates.selectedProduct = {
                            ...productStates.selectedProduct,
                            isFavourite: '0',
                        };
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

        console.log(product?.like_count);

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

    const imageUrl = product?.store_id > 0 ? product?._store?.img : product?._user?.photo;
    const name = product?.store_id > 0 ? product?._store?.name : product?._user?.username;
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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <ProductImages />
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
            <View style={internalStyles.footerContainer}>
                <View style={internalStyles.footerItemContainer}>
                    <CustomMainButton
                        func={() => {}}
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
                    <CustomMainButton func={() => {}} title='Düzəliş et' />
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
});
