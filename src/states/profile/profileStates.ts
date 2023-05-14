import { ProfileType } from "@/types/profileType";
import { makeAutoObservable, runInAction } from "mobx";

class ProfileStates {
    user: ProfileType | null = null;
    token: string | null = null;
    storeMode: boolean = false;

    // editProfile ------------------------------
    isProfileEditLoading: boolean = false;
    profileImg: any = {};
    profileCover: any = {};
    imageDate: string = '';
    full_name: string = '';
    username: string = '';
    email: string = '';
    phone: string = '+994';


    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: ProfileType | null) {
        runInAction(() => {
            this.user = user;
        })
    }

    setToken(token: string | null) {
        runInAction(() => {
            this.token = token;
        })
    }

    setStoreMode(storeMode: boolean) {
        runInAction(() => {
            this.storeMode = storeMode;
        })
    }

    // editProfile ------------------------------
    setProfileImg(shopImg: any) {
        runInAction(() => {
            this.profileImg = shopImg;
        })
    }

    setProfileCover(shopCover: any) {
        runInAction(() => {
            this.profileCover = shopCover;
        })
    }

    setFullName(full_name: string) {
        runInAction(() => {
            this.full_name = full_name;
        })
    }

    setUsername(username: string) {
        runInAction(() => {
            this.username = username;
        })
    }

    setEmail(email: string) {
        runInAction(() => {
            this.email = email;
        })
    }

    setPhone(phone: string) {
        runInAction(() => {
            this.phone = phone;
        })
    }

    setImageDate(imageDate: string) {
        runInAction(() => {
            this.imageDate = imageDate;
        })
    }

    setProfileEditLoading(isProfileEditLoading: boolean) {
        runInAction(() => {
            this.isProfileEditLoading = isProfileEditLoading;
        })
    }


    resetForm() {
        runInAction(() => {
            this.profileImg = {};
            this.profileCover = {};
            this.imageDate = '';
            this.full_name = '';
            this.username = '';
            this.email = '';
            this.phone = '+994';
            this.isProfileEditLoading = false;
        })
    }


    // ------------------------------------------


}

export default new ProfileStates();