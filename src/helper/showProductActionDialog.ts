import generalStates from "@/states/general/generalStates";
import { deleteProduct } from "@/states/product/deleteProduct";
import productStates from "@/states/product/productStates";

export const showProductActionDialog = () => {
    generalStates?.setDialogType('warning');
    generalStates?.setCommonDialogVisible(true);
    generalStates?.setDialogHeader("Elan silinsin?")
    generalStates?.setDialogBody(`Elanı silməklə elanınız "Müddəti başa çatmış" elanlar sırasında görünəcək. Elanı yenidən bərpa edə bilərsiniz`)
    generalStates?.setDialogAction(true);
    generalStates?.setDialogOkText("Sil")
    generalStates?.setDialogCancelText("İmtina et")
    generalStates?.setOkFunc(async () => {
        await deleteProduct(productStates?.selectedProduct?.id)
        generalStates?.setCommonDialogVisible(false);
    })
}

