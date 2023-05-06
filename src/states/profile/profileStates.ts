import { ProfileType } from "@/types/profileType";
import { makeAutoObservable, runInAction } from "mobx";

class ProfileStates {
    user: ProfileType | null = null;
    token: string | null = null;
    storeMode: boolean = false;
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

}

export default new ProfileStates();