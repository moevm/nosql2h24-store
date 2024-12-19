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
        warehouseAddress: 'default addres',
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
        warehouseAddress: 'default addres',
        tariffPerDay: 12.00
    }]

export let cellDefaultFilter = {
    startcellNum: 0,
    endcellNum: 10000, // => < 20
    starttierNum: 0,
    endtierNum: 10,  // => < 6
    isFree: true,
    needService: false,
    startsize: 0,
    endsize: 10.0,   // => < 2.1
    starttariffPerDay: 0,
    endtariffPerDay: 10000,     // => < 5001});
    startendOfRent: "1900-01-01T00:00",
    endendOfRent: "2050-12-12T00:00",
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

export let eventDefaultFilter = {
    _key: '',
    cellKey: '',
    userKey: '',
    description: "",
    action: "",
    startdateAndTime: "1900-01-01T00:00",
    enddateAndTime: "2050-12-12T00:00",
}

export let usersInit = [{
    _key: '1',
    nameSurnamePatronymic: "Крупская Ольга Дмитриевна",
    role: "lord",
    login: "LOGIN_1",
    password: "123pass",
    birthday: "1980-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    // rentedCells: [201, 321, 710],
    indebtedness: 0.00
}, {
    _key: '2',
    nameSurnamePatronymic: "Королева Полина Андреевна",
    role: "client",
    login: "LOGIN_2",
    password: "111",
    birthday: "2000-01-13",
    regDate: "2024-01-13",
    editDate: "2024-01-13",
    // rentedCells: [202, 901],
    indebtedness: 10.00
}]

export let usersDefaultFilter = {
    _key: '',
    nameSurnamePatronymic: "",
    role: "",
    login: "",
    startbirthday: "1900-01-01",
    endbirthday: "2050-12-12",
    starteditDate: "1900-01-01T00:00",
    endeditDate: "2050-12-12T00:00",
    startindebtedness: 0.0,
    endindebtedness: 100000,
    startregDate: "1900-01-01T00:00",
    endregDate: "2050-12-12T00:00",
}

interface Role{
    [key: string]: string,
    administrator: string, 
    employee: string,
    director: string,
    lord: string,
    client: string
}

export let roles : Role = {
    administrator: "Администратор", 
    employee: "Работник",
    director: "Директор",
    lord: "Владелец бизнеса",
    client: "Клиент"
}

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

export let warehouseDefaultFilter = {
    _key: "",
    address: "",
    cells: "",
    chiefKey: "",
    startcapacity: 0,
    endcapacity: 100000,
}
export const SIGN_IN_URL = "http://127.0.0.1:8080/Users/auth"
export const GET_ALL_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const GET_MY_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const GET_FREE_CELLS_URL = "http://127.0.0.1:8080/Cells/all"
export const POST_NEW_CELL_URL = "http://127.0.0.1:8080/Cells/new"
export const GET_ALL_EVENTS_URL = "http://127.0.0.1:8080/Events/all"
export const GET_ALL_USERS_URL = "http://127.0.0.1:8080/Users/all"
export const POST_NEW_USER_URL = "http://127.0.0.1:8080/Users/new"
export const GET_UNIQUE_DIRECTORS_KEYS_URL = "http://127.0.0.1:8080/Users/directorsKeys"
export const GET_ALL_WAREHOUSES_URL = "http://127.0.0.1:8080/Warehouses/all"
export const POST_NEW_WAREHOUSE_URL = "http://127.0.0.1:8080/Warehouses/new"
export const GET_UNIQUE_WAREHOUSES_KEYS_URL = "http://127.0.0.1:8080/Warehouses/keys"
export const AUTH_DB_URL = "http://127.0.0.1:8080/Init/create"
export const EXPORT_URL = "http://127.0.0.1:8080/Init/export"
export const IMPORT_URL = "http://127.0.0.1:8080/Init/import"
export const POST_SERVICE_CELL_URL = ""
export const POST_RENT_CELL_URL = "http://127.0.0.1:8080/Cells/rent"

export const STAT_COUNT_CELLS_WAREHOUSE = "http://127.0.0.1:8080/Statistics/CountCellsWarehouse"
export const STAT_EVENT_WAREHOUSE = "stat.json"
export const STAT_EVENT_USER = "statUser.json"
export const STAT_RENT_EVENT_CELL = "statEventCell.json"
export const STAT_BREAK_EVENT_CELL = "statEventCell.json"