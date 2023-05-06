import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

const HealthSquareIcon = ({ style }: { style: any }) => {
    return (
        <Svg width='66' height='68' viewBox='0 0 66 68' fill='none'>
            <Rect width='66' height='68' rx='8' fill={style?.backgroundColor} fill-opacity='0.38' />
            <Path
                d='M23.1162 52C24.6201 52 25.5234 51.248 25.5234 50.0078C25.5234 49.085 24.8887 48.4111 23.9365 48.3086V48.2256C24.6299 48.1084 25.1719 47.4492 25.1719 46.7119C25.1719 45.6279 24.376 44.9541 23.0527 44.9541H20.2207V52H23.1162ZM21.3145 45.8477H22.7988C23.6094 45.8477 24.083 46.2334 24.083 46.9023C24.083 47.5908 23.5801 47.9521 22.6133 47.9521H21.3145V45.8477ZM21.3145 51.1064V48.7871H22.833C23.8633 48.7871 24.4053 49.1777 24.4053 49.9395C24.4053 50.7012 23.8828 51.1064 22.8965 51.1064H21.3145ZM27.7773 52.0879C28.4756 52.0879 29.0566 51.7852 29.374 51.248H29.457V52H30.4678V48.3721C30.4678 47.2588 29.7158 46.5947 28.3828 46.5947C27.1768 46.5947 26.3174 47.1758 26.21 48.0693H27.2256C27.3428 47.6836 27.748 47.4639 28.334 47.4639C29.0518 47.4639 29.4229 47.791 29.4229 48.3721V48.8359L27.9824 48.9238C26.7178 49.002 26.0049 49.5537 26.0049 50.5059C26.0049 51.4727 26.752 52.0879 27.7773 52.0879ZM28.0459 51.2432C27.4746 51.2432 27.0596 50.9551 27.0596 50.4619C27.0596 49.9785 27.3916 49.7197 28.124 49.6709L29.4229 49.583V50.042C29.4229 50.7256 28.8369 51.2432 28.0459 51.2432ZM33.4443 50.1006L34.6064 52.0098H35.8125L34.04 49.3291L35.793 46.707H34.6211L33.4883 48.6016H33.4053L32.2627 46.707H31.0371L32.8145 49.3682L31.0518 52.0098H32.2041L33.3662 50.1006H33.4443ZM36.4307 52H37.4756V46.6973H36.4307V52ZM38.5186 52H39.5684V48.7432C39.5684 48.0498 40.0518 47.5078 40.6914 47.5078C41.3164 47.5078 41.7168 47.8838 41.7168 48.4893V52H42.7471V48.6455C42.7471 48.0059 43.1914 47.5078 43.8701 47.5078C44.5586 47.5078 44.9004 47.8643 44.9004 48.5967V52H45.9502V48.3428C45.9502 47.2393 45.3252 46.5947 44.251 46.5947C43.5137 46.5947 42.9033 46.9707 42.6348 47.542H42.5518C42.3174 46.9707 41.8145 46.5947 41.0869 46.5947C40.3789 46.5947 39.8418 46.9463 39.6074 47.542H39.5293V46.6973H38.5186V52Z'
                fill={style?.color}
            />
            <Path
                d='M31.0498 24.9146L42.3633 15.0146C42.3633 15.0146 43.4233 13.9546 44.4843 15.0146C45.5448 16.0756 44.4843 17.1361 44.4843 17.1361L34.5848 28.4501L31.0498 24.9146Z'
                stroke={style?.color}
                strokeWidth='2'
                strokeLinejoin='round'
            />
            <Path
                d='M34.2314 22.4395L37.0599 25.268'
                stroke={style?.color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M25.7462 27.3891L31.0497 24.9141L34.5847 28.4501L32.1097 33.7531C32.1097 33.7531 29.6347 34.1066 27.5137 31.9856C25.3922 29.8641 25.7457 27.3891 25.7457 27.3891H25.7462Z'
                stroke={style?.color}
                strokeWidth='2'
                strokeLinejoin='round'
            />
            <Path
                d='M26.4541 30.2177L28.9291 29.1572M29.2826 33.0462L29.9901 31.6322'
                stroke={style?.color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M32.4648 23.6771L33.8788 22.4396L35.2928 21.2021M38.2978 24.2071L37.0603 25.6211L35.8228 27.0356'
                stroke={style?.color}
                strokeWidth='2'
                strokeLinejoin='round'
            />
        </Svg>
    );
};

export default HealthSquareIcon;
