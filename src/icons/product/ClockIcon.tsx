import React from 'react';
import { Path, Svg } from 'react-native-svg';

const ClockIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            width={style?.width || '20'}
            height={style?.height || '20'}
            viewBox='0 0 20 20'
            fill='none'
        >
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM11 5C11 4.44772 10.5523 4 10 4C9.44771 4 9 4.44772 9 5V10C9 10.3148 9.14819 10.6111 9.4 10.8L13.4 13.8C13.8418 14.1314 14.4686 14.0418 14.8 13.6C15.1314 13.1582 15.0418 12.5314 14.6 12.2L11 9.5V5Z'
                fill={style?.color || 'black'}
            />
        </Svg>
    );
};

export default ClockIcon;
