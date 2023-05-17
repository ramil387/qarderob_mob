import React from 'react';
import { Path, Svg } from 'react-native-svg';

const DeleteIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            width={style?.width || '16'}
            height={style?.height || '20'}
            viewBox='0 0 16 20'
            fill='none'
        >
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.2836 3L12 3C12 1.34315 10.6569 0 9 0H7C5.34314 0 4 1.34315 4 3L3.37288 3L3 3L2.99876 3H1C0.447715 3 0 3.44772 0 4C0 4.55229 0.447715 5 1 5L1 17C1 18.6569 2.34315 20 4 20H12C13.6569 20 15 18.6569 15 17L15 5C15.5523 5 16 4.55228 16 4C16 3.44771 15.5523 3 15 3H13.0018L13 3L12.2836 3ZM13 5H11L11 18H12C12.5523 18 13 17.5523 13 17L13 7V5ZM9 18V5H7V18H9ZM3 7L3 5L5 5V18H4C3.44772 18 3 17.5523 3 17L3 7ZM6 3H7H8L9 3H10C10 2.44772 9.55228 2 9 2L7 2C6.44772 2 6 2.44772 6 3Z'
                fill={style?.color || 'white'}
            />
        </Svg>
    );
};

export default DeleteIcon;
