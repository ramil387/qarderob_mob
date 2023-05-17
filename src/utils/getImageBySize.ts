import { assetUrl } from "@/constants"

type Size = 'sm' | 'md' | 'lg'

export const getAdImageBySize = (size: Size, id: number | undefined, imgName?: string | undefined) => {
    if (!id || !imgName) return
    return `${assetUrl}a/${id}/${size}/${imgName}`
}