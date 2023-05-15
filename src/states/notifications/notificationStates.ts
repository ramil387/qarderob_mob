import { makeAutoObservable, runInAction } from "mobx";

class NotificationStates {
    notifications: any[] = [];
    notificationCount: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setNotificationCount(count: number) {
        runInAction(() => {
            this.notificationCount = count;
        })
    }


}

export default new NotificationStates();