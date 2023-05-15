import { useEffect } from "react"
import { io } from "socket.io-client";
import { SERVER_BASE } from "@env";
import profileStates from "@/states/profile/profileStates";
import { fetchNotificationCount } from "@/states/notifications/fetchNotificationCount";


export const socket = io(SERVER_BASE, {
    extraHeaders: {
        authorization: profileStates.token as string,
    },
});

export const useNotificationListener = () => {
    useEffect(() => {
        socket.on(`notification-${profileStates.user?.id}`, (resp) => {
            fetchNotificationCount()
        })
    }, [])
}