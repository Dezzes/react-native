export const formatDateForUser = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${day}.${month}.${year}`
}

export const formatDateForServer = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${year}-${month}-${day}`
}

export const getCheckoutDate = (checkIn: Date, daysCount: string): Date => {
    let date = new Date()
    let checkout = new Date(date.setDate(checkIn.getDate() + Number(daysCount)))
    return checkout
}