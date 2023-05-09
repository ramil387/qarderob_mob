import { makeAutoObservable, runInAction } from "mobx";

class SearchStates {
    searchValue: string = "";
    searchType: 'user' | 'product' = "product";
    constructor() {
        makeAutoObservable(this);
    }

    setSearchValue(value: string) {
        runInAction(() => {
            this.searchValue = value;
        })
    }
}

export default new SearchStates();