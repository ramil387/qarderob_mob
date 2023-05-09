import { SearchKeywordType } from "@/types/searchKeywordType";
import { makeAutoObservable, runInAction } from "mobx";

type productResultsType = {
    data: SearchKeywordType[],
    count: number,
    currentPage: number,
    perPage: number,
}

class SearchStates {
    searchContainerVisible: boolean = false;
    searchValue: string = "";
    searchType: 'user' | 'product' = "product";
    userResults: any[] = [];
    productResults: productResultsType | null = null;
    searchKey: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setSearchValue(value: string) {
        runInAction(() => {
            this.searchValue = value;
        })
    }

    setSearchType(type: 'user' | 'product') {
        runInAction(() => {
            this.searchType = type;
        })
    }

    setUserResults(results: any[]) {
        runInAction(() => {
            this.userResults = results;
        })
    }

    setProductResults(results: productResultsType | null) {
        runInAction(() => {
            this.productResults = results;
        })
    }

    setSearchKey(key: string) {
        runInAction(() => {
            this.searchKey = key;
        })
    }

    setSearchContainerVisible(visible: boolean) {
        runInAction(() => {
            this.searchContainerVisible = visible;
        })
    }

}

export default new SearchStates();