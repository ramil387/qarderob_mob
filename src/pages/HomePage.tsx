import { View } from 'react-native';
import React from 'react';
import LastAds from '@/components/home/LastAds';
import SearchComponent from '@/components/common/SearchComponent';
import searchStates from '@/states/search/searchStates';
import { observer } from 'mobx-react-lite';

const HomePage = () => {
    const showSearch = searchStates.searchContainerVisible;

    return (
        <View style={{ flex: 1 }}>
            {showSearch && <SearchComponent />}
            <View style={{ paddingHorizontal: 16 }}>
                <LastAds />
            </View>
        </View>
    );
};

export default observer(HomePage);
