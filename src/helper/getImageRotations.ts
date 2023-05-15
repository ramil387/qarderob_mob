import { AdListType } from "@/types/adListType"

export const getImageRotations = (item: AdListType | undefined, index?: number = 0) => {
    if (!item) return []
    return [{ rotate: (item?.imagesRotations[index] || 0) + 'deg' }]
}