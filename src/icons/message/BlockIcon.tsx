import React from 'react';
import { Path, Svg } from 'react-native-svg';

const BlockIcon = ({ style }: { style?: any }) => {
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
                d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM14.9056 3.68013C13.5509 2.62708 11.8487 2 10 2C5.58172 2 2 5.58172 2 10C2 11.8487 2.62708 13.551 3.68015 14.9056L14.9056 3.68013ZM16.3198 5.09434C17.3729 6.44903 18 8.15128 18 10C18 14.4183 14.4183 18 10 18C8.15129 18 6.44904 17.3729 5.09436 16.3199L16.3198 5.09434Z'
                fill={style?.color || 'white'}
            />
        </Svg>
    );
};

export default BlockIcon;
