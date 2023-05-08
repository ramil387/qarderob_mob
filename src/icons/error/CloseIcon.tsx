import { inactiveColor } from '@/styles/variables';
import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const CloseIcon = ({ style }: { style: any }) => {
    return (
        <Svg
            width={style?.width || '24'}
            height={style?.height || '24'}
            viewBox='0 0 16 16'
            fill='none'
        >
            <Rect opacity='0.01' width='16' height='16' fill='black' />
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.00786 6.88105L7.83096 6.69253L4.82435 3.48814C4.4995 3.17608 4.00366 3.17413 3.70269 3.47599C3.40192 3.77766 3.41174 4.26831 3.73501 4.57872L6.91822 7.97289L6.74756 8.14409L3.46916 11.4328C3.1683 11.7346 3.17831 12.2267 3.49288 12.5267C3.80464 12.8257 4.30049 12.8241 4.59975 12.5239L7.99413 9.12011L8.17097 9.30849L11.1781 12.5123C11.5011 12.824 11.9986 12.8258 12.2992 12.5227C12.5989 12.2237 12.5889 11.7316 12.2657 11.4213L9.08123 8.02827L9.25189 7.85701L12.5302 4.56713C12.8313 4.26508 12.8221 3.77442 12.5085 3.47383C12.1961 3.17432 11.7003 3.17575 11.401 3.47597L8.00786 6.88105Z'
                fill={inactiveColor}
            />
        </Svg>
    );
};

export default CloseIcon;
