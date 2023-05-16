import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { NunitoBold, e5Color, mainTextColor, phoneHeight, phoneWidth } from '@/styles/variables';
import CustomText from '@/components/ui/CustomText';
import CustomMainButton from '@/components/ui/CustomMainButton';
import paymentStates from '@/states/payment/paymentStates';

const ShopPackagesPage = () => {
    const [packages, setPackages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [price, setPrice] = React.useState<string>('');
    const fetchPackages = async () => {
        try {
            const response = await http.get(APIS.packages);
            if (response.data) {
                console.log(response.data);
                setPackages(response.data.data);
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
            const resp = await http.post(APIS.payment + `/create`, body);
            if (resp?.data.url) {
                paymentStates.setPaymentModalVisible(true);
                paymentStates.setPaymentUrl(resp?.data.url);
                paymentStates.setPaymentBody(body);
                paymentStates.setPaymentType('package');
            }
        } catch (error) {
            console.log(error);
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
                                <CustomMainButton func={pay} title={'Paketi al'} />
                            </View>
                        </View>
                    );
                }}
                width={phoneWidth - 60}
                height={phoneHeight * 0.75}
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
        padding: 16,
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
        paddingVertical: 16,
    },
    desc: {
        textAlign: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: e5Color,
        width: '100%',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    btn: {
        padding: 16,
    },
});
