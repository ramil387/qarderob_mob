import React from 'react';
import { Path, Svg } from 'react-native-svg';

const CalendarIcon = ({ style }: { style: any }) => {
    return (
        <Svg width='14' height='16' viewBox='0 0 18 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5 0C4.44772 0 4 0.447715 4 1V2H3C1.34315 2 0 3.34315 0 5V7V17C0 18.6569 1.34315 20 3 20H15C16.6569 20 18 18.6569 18 17V7V5C18 3.34314 16.6569 2 15 2H14V1C14 0.447715 13.5523 0 13 0C12.4477 0 12 0.447715 12 1V2H6V1C6 0.447715 5.55228 0 5 0ZM13 4H5H3C2.44772 4 2 4.44772 2 5V6H16V5C16 4.44772 15.5523 4 15 4H13ZM2 17V8L16 8V17C16 17.5523 15.5523 18 15 18H3C2.44772 18 2 17.5523 2 17Z'
                fill={style?.color || 'black'}
            />
        </Svg>
    );
};

export default CalendarIcon;
