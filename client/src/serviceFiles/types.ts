export type Cell = {
    _key: string,
    cellNum: number,
    tierNum: number,
    isFree: boolean, 
    needService: boolean, 
    size: number, 
    endOfRent: string, 
    warehouseKey: string,
    tariffPerDay: number
}

export let cellFields = {
    _key: { name: "key", type: "s", noNeedAddition: true },
    cellNum: { name: "Номер", type: "n" },
    tierNum: { name: "Ряд", type: "n" },
    isFree: { name: "Свободна", type: "b", noNeedAddition: true },
    needService: { name: "Нужно ТО", type: "b", noNeedAddition: true },
    size: { name: "Размер", type: "nf" },
    endOfRent: { name: "КонецАренды", type: "dt", noNeedAddition: true },
    warehouseKey: { name: "key склада", type: "s" },
    tariffPerDay: { name: "Тариф", type: "n" }
};
export type User = {
    _key: string,
    nameSurnamePatronymic: string,
    role: string,
    login: string,
    birthday: string,
    regDate: string,
    editDate: string,
    rentedCells: number[],
    indebtedness: number
}

export let userFields = {
    _key: { name: "id", type: "s", noNeedAddition: true },
    nameSurnamePatronymic: { name: "ФИО", type: "s" },
    role: { name: "Роль", type: "s" },
    login: { name: "Почта", type: "s" },
    birthday: { name: "Дата рождения", type: "d" },
    regDate: { name: "Дата регистрации", type: "dt", noNeedAddition: true },
    editDate: { name: "Дата обновления", type: "dt", noNeedAddition: true },
    rentedCells: { name: "Арендованные ячейки", type: "l", noNeedAddition: true },
    indebtedness: { name: "Долг", type: "n", noNeedAddition: true }
}

export type Event = {
    _key: string,
    cellKey: string,
    userKey: string,
    action: string,
    dateAndTime: string,
    description: string
}

export let eventFields = {
    _key: { name: "id", type: "s" },
    cellKey: { name: "key Ячейки", type: "s" },
    userKey: { name: "key Пользователя", type: "s" },
    action: { name: "Действие", type: "s" },
    dateAndTimeStart: { name: "Начало поиска", type: "dt" },
    dateAndTimeEnd: { name: "Конец поиска", type: "dt" },
    description: { name: "Описание", type: "s" }
}

export type Warehouse = {
    _key: string,
    address: string,
    capacity: number,
    chiefKey: string,
}

export let warehouseFields = {
    _key: { name: "id", type: "s", noNeedAddition: true },
    address: { name: "Адресс", type: "s" },
    capacity: { name: "Вместимость", type: "n" },
    chiefKey: { name: "key Ответственного", type: "s" },
    cells: { name: "Ячейки", type: "l", noNeedAddition: true },
}