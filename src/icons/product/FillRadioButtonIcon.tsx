import React from 'react';
import { Circle, Svg } from 'react-native-svg';

const FillRadioButtonIcon = () => {
    return (
        <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <Circle cx='13' cy='12' r='9.25' stroke='#FD3366' strokeWidth='1.5' />
            <Circle cx='13' cy='12' r='5' fill='#FD3366' />
        </Svg>
    );
};

export default FillRadioButtonIcon;
