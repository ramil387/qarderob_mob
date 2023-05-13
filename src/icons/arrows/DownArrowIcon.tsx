import React from 'react';
import { Path, Svg } from 'react-native-svg';

const DownArrowIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            width={style?.width || '12'}
            height={style?.height || '20'}
            viewBox='0 0 12 20'
            fill='none'
        >
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11.7007 13.1956C12.0947 13.5826 12.1004 14.2158 11.7134 14.6098L6.71345 19.7007C6.52542 19.8922 6.26834 20 6 20C5.73166 20 5.47458 19.8922 5.28655 19.7007L0.286551 14.6098C-0.10044 14.2158 -0.0947357 13.5826 0.299291 13.1956C0.693318 12.8087 1.32646 12.8144 1.71345 13.2084L5 16.5547L5 0.999999C5 0.447715 5.44771 -2.86409e-07 6 -2.62268e-07C6.55228 -2.38127e-07 7 0.447715 7 1L7 16.5547L10.2866 13.2084C10.6735 12.8144 11.3067 12.8087 11.7007 13.1956Z'
                fill={style?.color || 'black'}
            />
        </Svg>
    );
};

export default DownArrowIcon;
