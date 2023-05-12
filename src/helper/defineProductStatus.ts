export const defineProductStatus = (status: number | null) => {
    switch (status) {
        case 3:
            return 'Az istifadə olunmuş'
        case 2:
            return 'Yeni və etiketli'
        case 1:
            return 'Yeni'

    }
}