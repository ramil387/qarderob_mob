import React from 'react';
import { Path, Svg } from 'react-native-svg';

const OutlineSquareIcon = () => {
    return (
        <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V3C20 1.34315 18.6569 0 17 0ZM2 3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V3Z'
                fill='black'
                fillOpacity='0.6'
            />
        </Svg>
    );
};

export default OutlineSquareIcon;
