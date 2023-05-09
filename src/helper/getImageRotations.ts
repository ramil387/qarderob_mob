import { AdListType } from "@/types/adListType"

export const getImageRotations = (item: AdListType) => {
    return [{ rotate: (item?.imagesRotations[0] || 0) + 'deg' }]
}