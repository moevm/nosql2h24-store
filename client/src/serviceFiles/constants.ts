export let cellsInit = [
    { cellId: 5, isFree: true, needService: true, endOfRent: "2025-02-02", size: 0.1, warehouse: "Комендантский проспект" },
    { cellId: 9, isFree: true, needService: false, endOfRent: "2025-01-02", size: 0.3, warehouse: "Большевиков" },
    { cellId: 4, isFree: true, needService: true, endOfRent: "2026-02-01", size: 0.6, warehouse: "Электросила" }]

export let eventsInit = [{
    eventId: 1,
    cellId: 1,
    userId: 1,
    action: "open",
    dateAndTime: "2024-10-13 12:46:01",
    description: ""

}, {
    eventId: 2,
    cellId: 2,
    userId: 1,
    action: "close",
    dateAndTime: "2024-11-13 13:50:01",
    description: ""

},
{
    eventId: 3,
    cellId: 2,
    userId: 1,
    action: "breaking",
    dateAndTime: "2024-11-16 01:50:01",
    description: "Сломана дверца"

}]

export let usersInit = [{
    id: 1,
    NameSurnamePatronymic: "Крупская Ольга Дмитриевна",
    role: "Client",
    login: "LOGIN_1",
    date: "2024-01-13",
    rentedCells: [201, 321, 710],
    indebtedness: 0.00
}, {
    id: 2,
    NameSurnamePatronymic: "Королева Полина Андреевна",
    role: "User",
    login: "LOGIN_2",
    date: "2023-04-10",
    rentedCells: [202, 901],
    indebtedness: 10.00
}]
export const SIGN_IN_URL = "src/serviceFiles/data.ts"