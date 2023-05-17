import { MessageType } from "@/types/messageType";
import { makeAutoObservable, runInAction } from "mobx";


type Inbox = {
    count: number;
    data: MessageType[];
}

class MessageStates {
    inbox: Inbox | null = null;
    inboxType: string = 'all';

    constructor() {
        makeAutoObservable(this);
    }

    setInbox(inbox: Inbox | null) {
        runInAction(() => {
            this.inbox = inbox;
        })
    }

    setInboxType(type: string) {
        runInAction(() => {
            this.inboxType = type;
        })
    }

}

export default new MessageStates();