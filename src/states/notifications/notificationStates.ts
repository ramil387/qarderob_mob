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

    // comments
    commentText: string = '';
    commentLoading: boolean = false;
    receiver: any = null;
    parentCommentId: number = 0;

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

    setCommentText(text: string) {
        runInAction(() => {
            this.commentText = text;
        })
    }

    setCommentLoading(loading: boolean) {
        runInAction(() => {
            this.commentLoading = loading;
        })
    }

    setReceiver(receiver: any) {
        runInAction(() => {
            this.receiver = receiver;
        })
    }

    setParentCommentId(id: number) {
        runInAction(() => {
            this.parentCommentId = id;
        })
    }

    resetCommentStates() {
        runInAction(() => {
            this.commentText = '';
            this.commentLoading = false;
            this.receiver = null;
            this.parentCommentId = 0;
        })
    }



}

export default new NotificationStates();