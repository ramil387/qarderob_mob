import errorStates from "@/states/error/errorStates"

export const errorMessageForImage = () => {
    errorStates.setCommonErrorVisible(true)
    errorStates.setErrorHeader('Bildiriş')
    errorStates.setErrorBody(' Şəkil sistemə yüklənmədi. Yenidən yükləyin')
    errorStates.setErrorAction(false)

}