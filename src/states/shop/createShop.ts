import shopStates from "./shopStates"

export const createShop = async () => {
    try {
        shopStates.setCreateShopLoading(true)
        const body = {
            name: shopStates.name,
            address: shopStates.address,
            desc: shopStates.desc,
            phone: "0" + shopStates.phone.slice(4),
            email: shopStates.email,
            start_hour: shopStates.start_hour,
            end_hour: shopStates.end_hour,
            work_days: shopStates.work_days,
        }

        console.log({ body })
    } catch (error) {
        console.log(error)
    } finally {
        shopStates.resetCreateShop()
        shopStates.setCreateShopLoading(false)
    }
}