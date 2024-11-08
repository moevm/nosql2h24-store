export type Cell = {
    cellId: number,
    cellNum: number,
    tierNum: number,
    isFree: boolean, 
    needService: boolean, 
    size: number, 
    endOfRent: string, 
    warehouseId: number,
    tarifPerDay: number
}

export let cellFields = {
    cellId: { name: "id", type: "n" },
    cellNum: { name: "Номер", type: "n" },
    tierNum: { name: "Ряд", type: "n" },
    isFree: { name: "Свободна", type: "b" },
    needService: { name: "Нужно ТО", type: "b" },
    size: { name: "Размер", type: "n" },
    endOfRent: { name: "КонецАренды", type: "d" },
    warehouseId: { name: "id склада", type: "n" },
    tarifPerDay: { name: "Тариф", type: "n" }
};
export type User = {
    id: number,
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
    id: { name: "id", type: "n" },
    NameSurnamePatronymic: { name: "ФИО", type: "s" },
    role: { name: "Роль", type: "s" },
    login: { name: "Почта", type: "s" },
    birthday: { name: "Дата рождения", type: "d" },
    regDate: { name: "Дата регистрации", type: "d" },
    editDate: { name: "Дата обновления", type: "d" },
    rentedCells: { name: "Арендованные ячейки", type: "n" },
    indebtedness: { name: "Долг", type: "n" }
}

export type Event = {
    eventId: number,
    cellId: number,
    userId: number,
    action: string,
    dateAndTime: string,
    description: string
}

export let eventFields = {
    eventId: { name: "id", type: "n" },
    cellId: { name: "id Ячейки", type: "n" },
    userId: { name: "id Пользователя", type: "n" },
    action: { name: "Действие", type: "s" },
    dateAndTime: { name: "Дата и время события", type: "d" },
    description: { name: "Описание", type: "s" }
}

export type Warehouse = {
    id: number,
    adress: string,
    capacity: number,
    chiefId: number,
    cells: number[],
}

export let warehouseFields = {
    id: { name: "id", type: "n" },
    adress: { name: "Адресс", type: "s" },
    capacity: { name: "Вместимость", type: "n" },
    chiefId: { name: "id Ответственного", type: "n" },
    cells: { name: "Ячейки", type: "n" },
}