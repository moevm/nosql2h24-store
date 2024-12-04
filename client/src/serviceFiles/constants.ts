export let cellsInit = [
    { _key: '5', cellNum: 1, tierNum: 1, isFree: true, needService: true, endOfRent: "2025-02-02", size: 0.1, warehouseId: 1, tariffPerDay: 12.00 },
    { _key: '9', cellNum: 2, tierNum: 10, isFree: true, needService: false, endOfRent: "2025-01-02", size: 0.3, warehouseId: 2, tariffPerDay: 12.00 }]

export let eventsInit = [{
    _key: '1e4',
    dateAndTime: "2024-10-13 12:46:01",
    cellId: 1,
    userId: 1,
    action: "open",
    description: ""

}, {
    cellId: 2,
    userId: 1,
    _key: '2f4',
    description: "",
    action: "close",
    dateAndTime: "2024-11-13 13:50:01",

},
{
    _key: 'g33',
    cellId: 2,
    userId: 1,
    action: "breaking",
    dateAndTime: "2024-11-16 01:50:01",
    description: "Сломана дверца"

}]

export let usersInit = [{
    _key: '1',
    NameSurnamePatronymic: "Крупская Ольга Дмитриевна",
    role: "Client",
    login: "LOGIN_1",
    birthday: "1980-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    rentedCells: [201, 321, 710],
    indebtedness: 0.00
}, {
    _key: '2',
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
        _key: '1',
        address: "Voronezh",
        capacity: 10,
        chiefId: 1023,
        cells:  [201, 321, 710]
    },
    {
        _key: '2',
        address: "Moscow",
        capacity: 100,
        chiefId: 2303,
        cells:  [1, 3211, 10]
    }
]
export const SIGN_IN_URL = "http://localhost:8080/Users/auth"
export const GET_ALL_CELLS_URL = "http://localhost:8080/Cells/all"
export const GET_MY_CELLS_URL = ""
export const GET_FREE_CELLS_URL = ""
export const POST_NEW_CELL_URL = "http://localhost:8080/Cells/new"
export const GET_ALL_EVENTS_URL = "http://localhost:8080/Events/all"
export const POST_NEW_EVENT_URL = ""
export const GET_ALL_USERS_URL = "http://localhost:8080/Users/all"
export const POST_NEW_USER_URL = "http://localhost:8080/Users/new"
export const GET_ALL_WAREHOUSES_URL = "http://localhost:8080/Warehouses/all"
export const POST_NEW_WAREHOUSE_URL = "http://localhost:8080/Warehouses/new"
export const AUTH_DB_URL = "http://localhost:8080/Init/create"
export const EXPORT_URL = ""
export const IMPORT_URL = ""
export const POST_SERVICE_CELL_URL = ""