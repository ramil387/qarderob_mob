import errorStates from '@/states/error/errorStates';

export const errorHandlers = (error: any) => {
    // console.log(error.response);
    console.log(`_ANY_ERROR_${error?.response?.status}`, error?.response?.data);
    const error_body = error?.response?.data;
    if (error_body.message === "Message sent is not possible due to the block") {
        errorStates.setCommonErrorVisible(true)
        errorStates.setErrorHeader("İstifadəçi sizi blok edib.")
        errorStates.setErrorBody('')
        errorStates.setErrorAction(false)
        return true
    }
    Object.keys(error_body?.errors).map(d => {
        error_body?.errors[d].map((err: string) => {
            if (err === 'Hesabınız aktiv edilməyib') {
                // http.post(`${APIS.auth}/send-confirm-code`, { email: loginStates.email.toLowerCase().trim() })
                // generalStates.navigationRef.current?.navigate('Login');
                // loginStates.changeAuthType(1);
                // loginStates.setConfirmPage(true);
                // registerStates.setEmailAndFullname('email', loginStates.email);
            } else if (err === 'Mağazanızın elan limiti bitib') {
                errorStates.setCommonErrorVisible(true);
                errorStates.setErrorHeader('Mağazanızın elan limiti bitib');
                // errorStates.setLimitError(true)
                // errorStates.setDialogType('yes');
            } else {
                errorStates.setCommonErrorVisible(true);
                errorStates.setErrorHeader(err);
                errorStates.setErrorAction(false);
            }
        });
    });
    return error_body;
};
