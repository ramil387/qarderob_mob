import { AdListType } from "./adListType"

export type ProdListType = {
    data: AdListType[], count: number, has_next_page: boolean, next_page: number
}