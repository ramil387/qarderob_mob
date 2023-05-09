import { makeAutoObservable, runInAction } from "mobx";

class PaymentStates {
    paymentUrl: string = ''
    paymentPageVisible: boolean = false
    paymentType: string = ''

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

}

export default new PaymentStates();