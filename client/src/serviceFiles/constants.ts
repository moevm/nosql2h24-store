export let cellsInit = [
    { cellId: 5, cellNum: 1, tierNum: 1, isFree: true, needService: true, endOfRent: "2025-02-02", size: 0.1, warehouseId: 1, tarifPerDay: 12.00 },
    { cellId: 9, cellNum: 2, tierNum: 10, isFree: true, needService: false, endOfRent: "2025-01-02", size: 0.3, warehouseId: 2, tarifPerDay: 12.00 },
    { cellId: 4, cellNum: 3, tierNum: 2, isFree: true, needService: true, endOfRent: "2026-02-01", size: 0.6, warehouseId: 3, tarifPerDay: 20.00}]

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
    birthday: "1980-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    rentedCells: [201, 321, 710],
    indebtedness: 0.00
}, {
    id: 2,
    NameSurnamePatronymic: "Королева Полина Андреевна",
    role: "User",
    login: "LOGIN_2",
    birthday: "2000-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    rentedCells: [202, 901],
    indebtedness: 10.00
}]

export let warehousesInit = [
    {
        id: 1,
        adress: "Voronezh",
        capacity: 10,
        chiefId: 1023,
        cells:  [201, 321, 710]
    },
    {
        id: 2,
        adress: "Moscow",
        capacity: 100,
        chiefId: 2303,
        cells:  [1, 3211, 10]
    }
]
export const SIGN_IN_URL = ""
export const GET_ALL_CELLS_URL = "Cells/get"
export const GET_MY_CELLS_URL = ""
export const GET_FREE_CELLS_URL = ""
export const POST_NEW_CELL_URL = "Cells/post"
export const GET_ALL_EVENTS_URL = "Events/get"
export const POST_NEW_EVENT_URL = ""
export const GET_ALL_USERS_URL = "Users/get"
export const POST_NEW_USER_URL = "Users/post"
export const GET_ALL_WAREHOUSES_URL = "Warehouses/get"
export const POST_NEW_WAREHOUSE_URL = "Warehouses/post"