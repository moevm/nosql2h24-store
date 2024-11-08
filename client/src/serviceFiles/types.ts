export type Cell = { cellId: number, cellNum: number, tierNum: number, isFree: boolean, needService: boolean, size: number, endOfRent: string, warehouseId: number }

export let cellFields = {
    cellId: { name: "id", type: "s" },
    cellNum: { name: "Номер", type: "s" },
    tierNum: { name: "Ряд", type: "s" },
    isFree: { name: "Свободна", type: "b" }, 
    needService: { name: "Нужно ТО", type: "b" }, 
    size: { name: "Размер", type: "s" }, 
    endOfRent: { name: "КонецАренды", type: "d" }, 
    warehouseId: { name: "id склада", type: "s" }, 
    tarifPerDay: { name: "Тариф", type: "s" }
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
    id: { name: "id", type: "s" },
    NameSurnamePatronymic: { name: "ФИО", type: "s" },
    role: { name: "Роль", type: "s" },
    login: { name: "Почта", type: "s" },
    birthday: { name: "Дата рождения", type: "s" },
    regDate: { name: "Дата регистрации", type: "s" },
    editDate: { name: "Дата обновления", type: "s" },
    rentedCells: { name: "Арендованные ячейки", type: "s" },
    indebtedness: { name: "Долг", type: "s" }
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
    eventId: { name: "id", type: "s" },
    cellId: { name: "id Ячейки", type: "s" },
    userId: { name: "id Пользователя", type: "s" },
    action: { name: "Действие", type: "s" },
    dateAndTime: { name: "Дата и время события", type: "s" },
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
    id: { name: "id", type: "s" },
    adress: { name: "Адресс", type: "s" },
    capacity: { name: "Вместимость", type: "s" },
    chiefId: { name: "id Ответственного", type: "s" },
    cells: { name: "Ячейки", type: "s" },
}