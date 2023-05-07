import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const PlusCircleIcon = () => {
    return (
        <Svg width='56' height='56' viewBox='0 0 56 56' fill='none'>
            <Rect width='56' height='56' rx='28' fill='#F70F4B' />
            <Path
                d='M17.2 25.75C16.4438 25.75 15.75 26.2689 15.75 27C15.75 27.7311 16.4438 28.25 17.2 28.25H38.8C39.5562 28.25 40.25 27.7311 40.25 27C40.25 26.2689 39.5562 25.75 38.8 25.75H17.2Z'
                fill='white'
                stroke='white'
                strokeWidth='0.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M29.25 16.2C29.25 15.4438 28.7311 14.75 28 14.75C27.2689 14.75 26.75 15.4438 26.75 16.2L26.75 37.8C26.75 38.5562 27.2689 39.25 28 39.25C28.7311 39.25 29.25 38.5562 29.25 37.8L29.25 16.2Z'
                fill='white'
                stroke='white'
                strokeWidth='0.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};

export default PlusCircleIcon;
