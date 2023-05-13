import React from 'react';
import { Path, Svg } from 'react-native-svg';

const CheckIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            width={style?.width || '18'}
            height={style?.height || '14'}
            viewBox='0 0 18 14'
            fill='none'
        >
            <Path
                d='M17.5269 2.93253C18.1986 2.22007 18.1491 1.11308 17.4163 0.459991C16.6835 -0.193096 15.5449 -0.144966 14.8731 0.567492L6.36458 9.59173L3.18283 5.87968C2.54642 5.1372 1.41141 5.03688 0.647711 5.65562C-0.115985 6.27435 -0.219168 7.37784 0.417245 8.12033L4.91723 13.3703C5.24972 13.7582 5.73833 13.9876 6.25754 13.9995C6.77675 14.0114 7.27596 13.8047 7.6269 13.4325L17.5269 2.93253Z'
                fill={style?.color || '#EBEBEB'}
            />
        </Svg>
    );
};

export default CheckIcon;
