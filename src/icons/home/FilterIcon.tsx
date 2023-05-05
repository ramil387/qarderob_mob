import React from 'react';
import { Path, Svg } from 'react-native-svg';

const FilterIcon = () => {
    return (
        <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11 2.14504C12.4458 2.57536 13.5 3.9147 13.4999 5.50024C13.4998 7.08915 12.441 8.43072 10.9904 8.85794C10.997 8.90436 11.0005 8.9518 11.0005 9.00005L11 19C11 19.5523 10.5522 20 9.99994 20C9.44766 20 8.99996 19.5522 8.99999 19L9.00047 8.99995C9.00047 8.95185 9.00387 8.90454 9.01044 8.85825C7.55923 8.43133 6.49984 7.08932 6.49992 5.49991C6.49999 3.91442 7.55428 2.57521 9.00001 2.14499L9.00006 0.999951C9.00009 0.447667 9.44783 -2.68983e-05 10.0001 1.21212e-09C10.5524 2.69008e-05 11.0001 0.447764 11.0001 1.00005L11 2.14504ZM8.49992 5.5C8.49996 4.67157 9.17156 4.00003 9.99999 4.00007C10.8284 4.00011 11.5 4.67172 11.4999 5.50014C11.4999 6.32857 10.8283 7.00011 9.99985 7.00007C9.17142 7.00003 8.49988 6.32843 8.49992 5.5ZM13.0001 14.5002C13 16.0858 14.0542 17.4251 15.5 17.8555L15.4999 19.0004C15.4999 19.5527 15.9476 20.0005 16.4999 20.0005C17.0522 20.0005 17.4999 19.5528 17.4999 19.0005L17.5 17.8555C18.9457 17.4253 20 16.0861 20.0001 14.5006C20.0001 12.9112 18.9408 11.5692 17.4895 11.1422C17.4961 11.096 17.4995 11.0486 17.4995 11.0005L17.5 1.00054C17.5 0.448252 17.0523 0.000515826 16.5 0.000489475C15.9478 0.000463123 15.5 0.448157 15.5 1.00044L15.4995 11.0004C15.4995 11.0487 15.5029 11.0961 15.5095 11.1426C14.059 11.5698 13.0001 12.9113 13.0001 14.5002ZM18.0001 14.5005C18 15.3289 17.3284 16.0005 16.5 16.0004C15.6716 16.0004 15 15.3288 15.0001 14.5003C15.0001 13.6719 15.6717 13.0004 16.5001 13.0004C17.3286 13.0005 18.0001 13.6721 18.0001 14.5005ZM2.50017 17.8552C1.0543 17.4249 -1.50596e-05 16.0855 6.10393e-05 14.4999C0.000137238 12.9109 1.05906 11.5693 2.5097 11.1421C2.50311 11.0957 2.49971 11.0484 2.49971 11.0002L2.50019 1.0002C2.50021 0.447913 2.94795 0.000218982 3.50023 0.000245334C4.05252 0.000271686 4.50021 0.448008 4.50019 1.00029L4.49971 11.0003C4.49971 11.0483 4.49631 11.0956 4.48976 11.1418C5.94096 11.5688 7.00033 12.9108 7.00026 14.5002C7.00018 16.0857 5.9459 17.425 4.50017 17.8552L4.50011 19.0003C4.50009 19.5526 4.05235 20.0003 3.50007 20.0002C2.94778 20.0002 2.50009 19.5525 2.50011 19.0002L2.50017 17.8552ZM3.50009 16.0002C4.32857 16.0002 5.00022 15.3286 5.00026 14.5001C5.0003 13.6717 4.32871 13 3.50023 13C2.67175 12.9999 2.0001 13.6715 2.00006 14.5C2.00002 15.3285 2.67161 16.0001 3.50009 16.0002Z'
                fill='black'
                fillOpacity='0.87'
            />
        </Svg>
    );
};

export default FilterIcon;