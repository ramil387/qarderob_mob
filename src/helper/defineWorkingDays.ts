export const defineWorkingDays = (work_days: string | undefined) => {
    if (!work_days) return
    if (work_days === '1') {
        return 'Bazar e. - Cümə'
    }
    else if (work_days === '2') {
        return 'Bazar e. - Şənbə'
    }
    else {
        return 'Hər gün'
    }
}