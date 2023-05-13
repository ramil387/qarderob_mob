import productStates from "@/states/product/productStates"

export const defineProductVerifiedMessage = (verified: string | undefined) => {
    if (verified === null) return ''
    if (verified === 'true') return ''
    if (verified === 'false') return `Elanınız yoxlamaya göndərildi.\nQaydalara və şərtlərə uyğun olarsa, dərc ediləcək. Təşəkkürlər!`
    if (verified === 'rej') return productStates?.selectedProduct?.rejectReason
    if (verified === 'exp') return `Hörmətli istifadəçi,\nElanınız deaktiv olundu. Bundan sonra elan "Müddəti başa çatmış" elanlar sırasında görünəcək. Elanı yenidən bərpa edə bilərsiniz.`

}