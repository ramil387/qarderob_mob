import { makeAutoObservable, runInAction } from "mobx"

class GeneralStates {
    navigationRef: any = null
    curPage: string = ''
    prevPage: string = ''
    footerVisible: boolean = true;
    screenSize: string = 'sm'
    homeDatas: any | null = null;

    homeScrollRef: any = null

    constructor() {
        makeAutoObservable(this)
    }

    setNavigationRef = (ref: any) => {
        runInAction(() => {
            this.navigationRef = ref
        })
    }

    setCurPage = (page: string) => {
        runInAction(() => {
            this.curPage = page
        })
    }

    setPrevPage = (page: string) => {
        runInAction(() => {
            this.prevPage = page
        })
    }

    setFooterVisible = (visible: boolean) => {
        runInAction(() => {
            this.footerVisible = visible
        })
    }
    setScreenSize(size: string) {
        runInAction(() => {
            this.screenSize = size
        })
    }

    setHomeDatas(datas: any) {
        runInAction(() => {
            this.homeDatas = datas
        })
    }

    setHomeScrollRef(ref: any) {
        runInAction(() => {
            this.homeScrollRef = ref
        })
    }


}


export default new GeneralStates()