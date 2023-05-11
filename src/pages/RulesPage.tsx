import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { http } from '@/services/httpMethods';
import { APIS } from '@/constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoadingComponent from '@/components/common/LoadingComponent';
import { phoneHeight } from '@/styles/variables';
const RulesPage = () => {
    const navigate: NavigationProp<ParamListBase> = useNavigation();
    const [rules, setRules] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const fetchRules = async () => {
        try {
            const resp = await http.get(APIS.rules);
            setRules(resp.data[0]);
        } catch (error) {
            navigate.goBack();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <View style={internalStyles.container}>
            <WebView
                style={{ height: phoneHeight, width: '100%', overflow: 'scroll' }}
                containerStyle={{ height: phoneHeight, width: '100%', overflow: 'scroll' }}
                source={{ html: `${rules?.text}` }}
            />
        </View>
    );
};

export default RulesPage;

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
