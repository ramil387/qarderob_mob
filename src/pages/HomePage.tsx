import { View } from 'react-native';
import React from 'react';
import LastAds from '@/components/home/LastAds';

const HomePage = () => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <LastAds />
        </View>
    );
};

export default HomePage;
