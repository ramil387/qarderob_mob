import { http } from '@/services/httpMethods';
// import loginStates from '@/store/auth/states/loginStates';
// import registerStates from '@/store/auth/states/registerStates';
// import generalStates from '@/store/general/states/generalStates';
// import errorStates from '../store/error/states/errorStates';

export const errorHandlers = (error: any) => {
    // // console.log(error.response);
    // console.log(`_ANY_ERROR_${error?.response?.status}`, error?.response?.data);
    // const error_body = error?.response?.data;
    // if (error_body.message === "Message sent is not possible due to the block") {
    //     errorStates.setDialogWarnings(true, "İstifadəçi sizi blok edib.")
    //     return true
    // }
    // Object.keys(error_body?.errors).map(d => {
    //     error_body?.errors[d].map((err: string) => {
    //         if (err === 'Hesabınız aktiv edilməyib') {
    //             requestList.postService('/api/v1/auth/send-confirm-code', { email: loginStates.email.toLowerCase().trim() })
    //             generalStates.navigationRef.current?.navigate('Login');
    //             loginStates.changeAuthType(1);
    //             loginStates.setConfirmPage(true);
    //             registerStates.setEmailAndFullname('email', loginStates.email);
    //         } else if (err === 'Mağazanızın elan limiti bitib') {
    //             errorStates.setDialogWarnings(true, err);
    //             errorStates.setLimitError(true)
    //             errorStates.setDialogType('yes');
    //         } else {
    //             errorStates.setDialogWarnings(true, err);
    //             errorStates.setDialogType('no');
    //         }
    //     });
    // });
    // return error_body;
};
