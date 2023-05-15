import { CommentType } from "@/types/commentType";
import { NotificationType } from "@/types/notificationType";
import { makeAutoObservable, runInAction } from "mobx";

type NotificationDataType = {
    data: NotificationType[],
    count: number
    has_next_page: boolean,
    next_page: number | null,
}

type CommentDataType = {
    data: CommentType[],
    count: number
    has_next_page: boolean,
    next_page: number | null,
}

class NotificationStates {
    notifications: NotificationDataType | null = null;
    notificationCount: number = 0;
    chatNotificationCount: number = 0;
    selectedNotification: NotificationType | null = null;
    comments: CommentDataType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setNotificationCount(all: number, chat: number) {
        runInAction(() => {
            this.notificationCount = all;
            this.chatNotificationCount = chat;
        })
    }

    setNotifications(notifications: NotificationDataType | null) {
        runInAction(() => {
            this.notifications = notifications;
        })
    }

    setSelectedNotification(notification: NotificationType | null) {
        runInAction(() => {
            this.selectedNotification = notification;
        })
    }

    setComments(comments: CommentDataType | null) {
        runInAction(() => {
            this.comments = comments;
        })
    }


}

export default new NotificationStates();