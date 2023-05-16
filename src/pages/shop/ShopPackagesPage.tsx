import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { NunitoBold, e5Color, mainTextColor, phoneHeight, phoneWidth } from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import CustomMainButton from '@/components/ui/CustomMainButton';
import paymentStates from '@/states/payment/paymentStates';
import { ActivityIndicator } from 'react-native';

const ShopPackagesPage = () => {
    const [packages, setPackages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [price, setPrice] = React.useState<string>(packages[1]?.price || 49);
    const fetchPackages = async () => {
        try {
            const response = await http.get(APIS.packages);
            if (response.data) {
                setPackages(response.data.data.slice(1));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const pay = async () => {
        try {
            setIsLoading(true);
            const body = {
                count: price,
                service: { type: `s_balance-${price}` },
                amount: price,
            };
            console.log(body);
            const resp = await http.post(APIS.payment + `/create`, body);
            if (resp?.data.url) {
                console.log(resp?.data.url);
                paymentStates.setPaymentModalVisible(true);
                paymentStates.setPaymentUrl(resp?.data.url);
                paymentStates.setPaymentBody(body);
                paymentStates.setPaymentType('package');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <View style={internalStyles.container}>
            <Carousel
                data={packages}
                loop={false}
                onSnapToItem={(index: number) => {
                    const data: any = packages[index];
                    setPrice(data?.price);
                }}
                renderItem={({ item, index }) => {
                    const data: any = packages[index];
                    return (
                        <View
                            style={{
                                width: '90%',
                                height: '100%',
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                elevation: 2,
                            }}
                        >
                            <View
                                style={{
                                    ...internalStyles.topContainer,
                                    backgroundColor: data?.color || '#C3C3C3',
                                }}
                            >
                                <CustomText style={internalStyles.name}>{data?.name_az}</CustomText>
                            </View>
                            <View style={internalStyles.infoContainer}>
                                <CustomText style={internalStyles.price}>
                                    {data?.price}₼ / 1 ay
                                </CustomText>
                                {data?.desc_az?.map((desc: string, descIndex: number) => {
                                    return (
                                        <CustomText style={internalStyles.desc} key={descIndex}>
                                            {desc}
                                        </CustomText>
                                    );
                                })}
                            </View>
                            <View style={internalStyles.btn}>
                                <CustomMainButton
                                    func={pay}
                                    title={
                                        isLoading ? <ActivityIndicator color='#fff' /> : 'Paketi al'
                                    }
                                />
                            </View>
                        </View>
                    );
                }}
                width={340}
                height={540}
                defaultIndex={1}
                pagingEnabled={true}
                style={{ overflow: 'visible', marginLeft: 32 }}
            />
        </View>
    );
};

export default ShopPackagesPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        height: '100%',
    },
    topContainer: {
        padding: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    name: {
        fontSize: 28,
        fontFamily: NunitoBold,
        textAlign: 'center',
        color: '#fff',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
        fontFamily: NunitoBold,
        fontSize: 28,
        letterSpacing: 1.5,
        paddingVertical: 4,
    },
    desc: {
        textAlign: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        width: '100%',
        fontSize: 15,
        paddingHorizontal: 16,
    },
    btn: {
        padding: 16,
    },
});
