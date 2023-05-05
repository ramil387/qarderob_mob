import React from 'react';
import { Path, Svg } from 'react-native-svg';

const NotificationIcon = () => {
    return (
        <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 2C10.8954 2 10 2.89543 10 4V4.34141C7.66962 5.16508 6.00001 7.38756 6.00001 10L6.00001 11.5L6.00001 13.5996L4.38254 15.8237C3.94008 16.432 3.87642 17.2372 4.21778 17.9076C4.55913 18.5779 5.24776 19 6.00001 19H9.00001C9.00001 20.6569 10.3432 22 12 22C13.6569 22 15 20.6569 15 19H18C18.7523 19 19.4409 18.5779 19.7822 17.9076C20.1236 17.2372 20.0599 16.432 19.6175 15.8237L18 13.5996L18 11.5V10C18 7.38756 16.3304 5.16508 14 4.34141V4C14 2.89543 13.1046 2 12 2ZM13.0012 17H13H11L8.473 17H6.00001L7.45455 15L7.61748 14.776C7.86609 14.4341 8.00001 14.0223 8.00001 13.5996V11.5V10C8.00001 7.79086 9.79087 6 12 6C14.2091 6 16 7.79086 16 10L16 11.5V13.5996C16 14.0223 16.1339 14.4341 16.3825 14.776L16.5455 15L18 17H15.527H13.0012ZM12 20C11.4477 20 11 19.5523 11 19H13C13 19.5523 12.5523 20 12 20Z'
                fill='black'
                fillOpacity='0.87'
            />
        </Svg>
    );
};

export default NotificationIcon;