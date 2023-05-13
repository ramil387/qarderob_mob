import generalStates from "@/states/general/generalStates";

export const showDeleteProductDialog = () => {
    generalStates?.setDialogType('warning');
    generalStates?.setCommonDialogVisible(true);
    generalStates?.setDialogHeader("Elan silinsin?")
    generalStates?.setDialogBody(`Elanı silməklə elanınız "Müddəti başa çatmış" elanlar sırasında görünəcək. Elanı yenidən bərpa edə bilərsiniz`)
    generalStates?.setDialogAction(true);
    generalStates?.setDialogOkText("Sil")
    generalStates?.setDialogCancelText("İmtina et")

}