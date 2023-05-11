import { Asset } from "react-native-image-picker";
import addProductStates from "./addProductStates";
import { setImageName } from "@/helper/setImageName";
import { Platform } from "react-native";
import { uploadImage } from "./uploadImage";
import { errorMessageForImage } from "@/helper/errorMessageForImage";

export const setImages = (images: Asset[] | undefined) => {

    images
        ?.sort((a: any, b: any) => a.creationTime - b.creationTime)
        .map(async (imgs: any, i: number) => {
            if (addProductStates.imageDate.length === 0) {
                addProductStates.setImageDate(Date.now().toString());
            }
            const fd = new FormData();
            const getImageName = setImageName(imgs, addProductStates.imageDate, i)
            fd.append(
                'data',
                getImageName
            );

            fd.append('fileupload', {
                ...imgs,
                uri:
                    Platform.OS === 'android'
                        ? imgs.uri
                        : imgs.uri.replace('file://', ''),
                name: `image`,
                type: 'image/jpeg', // it may be necessary in Android.
            });

            const imgSuccess = await uploadImage(fd);
            if (!imgSuccess) {
                errorMessageForImage()
                return;
            }

            imgs['name'] = getImageName.name
        })
}
