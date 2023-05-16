import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';

const MessagesPage = () => {
    return (
        <View style={internalStyles.container}>
            <Text>MessagesPage</Text>
        </View>
    );
};

export default observer(MessagesPage);

const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
