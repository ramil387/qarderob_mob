import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackList } from './Stacks';
import generalStates from '@/states/general/generalStates';
import { routerObserver } from '@/utils/observers';
import { f8Color } from '@/styles/variables';
const Stack = createNativeStackNavigator();

const CombineStacks = () => {
    const navigationRef = useRef(null);
    useEffect(() => {
        generalStates.setNavigationRef(navigationRef);
    }, []);
    return (
        <NavigationContainer ref={navigationRef} onStateChange={routerObserver}>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: {
                        backgroundColor: f8Color,
                    },
                }}
            >
                {StackList.map((item, index) => {
                    return (
                        <Stack.Screen
                            key={index}
                            name={item.name}
                            component={item.component}
                            options={item.options}
                        />
                    );
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default CombineStacks;
