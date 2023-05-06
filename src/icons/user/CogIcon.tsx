import React from 'react';
import { Path, Svg } from 'react-native-svg';

const CogIcon = ({ style }: { style: any }) => {
    return (
        <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.50003 0C7.05355 0 6.66116 0.295977 6.53851 0.725279L5.7781 3.38671L3.14145 3.01005C2.69383 2.94611 2.259 3.19048 2.08088 3.60608L0.580884 7.10608C0.419809 7.48192 0.503783 7.91797 0.792922 8.20711L2.58582 10L0.792922 11.7929C0.474052 12.1118 0.408052 12.6046 0.631786 12.9961L2.63179 16.4961C2.83947 16.8596 3.25153 17.0552 3.66443 16.9864L5.78378 16.6332L6.53851 19.2747C6.66116 19.704 7.05355 20 7.50003 20H12.5C12.9465 20 13.3389 19.704 13.4616 19.2747L14.2163 16.6332L16.3356 16.9864C16.7485 17.0552 17.1606 16.8596 17.3683 16.4961L19.3683 12.9961C19.592 12.6046 19.526 12.1118 19.2071 11.7929L17.4142 10L19.2071 8.20711C19.4963 7.91797 19.5802 7.48192 19.4192 7.10608L17.9192 3.60608C17.7411 3.19048 17.3062 2.94611 16.8586 3.01005L14.222 3.38671L13.4616 0.725279C13.3389 0.295977 12.9465 0 12.5 0H7.50003ZM7.46155 4.77472L8.25433 2H11.7457L12.5385 4.77472C12.6758 5.25523 13.1467 5.56062 13.6415 5.48995L16.3828 5.09833L17.3142 7.27163L15.2929 9.29289C14.9024 9.68342 14.9024 10.3166 15.2929 10.7071L17.2528 12.667L15.9774 14.8991L13.6644 14.5136C13.1628 14.43 12.6782 14.7363 12.5385 15.2253L11.7457 18H8.25433L7.46155 15.2253C7.32183 14.7363 6.83731 14.43 6.33563 14.5136L4.02269 14.8991L2.74722 12.667L4.70714 10.7071C5.09766 10.3166 5.09766 9.68342 4.70714 9.29289L2.68587 7.27163L3.61728 5.09833L6.35861 5.48995C6.85332 5.56062 7.32426 5.25523 7.46155 4.77472ZM10 12C8.89546 12 8.00003 11.1046 8.00003 10C8.00003 8.89543 8.89546 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12ZM6.00003 10C6.00003 7.79086 7.79089 6 10 6C12.2092 6 14 7.79086 14 10C14 12.2091 12.2092 14 10 14C7.79089 14 6.00003 12.2091 6.00003 10Z'
                fill={style?.color || 'black'}
                fill-opacity='0.87'
            />
        </Svg>
    );
};

export default CogIcon;
