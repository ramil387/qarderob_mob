import React from 'react';
import { Path, Svg } from 'react-native-svg';

const NotFoundIcon = ({ style }: { style?: any }) => {
    return (
        <Svg width='36' height='36' viewBox='0 0 18 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3 20L15 20C16.6569 20 18 18.6569 18 17V10L18 6.37939C18 5.64611 17.7314 4.93822 17.245 4.38947L15.5969 2.53001L14.3143 1.04161C13.7444 0.38028 12.9147 0 12.0417 0H9H3C1.34315 0 0 1.34314 0 3V17C1.96477e-06 18.6569 1.34315 20 3 20ZM13 2.58022L14.0909 3.84616L15.1136 5H13V2.58022ZM11 2V6C11 6.55229 11.4477 7 12 7H16V10L16 17C16 17.5523 15.5523 18 15 18L3 18C2.44772 18 2 17.5523 2 17L2 3C2 2.44772 2.44772 2 3 2L9 2L11 2Z'
                fill={style?.color || 'black'}
            />
        </Svg>
    );
};

export default NotFoundIcon;
