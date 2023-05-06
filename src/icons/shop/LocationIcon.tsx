import React from 'react';
import { Path, Svg } from 'react-native-svg';

const LocationIcon = ({ style }: { style: any }) => {
    return (
        <Svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <Path
                d='M9 10.5C10.2426 10.5 11.25 9.49264 11.25 8.25C11.25 7.00736 10.2426 6 9 6C7.75736 6 6.75 7.00736 6.75 8.25C6.75 9.49264 7.75736 10.5 9 10.5Z'
                stroke={style?.color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M13.2428 12.4925L10.0605 15.6748C9.77924 15.9558 9.39794 16.1136 9.00038 16.1136C8.60282 16.1136 8.22151 15.9558 7.94025 15.6748L4.75725 12.4925C3.91817 11.6534 3.34675 10.5843 3.11527 9.42043C2.88378 8.25655 3.00262 7.05017 3.45676 5.95383C3.91089 4.85749 4.67993 3.92044 5.66661 3.26116C6.6533 2.60189 7.81333 2.25 9 2.25C10.1867 2.25 11.3467 2.60189 12.3334 3.26116C13.3201 3.92044 14.0891 4.85749 14.5433 5.95383C14.9974 7.05017 15.1162 8.25655 14.8847 9.42043C14.6533 10.5843 14.0818 11.6534 13.2428 12.4925V12.4925Z'
                stroke={style?.color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};

export default LocationIcon;
