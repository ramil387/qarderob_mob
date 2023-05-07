import { makeAutoObservable, runInAction } from "mobx";

class ErrorState {
    commonErrorVisible: boolean = false;
    errorHeader: string = "";
    errorBody: string = "";
    errorAction: boolean = false;
    okText: string = "";
    cancelText: string = "";

    okFunc: any = () => { };
    cancelFunc: any = () => { };

    constructor() {
        makeAutoObservable(this);
    }

    setOkFunc = (okFunc: any) => {
        runInAction(() => {
            this.okFunc = okFunc;
        })
    }

    setCancelFunc = (cancelFunc: any) => {
        runInAction(() => {
            this.cancelFunc = cancelFunc;
        })
    }


    setCommonErrorVisible = (commonErrorVisible: boolean) => {
        runInAction(() => {
            this.commonErrorVisible = commonErrorVisible;
        })
    }

    setErrorHeader = (errorHeader: string) => {
        runInAction(() => {
            this.errorHeader = errorHeader;
        })
    }

    setErrorBody = (errorBody: string) => {
        runInAction(() => {
            this.errorBody = errorBody;
        })
    }

    setErrorAction = (errorAction: boolean) => {
        runInAction(() => {
            this.errorAction = errorAction;
        })
    }

    setOkText = (okText: string) => {
        runInAction(() => {
            this.okText = okText;
        })
    }

    setCancelText = (cancelText: string) => {
        runInAction(() => {
            this.cancelText = cancelText;
        })
    }

    resetErrorStates = () => {
        runInAction(() => {
            this.commonErrorVisible = false;
            this.errorHeader = "";
            this.errorBody = "";
            this.errorAction = false;
            this.okText = "";
            this.cancelText = "";
        })
    }

}

export default new ErrorState();