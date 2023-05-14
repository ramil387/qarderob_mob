import errorStates from "@/states/error/errorStates";
import shopStates from "@/states/shop/shopStates"
import validator from 'validator';

export const createShopValidator = () => {
    if (!Object.keys(shopStates.shopImg).length) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağaza logosu yükləyin');
        errorStates.setErrorAction(false);
        return;
    }
    if (!Object.keys(shopStates.shopCover).length) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağaza üçün cover yükləyin');
        errorStates.setErrorAction(false);
        return;
    }

    if (!shopStates.name) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın adını daxil edin');
        errorStates.setErrorAction(false);
        return
    } else if (shopStates.name.length < 3) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın adı ən az 3 simvol olmalıdır');
        errorStates.setErrorAction(false);
        return
    } else if (shopStates.name.length > 20) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın adı ən çox 20 simvol olmalıdır');
        errorStates.setErrorAction(false);
        return
    }

    if (!shopStates.desc) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın haqqında məlumat daxil edin');
        errorStates.setErrorAction(false);
        return
    } else if (shopStates.desc.length < 10) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın haqqında məlumat ən az 10 simvol olmalıdır');
        errorStates.setErrorAction(false);
        return
    } else if (shopStates.desc.length > 100) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Mağazanın haqqında məlumat ən çox 100 simvol olmalıdır');
        errorStates.setErrorAction(false);
        return
    }


    if (shopStates?.phone.length !== 13) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`Telefon nömrəsini daxil edin`);
        errorStates.setErrorAction(false);
        return
    }

    if (!shopStates?.email) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`E-mail daxil edin`);
        errorStates.setErrorAction(false);
        return
    } else if (!validator.isEmail(shopStates.email)) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('E-mail formatı yanlışdır');
        errorStates.setErrorAction(false);
        return
    }




    if (!shopStates?.start_hour) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`Başlama saatını daxil edin`);
        errorStates.setErrorAction(false);
        return
    }

    if (!shopStates?.end_hour) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`Bitmə saatını daxil edin`);
        errorStates.setErrorAction(false);
        return
    }

    if (!shopStates?.work_days) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`İş gününü seçin`);
        errorStates.setErrorAction(false);
        return
    }


    if (!shopStates.instagram) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader(`Instagram linkini daxil edin`);
        errorStates.setErrorAction(false);
        return
    }

    return true
}