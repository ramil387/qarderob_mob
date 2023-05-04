import { assetUrl } from "@/constants"

type Size = 'sm' | 'md' | 'lg'

export const getAdImageBySize = (size: Size, id: number, imgName: string) => {
    return `${assetUrl}a/${id}/${size}/${imgName}`
}