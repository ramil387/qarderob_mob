import { Asset } from "react-native-image-picker";
import addProductStates from "./addProductStates";
import { setImageName } from "@/helper/setImageName";
import { Platform } from "react-native";
import { uploadImage } from "./uploadImage";
import { errorMessageForImage } from "@/helper/errorMessageForImage";

export const setImages = (images: Asset[] | undefined, setCamera?: any) => {

    images
        ?.sort((a: any, b: any) => a.creationTime - b.creationTime)
        .map(async (img: any, i: number) => {
            if (addProductStates.imageDate.length === 0) {
                addProductStates.setImageDate(Date.now().toString());
            }
            const fd = new FormData();
            const getImageName = setImageName(img, addProductStates.imageDate, i)
            console.log(getImageName, 'xxxxxx')
            fd.append(
                'data',
                getImageName
            );

            fd.append('fileupload', {
                ...img,
                uri:
                    Platform.OS === 'android'
                        ? img.uri
                        : img.uri.replace('file://', ''),
                name: `image`,
                type: 'image/jpeg', // it may be necessary in Android.
            });

            const imgSuccess = await uploadImage(fd);
            if (!imgSuccess) {
                errorMessageForImage()
                return;
            }

            img['name'] = JSON.parse(getImageName).name

            addProductStates.setImages([...addProductStates.images, img]);
            setCamera(false)
        })

}
