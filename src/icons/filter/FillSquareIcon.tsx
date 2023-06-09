import React from 'react';
import { Path, Svg } from 'react-native-svg';

const FillSquareIcon = () => {
    return (
        <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V3C20 1.34315 18.6569 0 17 0ZM2 3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V3Z'
                fill='black'
                fill-opacity='0.87'
            />
            <Svg width='20' height='20' viewBox='-5 0.4 20 8' fill='none'>
                <Path
                    d='M9.73718 1.67573C10.1104 1.26861 10.0829 0.636044 9.67575 0.262852C9.26863 -0.110341 8.63606 -0.0828378 8.26287 0.324282L3.53589 5.48099L1.76825 3.35982C1.41468 2.93554 0.784117 2.87822 0.359841 3.23179C-0.0644362 3.58535 -0.12176 4.21591 0.231804 4.64019L2.7318 7.64019C2.91652 7.86185 3.18797 7.99292 3.47642 7.99973C3.76487 8.00654 4.04221 7.88842 4.23718 7.67573L9.73718 1.67573Z'
                    fill='#F70F4B'
                />
            </Svg>
        </Svg>
    );
};

export default FillSquareIcon;
