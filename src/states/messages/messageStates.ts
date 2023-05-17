import { MessageType } from "@/types/messageType";
import { makeAutoObservable, runInAction } from "mobx";


type Inbox = {
    count: number;
    data: MessageType[];
}

class MessageStates {
    inbox: Inbox | null = null;
    inboxType: string = 'all';

    selectedInbox: MessageType | null = null;
    selectedConversationUUID: string | null = null;
    chat: any = {}

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

    setSelectedInbox(message: MessageType | null) {
        runInAction(() => {
            this.selectedInbox = message;
        })
    }

    setSelectedConversationUUID(uuid: string | null) {
        runInAction(() => {
            this.selectedConversationUUID = uuid;
        })
    }

    setChat(chat: any) {
        runInAction(() => {
            this.chat = chat
        })
    }


}

export default new MessageStates();