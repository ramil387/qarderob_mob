import { api } from "@/services/httpMethods"
import { fetchMe } from "@/states/profile/fetchMe"
import profileStates from "@/states/profile/profileStates"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"

export const useFetchMe = () => {

    const getToken = async () => {
        const token = await AsyncStorage.getItem('token').then(d => d)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        console.log({ token })
        profileStates.setToken(token)
        if (token) {
            fetchMe()
        }
    }

    useEffect(() => {
        getToken()
    }, [])
}