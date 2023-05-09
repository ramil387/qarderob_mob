import errorStates from "@/states/error/errorStates";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export const showShouldAuth = (navigate: NavigationProp<ParamListBase>, headText: string, bodyText: string) => {
    errorStates.setErrorAction(true);
    errorStates.setCommonErrorVisible(true);
    errorStates.setErrorHeader(headText);
    errorStates.setErrorBody(bodyText);
    errorStates.setOkText('Daxil ol');
    errorStates.setCancelText('Qeydiyyat');
    errorStates.setOkFunc(() => {
        navigate.navigate('LoginPage');
        errorStates.resetErrorStates();
    });
    errorStates.setCancelFunc(() => {
        navigate.navigate('RegisterPage');
        errorStates.resetErrorStates();
    });
}