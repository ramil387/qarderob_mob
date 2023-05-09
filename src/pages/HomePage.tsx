import { View } from 'react-native';
import React from 'react';
import LastAds from '@/components/home/LastAds';
import SearchComponent from '@/components/common/SearchComponent';

const HomePage = () => {
    return (
        <View style={{ flex: 1 }}>
            <SearchComponent />
            <View style={{ paddingHorizontal: 16 }}>
                <LastAds />
            </View>
        </View>
    );
};

export default HomePage;
