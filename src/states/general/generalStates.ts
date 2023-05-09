import { makeAutoObservable, runInAction } from "mobx"

class GeneralStates {
    navigationRef: any = null
    curPage: string = 'HomePage'
    prevPage: string = ''
    footerVisible: boolean = true;
    authFooterVisible: boolean = true;
    screenSize: string = 'sm'
    homeDatas: any | null = null;

    homeScrollRef: any = null;
    bottomSheetVisible: boolean = false;
    backDropVisible: boolean = false;
    categoryPageLevel: number = 0;

    // ------------DIALOG-----------------

    commonDialogVisible: boolean = false;
    dialogHeader: string = "";
    dialogBody: string = "";
    dialogAction: boolean = false;
    dialogOkText: string = "";
    dialogCancelText: string = "";
    dialogOkFunc: any = () => { };
    dialogCancelFunc: any = () => { };
    // -----------------------------

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

    setAuthFooterVisible(visible: boolean) {
        runInAction(() => {
            this.authFooterVisible = visible
        })
    }

    setBottomSheetVisible(visible: boolean) {
        runInAction(() => {
            this.bottomSheetVisible = visible
            this.backDropVisible = visible
        })
    }

    setBackDropVisible(visible: boolean) {
        runInAction(() => {
            this.backDropVisible = visible
        })
    }

    setCategoryPageLevel(level: number) {
        runInAction(() => {
            this.categoryPageLevel = level
        })
    }


    // ------------DIALOG-----------------

    setCommonDialogVisible(visible: boolean) {
        runInAction(() => {
            this.commonDialogVisible = visible
        })
    }

    setDialogHeader(header: string) {
        runInAction(() => {
            this.dialogHeader = header
        })
    }

    setDialogBody(body: string) {
        runInAction(() => {
            this.dialogBody = body
        })
    }

    setDialogAction(action: boolean) {
        runInAction(() => {
            this.dialogAction = action
        })
    }

    setDialogOkText(text: string) {
        runInAction(() => {
            this.dialogOkText = text
        })
    }

    setDialogCancelText(text: string) {
        runInAction(() => {
            this.dialogCancelText = text
        })
    }

    resetDialogStates() {
        runInAction(() => {
            this.dialogHeader = ''
            this.dialogBody = ''
            this.dialogAction = false
            this.dialogOkText = ''
            this.dialogCancelText = ''
            this.dialogOkFunc = () => { }
            this.dialogCancelFunc = () => { }
        })
    }

}


export default new GeneralStates()