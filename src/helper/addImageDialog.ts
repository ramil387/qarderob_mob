import generalStates from "@/states/general/generalStates"

export const addImageDialog = () => {
    generalStates.setDialogType("img");
    generalStates.setCommonDialogVisible(true);
    generalStates.setDialogHeader("Şəkil əlavə et");
    generalStates.setDialogBody("Şəkil əlavə etmək üçün şəkli seçin");
    generalStates.setDialogAction(true);
    generalStates.setDialogOkText("Şəkil çək");
    generalStates.setDialogCancelText("Şəkil yüklə");
}