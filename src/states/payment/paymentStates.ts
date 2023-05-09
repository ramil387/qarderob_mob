import { makeAutoObservable, runInAction } from "mobx";

class PaymentStates {
    paymentUrl: string = ''
    paymentPageVisible: boolean = false
    paymentType: string = ''
    paymentModalVisible: boolean = false

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

}

export default new PaymentStates();