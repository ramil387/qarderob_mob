import slugify from "slugify"

export const makeSlugify = (str: string) => {
    return slugify(str, {
        replacement: '-',
        lower: true,
    })
}