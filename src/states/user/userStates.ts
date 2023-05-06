import { InfluencerType } from "@/types/influencerType";
import { makeAutoObservable, runInAction } from "mobx";

class UserStates {
    influencers: InfluencerType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setInfluencers(influencers: InfluencerType[]) {
        runInAction(() => {
            this.influencers = influencers;
        })
    }

}

export default new UserStates();

