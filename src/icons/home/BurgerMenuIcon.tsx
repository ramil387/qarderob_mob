import React from 'react';
import { Path, Svg } from 'react-native-svg';

const BurgerMenuIcon = () => {
    return (
        <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3 6C2.44772 6 2 6.44771 2 7C2 7.55228 2.44772 8 3 8L21 8C21.5523 8 22 7.55229 22 7C22 6.44772 21.5523 6 21 6L3 6ZM2 12C2 11.4477 2.44772 11 3 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L3 13C2.44772 13 2 12.5523 2 12Z'
                fill='black'
                fillOpacity='0.87'
            />
            <Path
                d='M3 16C2.44772 16 2 16.4477 2 17C2 17.5523 2.44772 18 3 18L21 18C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16L3 16Z'
                fill='black'
                fillOpacity='0.87'
            />
        </Svg>
    );
};

export default BurgerMenuIcon;
