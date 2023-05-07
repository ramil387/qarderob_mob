import generalStates from "@/states/general/generalStates"
import { footerVisibleObserver } from "@/utils/observers"
import { useEffect } from "react"

export const useFooterVisible = () => {
    useEffect(() => {
        footerVisibleObserver()
    }, [generalStates.curPage])
}