import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoadingComponent from '@/components/common/LoadingComponent';
import { phoneHeight } from '@/styles/variables';
const DealsPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [deals, setDeals] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const fetchDeals = async () => {
        try {
            const resp = await http.get(APIS.deals);
            setDeals(resp.data[0]);
        } catch (error) {
            navigate.goBack();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <View style={internalStyles.container}>
            <WebView
                style={{ height: phoneHeight, width: '100%', overflow: 'scroll' }}
                containerStyle={{ height: phoneHeight, width: '100%', overflow: 'scroll' }}
                source={{ html: `${deals?.text}` }}
            />
        </View>
    );
};

export default DealsPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
