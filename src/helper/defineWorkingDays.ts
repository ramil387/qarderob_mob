export const defineWorkingDays = (work_days: string) => {
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