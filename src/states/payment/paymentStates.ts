import { makeAutoObservable, runInAction } from "mobx";

class PaymentStates {
    paymentUrl: string = ''
    paymentPageVisible: boolean = false
    paymentType: string = ''
    paymentModalVisible: boolean = false
    paymentLoading: boolean = false
    paymentBody: any = {}
    paymentResult: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    setPaymentUrl(url: string) {
        runInAction(() => {
            this.paymentUrl = url;
        })
    }

    setPaymentPageVisible(visible: boolean) {
        runInAction(() => {
            this.paymentPageVisible = visible;
        })
    }

    setPaymentType(type: string) {
        runInAction(() => {
            this.paymentType = type;
        })
    }

    setPaymentModalVisible(visible: boolean) {
        runInAction(() => {
            this.paymentModalVisible = visible;
        })
    }

    setPaymentLoading(loading: boolean) {
        runInAction(() => {
            this.paymentLoading = loading;
        })
    }

    setPaymentBody(body: any) {
        runInAction(() => {
            this.paymentBody = body;
        })
    }

    setPaymentRusulUrl(url: string) {
        runInAction(() => {
            this.paymentResult = url;
        })
    }



    resetPaymentStates() {
        runInAction(() => {
            this.paymentUrl = '';
            this.paymentPageVisible = false;
            this.paymentType = '';
            this.paymentModalVisible = false;
            this.paymentLoading = false;
            this.paymentBody = {};
            this.paymentResult = '';
        })
    }

}

export default new PaymentStates();