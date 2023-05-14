import { editProfileValidator } from "@/helper/editProfileValidator"
import profileStates from "./profileStates"
import { http } from "@/services/httpMethods";
import { APIS } from "@/constants";
import generalStates from "../general/generalStates";
import { setImageName } from "@/helper/setImageName";
import { Platform } from "react-native";
import { uploadImage } from "../product/addProduct/uploadImage";
import { errorMessageForImage } from "@/helper/errorMessageForImage";
import { fetchMe } from "./fetchMe";

export const editProfile = async () => {
    try {
        profileStates.setProfileEditLoading(true)
        const body: any = {
            full_name: profileStates.full_name,
            username: profileStates.username,
            email: profileStates.email,
            phone: profileStates.phone,
        }

        if (!editProfileValidator(body)) return;

        if (body.phone.length === 13) {
            body.phone = "0" + body.phone.slice(4)
        }

        if (Object.keys(profileStates?.profileImg).length > 1) {
            body['photo'] = [profileStates?.profileImg?.name];
        }

        if (Object.keys(profileStates?.profileCover).length > 1) {
            body['cover'] = [profileStates?.profileCover?.name];
        }

        const resp = await http.patch(APIS.updateProfile, body)
        if (resp.status === 200) {
            await fetchMe()
            profileStates.resetForm()
            generalStates.navigationRef.current?.navigate('ProfilePage')
            generalStates.setDialogAction(false)
            generalStates.setDialogType('check')
            generalStates.setCommonDialogVisible(true)
            generalStates.setDialogHeader('Profiliniz uğurla yeniləndi')
        }


    } catch (error) {
        console.log(error)
    } finally {
        profileStates.setProfileEditLoading(false)
    }
}



export const uploadProfileImage = async (img: any, img_publish_date: string, type?: string) => {
    try {

        const fd = new FormData()
        const getImageName = setImageName(img, img_publish_date, type === 'img' ? 0 : 1)
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
        const imgResult = uploadImage(fd)
        if (!imgResult) {
            errorMessageForImage()
            return;
        }

        if (type === 'img') {
            profileStates.setProfileImg({
                ...img,
                name: JSON.parse(getImageName)?.data?.name
            });
            return
        }
        profileStates.setProfileCover({
            ...img,
            name: JSON.parse(getImageName)?.data?.name
        });

    } catch (error) {
        console.log(error)
    }
}