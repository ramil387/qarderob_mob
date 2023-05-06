import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const CustomSelectBox = ({ data }: { data: any }) => {
    return (
        <ScrollView
            style={{
                position: 'absolute',
                height: 100,
                zIndex: 999,
                backgroundColor: '#fff',
                minWidth: 100,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                padding: 8,
            }}
        >
            {data.map((item: any, index: number) => {
                return <Text key={index}>{item}</Text>;
            })}
        </ScrollView>
    );
};

export default CustomSelectBox;
