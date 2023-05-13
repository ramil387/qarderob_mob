import errorStates from '@/states/error/errorStates';
import validator from 'validator';


export const editProfileValidator = async (body: any) => {

    if (!body.full_name) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Ad Soyad boş ola bilməz');
        return;
    }
    // use validator max 20 min 6
    else if (!validator.isLength(body.full_name, { min: 6, max: 20 })) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('İstifadəçi adı 6-20 simvol aralığında olmalıdır');
        return;
    }
    else if (!body.username) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('İstifadəçi adı boş ola bilməz');
        return;
    }
    else if (!validator.isLength(body.username, { min: 3, max: 30 })) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('İstifadəçi adı 3-30 simvol aralığında olmalıdır');
        return
    } else if (!validator.isEmail(body.email)) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Email düzgün deyil');
        return;
    } else if (body.phone.length < 13) {
        errorStates.setCommonErrorVisible(true);
        errorStates.setErrorHeader('Telefon nömrəsi düzgün deyil');
        return;
    }
    return true
}