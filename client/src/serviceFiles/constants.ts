export let cellsInit = [
    {
        _key: '5fdg',
        cellNum: 1,
        tierNum: 1,
        isFree: true,
        needService: true,
        endOfRent: "2025-02-02",
        size: 0.1,
        warehouseKey: 'fgd1',
        tariffPerDay: 12.00
    },
    {
        _key: 'fdg9',
        cellNum: 2,
        tierNum: 10,
        isFree: true,
        needService: false,
        endOfRent: "2025-01-02",
        size: 0.3,
        warehouseKey: 'dfg2',
        tariffPerDay: 12.00
    }]

export let cellDefaultFilter = {
    _key: "",
    warehouseKey: "",
    startcellNum: 0,
    endcellNum: 21, // => < 20
    starttierNum: 0,
    endtierNum: 6,  // => < 6
    isFree: true,
    needService: false,
    startsize: 0,
    endsize: 2.1,   // => < 2.1
    starttariffPerDay: 0,
    endtariffPerDay: 5001,     // => < 5001});
    startendOfRent: "2023-01-01T00:00:00.000Z",
    endendOfRent: "2050-12-12T00:00:00.000Z",
}
export let eventsInit = [{
    _key: '1e4',
    dateAndTime: "2024-10-13 12:46:01",
    cellKey: '1fd',
    userKey: '1dfg',
    action: "open",
    description: ""

}, {
    cellKey: 'df2',
    userKey: 'fgd1',
    _key: '2f4',
    description: "",
    action: "close",
    dateAndTime: "2024-11-13 13:50:01",

}]

export let usersInit = [{
    _key: '1',
    nameSurnamePatronymic: "Крупская Ольга Дмитриевна",
    role: "Client",
    login: "LOGIN_1",
    birthday: "1980-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    rentedCells: [201, 321, 710],
    indebtedness: 0.00
}, {
    _key: '2',
    nameSurnamePatronymic: "Королева Полина Андреевна",
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
        chiefKey: '1fdg02gfd3',
        cells: [201, 321, 710]
    },
    {
        _key: '2',
        address: "Moscow",
        capacity: 100,
        chiefKey: 'fdg2303fgd',
        cells: [1, 3211, 10]
    }
]
export const SIGN_IN_URL = "http://127.0.0.1:8080/Users/auth"
export const GET_ALL_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const GET_MY_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const GET_FREE_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const POST_NEW_CELL_URL = "http://127.0.0.1:8080/Cells/new"
export const GET_ALL_EVENTS_URL = "http://127.0.0.1:8080/Events/all"
export const POST_NEW_EVENT_URL = ""
export const GET_ALL_USERS_URL = "http://127.0.0.1:8080/Users/all"
export const POST_NEW_USER_URL = "http://127.0.0.1:8080/Users/new"
export const GET_ALL_WAREHOUSES_URL = "http://127.0.0.1:8080/Warehouses/all"
export const POST_NEW_WAREHOUSE_URL = "http://127.0.0.1:8080/Warehouses/new"
export const AUTH_DB_URL = "http://127.0.0.1:8080/Init/create"
export const EXPORT_URL = ""
export const IMPORT_URL = ""
export const POST_SERVICE_CELL_URL = ""
export const POST_RENT_CELL_URL = ""