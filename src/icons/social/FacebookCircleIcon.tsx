import React from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

const FacebookCircleIcon = () => {
    return (
        <Svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <G clipPath='url(#clip0_569_6481)'>
                <Path
                    d='M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z'
                    fill='#3B5998'
                />
                <Path
                    d='M11.2626 9.35225H9.65663V15.2357H7.22349V9.35225H6.06628V7.28458H7.22349V5.94657C7.22349 4.98974 7.678 3.49146 9.67828 3.49146L11.4806 3.499V5.50602H10.1729C9.9584 5.50602 9.65679 5.61319 9.65679 6.06962V7.28651H11.4751L11.2626 9.35225Z'
                    fill='white'
                />
            </G>
            <Defs>
                <ClipPath id='clip0_569_6481'>
                    <Rect width='18' height='18' fill='white' />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default FacebookCircleIcon;
