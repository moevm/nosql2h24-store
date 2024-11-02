export type Cell = { cellId: number, isFree: boolean, needService: boolean, size: number, endOfRent: string, warehouse: string }
export type User = {
    id: number,
    NameSurnamePatronymic: string,
    role: string,
    login: string,
    date: string,
    rentedCells: number[],
    indebtedness: number
}
export type Event = {
    eventId: number,
}