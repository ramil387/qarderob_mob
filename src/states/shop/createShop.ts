import { createShopValidator } from "@/helper/createShopValidator"
import shopStates from "./shopStates"
import { setImageName } from "@/helper/setImageName";
import { uploadImage } from "../product/addProduct/uploadImage";
import { Platform } from "react-native";
import { errorMessageForImage } from "@/helper/errorMessageForImage";
import { http } from "@/services/httpMethods";
import { APIS } from "@/constants";
import { fetchMe } from "../profile/fetchMe";
import generalStates from "../general/generalStates";

export const createShop = async () => {
    try {
        if (!createShopValidator()) return;


        shopStates.setCreateShopLoading(true)
        const body: any = {
            name: shopStates.name,
            address: shopStates.address ?? "Onlayn mağaza",
            desc: shopStates.desc,
            phone: "0" + shopStates.phone.slice(4),
            email: shopStates.email,
            start_hour: shopStates.start_hour,
            end_hour: shopStates.end_hour,
            work_days: shopStates.work_days,
        }
        console.log(shopStates?.shopImg?.type,
            shopStates?.shopCover?.type,
        )
        if (shopStates?.shopImg) {
            body['img'] = shopStates?.shopImg?.name;
        }
        if (shopStates?.shopCover) {
            body['cover'] = shopStates?.shopCover?.name;
        }

        const resp = await http.post(APIS.stores, body)
        if (resp.status === 201) {
            fetchMe()
            shopStates.resetCreateShop()
            generalStates.setDialogType('check')
            generalStates.setCommonDialogVisible(true)
            generalStates.setDialogHeader('Uğurla göndərildi!')
            generalStates.setDialogBody('Mağazanızın yoxlamaya göndərildi.')
            generalStates.setDialogAction(false)
            setTimeout(() => {
                generalStates.navigationRef.current?.navigate('ProfilePage')
            }, 3000);
        }

    } catch (error) {
        console.log(error)
    } finally {
        shopStates.setCreateShopLoading(false)
    }
}

export const uploadShopImage = async (img: any, img_publish_date: string, type?: string) => {
    try {

        const fd = new FormData()
        const getImageName = setImageName(img, img_publish_date, type === 'img' ? 0 : 1)
        fd.append(
            'data',
            getImageName
        );

        console.log(getImageName, 'xxxxxx')

        fd.append('fileupload', {
            ...img,
            uri:
                Platform.OS === 'android'
                    ? img.uri
                    : img.uri.replace('file://', ''),
            name: `image`,
            type: 'image/jpeg', // it may be necessary in Android.
        });
        const imgResult = uploadImage(fd)
        if (!imgResult) {
            errorMessageForImage()
            return;
        }

        console.log({ type })
        if (type === 'img') {
            shopStates.setShopImg({
                ...img,
                name: JSON.parse(getImageName)?.data?.name
            });
            return
        }
        shopStates.setShopCover({
            ...img,
            name: JSON.parse(getImageName)?.data?.name
        });

    } catch (error) {
        console.log(error)
    }
}