import { APIS } from "@/constants"
import { http } from "@/services/httpMethods"
import userStates from "./userStates"
import { SearchedInfluencerType } from "@/types/influencerType"

export const searchInfluencer = async (searchValue: string) => {
    try {
        const resp = await http.get(`${APIS.search}/users?q=${searchValue}&type=influencer`)
        if (resp.data?.data) {
            const data = resp.data.data.map((inf: SearchedInfluencerType) => {
                return {
                    ...inf,
                    social_links: {
                        facebook: inf.facebook,
                        instagram: inf.instagram,
                        tiktok: inf.tiktok,
                    }
                }
            })
            userStates.setInfluencers(data)
        }
    } catch (error) {
        console.log(error)
    }
}