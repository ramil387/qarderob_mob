import React from 'react';
import { Defs, G, Image, LinearGradient, Path, Pattern, Stop, Svg, Use } from 'react-native-svg';

const CheckIcon = ({ style }: { style?: any }) => {
    return (
        <Svg
            width={style?.width || '76'}
            height={style?.height || '70'}
            viewBox='0 0 159 159'
            fill='none'
        >
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M79.5 0C123.407 0 159 35.5934 159 79.5C159 123.407 123.407 159 79.5 159C35.5934 159 0 123.407 0 79.5C0 35.5934 35.5934 0 79.5 0Z'
                fill='url(#paint0_linear_217_5725)'
            />
            <Path
                opacity='0.2'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M155.488 55.5851L79.1274 116.766H75.8977L75.7734 108.94L146.547 37.0195C150.08 42.9804 152.962 48.582 155.488 55.5851Z'
                fill='#272755'
            />
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M157.511 32.6699L143.474 18.7573C141.611 16.8939 138.505 16.8939 136.518 18.7573L76.5199 80.7427L50.558 55.1536C48.6946 53.2902 45.5892 53.2902 43.6018 55.1536L31.1798 67.4514C29.3164 69.3148 29.3164 72.4203 31.1798 74.2836L72.6692 115.4C73.7873 116.518 75.2779 116.891 76.7685 116.766C78.2591 116.891 79.7496 116.518 80.8677 115.4L157.511 39.6261C159.375 37.6385 159.375 34.533 157.511 32.6699Z'
                fill='#F0F0F0'
            />
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M80.8665 115.4L157.51 39.6261C159.373 37.7627 159.373 34.6573 157.51 32.7939L155.274 30.6823L76.643 107.947L33.1662 65.588L31.3028 67.4514C29.4394 69.3148 29.4394 72.4202 31.3028 74.2836L72.7923 115.4C73.9103 116.518 75.4009 116.891 76.8915 116.767C78.2578 116.891 79.7484 116.518 80.8665 115.4Z'
                fill='#E0E0E0'
            />
            <G style='mix-blend-mode:soft-light' opacity='0.56'>
                <Path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M79.5 0C100.528 0 119.649 8.16393 133.867 21.4951L136.517 18.7572C138.444 16.9503 141.423 16.8955 143.301 18.593L143.473 18.7572L157.51 32.6699C159.317 34.4765 159.372 37.4513 157.675 39.4423L157.51 39.626L151.443 45.6254C156.29 55.9019 159 67.3844 159 79.5C159 123.407 123.407 159 79.5 159C35.5934 159 0 123.407 0 79.5C0 35.5934 35.5934 0 79.5 0Z'
                    fill='url(#pattern0)'
                />
            </G>
            <Defs>
                <Pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <Use href='#myElement' transform='translate(-0.227273) scale(0.00181818)' />
                </Pattern>
                <LinearGradient
                    id='paint0_linear_217_5725'
                    x1='-79.5'
                    y1='79.5'
                    x2='79.5'
                    y2='238.5'
                    gradientUnits='userSpaceOnUse'
                >
                    <Stop stopColor='#00D65B' />
                    <Stop offset='1' stopColor='#0EAD69' />
                </LinearGradient>
                <Image id='image0_217_5725' width='800' height='550' />
            </Defs>
        </Svg>
    );
};

export default CheckIcon;
