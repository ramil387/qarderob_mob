import { keyboardObserver, removeKeyboardObserver } from "@/utils/observers"
import { useEffect } from "react"

export const useKeyboardObserver = () => {

    useEffect(() => {
        keyboardObserver();
        return () => {
            removeKeyboardObserver();
        }
    }, [])

}