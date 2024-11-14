export type Cell = {
    _key: string,
    cellNum: number,
    tierNum: number,
    isFree: boolean, 
    needService: boolean, 
    size: number, 
    endOfRent: string, 
    warehouseId: number,
    tariffPerDay: number
}

export let cellFields = {
    _key: { name: "id", type: "s" },
    cellNum: { name: "Номер", type: "n" },
    tierNum: { name: "Ряд", type: "n" },
    isFree: { name: "Свободна", type: "b" },
    needService: { name: "Нужно ТО", type: "b" },
    size: { name: "Размер", type: "n" },
    endOfRent: { name: "КонецАренды", type: "d" },
    warehouseId: { name: "id склада", type: "n" },
    tariffPerDay: { name: "Тариф", type: "n" }
};
export type User = {
    _key: string,
    NameSurnamePatronymic: string,
    role: string,
    login: string,
    birthday: string,
    regDate: string,
    editDate: string,
    rentedCells: number[],
    indebtedness: number
}

export let userFields = {
    _key: { name: "id", type: "s" },
    NameSurnamePatronymic: { name: "ФИО", type: "s" },
    role: { name: "Роль", type: "s" },
    login: { name: "Почта", type: "s" },
    birthday: { name: "Дата рождения", type: "d" },
    regDate: { name: "Дата регистрации", type: "d" },
    editDate: { name: "Дата обновления", type: "d" },
    rentedCells: { name: "Арендованные ячейки", type: "l" },
    indebtedness: { name: "Долг", type: "n" }
}

export type Event = {
    _key: string,
    cellId: number,
    userId: number,
    action: string,
    dateAndTime: string,
    description: string
}

export let eventFields = {
    _key: { name: "id", type: "s" },
    cellId: { name: "id Ячейки", type: "n" },
    userId: { name: "id Пользователя", type: "n" },
    action: { name: "Действие", type: "s" },
    dateAndTime: { name: "Дата и время события", type: "d" },
    description: { name: "Описание", type: "s" }
}

export type Warehouse = {
    _key: string,
    address: string,
    capacity: number,
    chiefId: number,
    cells: number[],
}

export let warehouseFields = {
    _key: { name: "id", type: "s" },
    address: { name: "Адресс", type: "s" },
    capacity: { name: "Вместимость", type: "n" },
    chiefId: { name: "id Ответственного", type: "n" },
    cells: { name: "Ячейки", type: "l" },
}