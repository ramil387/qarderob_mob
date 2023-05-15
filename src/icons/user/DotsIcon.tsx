import React from 'react';
import { Path, Svg } from 'react-native-svg';

const DotsIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            height={style?.height || '4'}
            width={style?.width || '18'}
            viewBox='0 0 18 4'
            fill='none'
        >
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 0C0.895431 0 0 0.895431 0 2C0 3.10457 0.895431 4 2 4C3.10457 4 4 3.10457 4 2C4 0.895431 3.10457 0 2 0ZM9 0C7.89543 0 7 0.895431 7 2C7 3.10457 7.89543 4 9 4C10.1046 4 11 3.10457 11 2C11 0.895431 10.1046 0 9 0ZM14 2C14 0.895431 14.8954 0 16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2Z'
                fill={'black'}
            />
        </Svg>
    );
};

export default DotsIcon;
