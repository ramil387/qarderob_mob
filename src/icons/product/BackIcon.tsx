import React from 'react';
import { Path, Svg } from 'react-native-svg';

const BackIcon = () => {
    return (
        <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.80436 17.7007C8.41737 18.0947 7.78423 18.1004 7.3902 17.7134L2.29929 12.7134C2.10785 12.5254 2 12.2683 2 12C2 11.7317 2.10785 11.4746 2.29929 11.2866L7.3902 6.28655C7.78423 5.89956 8.41737 5.90526 8.80436 6.29929C9.19135 6.69332 9.18565 7.32646 8.79162 7.71345L5.44531 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L5.44531 13L8.79162 16.2866C9.18565 16.6735 9.19135 17.3067 8.80436 17.7007Z'
                fill='black'
                fillOpacity='0.87'
            />
        </Svg>
    );
};

export default BackIcon;
