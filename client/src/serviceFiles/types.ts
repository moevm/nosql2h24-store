export type Cell = { cellId: number, isFree: boolean, needService: boolean, size: number, endOfRent: string, warehouse: string }

export let cellFields = {
    cellId: { name: "id", type: "s" }, isFree: { name: "Свободна", type: "b" }, needService: { name: "Нужно ТО", type: "b" }, size: { name: "Размер", type: "s" }, endOfRent: { name: "КонецАренды", type: "d" }, warehouseId: { name: "id склада", type: "s" }, tarifPerDay: {name: "Тариф", type: "s"}
};
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
    cellId: number,
    userId: number,
    action: string,
    dateAndTime: string,
    description: string
}

export type Warehouse = {
    id: number,
    adress: string,
    capacity: number,
    chiefId: number,
}