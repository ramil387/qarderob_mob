
import { lgWidth, mdWidth } from '../variables';
import { lgStyles } from './lgStyles';
import { mdStyles } from './mdStyles';
import { smStyles } from './smStyles';

// veriables
let indexStyles = smStyles;


// Functions
const generateStyles = (width: number) => {

    if (width >= lgWidth) {
        indexStyles = lgStyles;
    } else if (width >= mdWidth) {
        indexStyles = mdStyles;
    }

    return indexStyles
}


export { generateStyles }
export { indexStyles };