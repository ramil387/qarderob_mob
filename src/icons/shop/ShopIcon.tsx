import React from 'react';
import { Path, Svg } from 'react-native-svg';

const ShopIcon = () => {
    return (
        <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 3H2V2H6V3ZM8 6V5H12V6C12 7.10457 11.1046 8 10 8C8.89543 8 8 7.10457 8 6ZM6 5V6C6 7.10457 5.10457 8 4 8C2.89543 8 2 7.10457 2 6V5H6ZM10 10C8.80531 10 7.73294 9.47624 7 8.64582C6.26705 9.47624 5.19469 10 4 10C3.6547 10 3.31962 9.95625 3 9.87398V18H7V14C7 12.3431 8.34315 11 10 11C11.6569 11 13 12.3431 13 14V18H17V9.87398C16.6804 9.95625 16.3453 10 16 10C14.8053 10 13.7329 9.47624 13 8.64582C12.2671 9.47624 11.1947 10 10 10ZM12 20H17C18.1046 20 19 19.1046 19 18V9C19 8.89461 18.9837 8.79302 18.9535 8.69763C19.6035 7.98636 20 7.03949 20 6V4V2C20 0.89543 19.1046 0 18 0H12H8H2C0.895431 0 0 0.89543 0 2V4V6C0 7.03949 0.396507 7.98636 1.04653 8.69763C1.0163 8.79302 1 8.89461 1 9V18C1 19.1046 1.89543 20 3 20H8H12ZM11 18V14C11 13.4477 10.5523 13 10 13C9.44771 13 9 13.4477 9 14V18H11ZM18 3V2H14V3H18ZM14 5V6C14 7.10457 14.8954 8 16 8C17.1046 8 18 7.10457 18 6V5H14ZM12 3H8V2L12 2V3Z'
                fill='black'
            />
        </Svg>
    );
};

export default ShopIcon;
