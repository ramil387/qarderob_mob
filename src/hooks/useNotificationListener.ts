import { useEffect } from "react"
import { io } from "socket.io-client";
import { SERVER_BASE } from "@env";
import profileStates from "@/states/profile/profileStates";
import { fetchNotificationCount } from "@/states/notifications/fetchNotificationCount";
import { fetchNotifications } from "@/states/notifications/fetchNotifications";


export const socket = io(SERVER_BASE, {
    extraHeaders: {
        authorization: profileStates.token as string,
    },
});

export const useNotificationListener = () => {
    useEffect(() => {
        if (!profileStates.user?.id) return
        socket.on(`notification-${profileStates.user?.id}`, (resp) => {
            fetchNotificationCount()
            fetchNotifications()
        })
        fetchNotificationCount()
        fetchNotifications()

        return () => {
            socket.off(`notification-${profileStates.user?.id}`);
        };

    }, [profileStates.user?.id])
}