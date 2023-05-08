import { InfluencerType } from "@/types/influencerType";
import { ProdListType } from "@/types/productListType";
import { UserType } from "@/types/userType";
import { makeAutoObservable, runInAction } from "mobx";




class UserStates {
    influencers: InfluencerType[] = [];
    userProducts: ProdListType | null = null;
    likedProducts: any = null;
    selectedAdOwner: UserType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setInfluencers(influencers: InfluencerType[]) {
        runInAction(() => {
            this.influencers = influencers;
        })
    }

    setUserProducts(userProducts: ProdListType | null) {
        runInAction(() => {
            this.userProducts = userProducts;
        })
    }

    setLikedProducts(likedProducts: ProdListType | null) {
        runInAction(() => {
            this.likedProducts = likedProducts;
        })
    }

    setSelectedAdOwner(selectedAdOwner: UserType | null) {
        runInAction(() => {
            this.selectedAdOwner = selectedAdOwner;
        })
    }

}

export default new UserStates();

