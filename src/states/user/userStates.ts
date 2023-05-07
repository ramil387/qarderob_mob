import { AdListType } from "@/types/adListType";
import { InfluencerType } from "@/types/influencerType";
import { ProdListType } from "@/types/productListType";
import { makeAutoObservable, runInAction } from "mobx";




class UserStates {
    influencers: InfluencerType[] = [];
    userProducts: ProdListType | null = null;
    likedProducts: any = null;
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

}

export default new UserStates();

