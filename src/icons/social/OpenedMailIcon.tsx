import React from 'react';
import { Path, Svg } from 'react-native-svg';

const OpenedMailIcon = () => {
    return (
        <Svg width='20' height='21' viewBox='0 0 20 21' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.43565 1.28415C9.39599 0.697276 10.604 0.697276 11.5644 1.28415L18.5644 5.56193C19.4561 6.10689 20 7.07667 20 8.12177V18.0001C20 19.657 18.6569 21.0001 17 21.0001H3C1.34315 21.0001 0 19.657 0 18.0001V8.12177C0 7.07667 0.543884 6.10689 1.43565 5.56193L8.43565 1.28415ZM10.5215 2.99071C10.2013 2.79509 9.79866 2.79509 9.47855 2.99071L3.00689 6.94562L9.36429 12.1811C9.73355 12.4852 10.2665 12.4852 10.6357 12.1811L16.9931 6.94562L10.5215 2.99071ZM18 8.70732L14.2279 11.8138L18 15.5859V8.70732ZM12.6768 13.0911L11.9071 13.725C10.7994 14.6373 9.20065 14.6373 8.09288 13.725L7.32319 13.0911L2.0633 18.351C2.20542 18.7302 2.57119 19.0001 3 19.0001H17C17.4288 19.0001 17.7946 18.7302 17.9367 18.351L12.6768 13.0911ZM5.77212 11.8138L2 8.70732V15.5859L5.77212 11.8138Z'
                fill='black'
                fillOpacity='0.87'
            />
        </Svg>
    );
};

export default OpenedMailIcon;
