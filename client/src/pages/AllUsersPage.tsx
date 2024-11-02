import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";

export default function AllUsersPage() {
    let navigate = useNavigate();

    const [users, setUsers] = useState([{
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
    }]);
    function handleUserClick(user: User){
        navigate("/user", {state: user})
    }
    const listUsers = users.map((user: User, index) =>
        <TableRow key={user.id} onClick={()=>handleUserClick(user)}>
            <TableCell>
                {user.id}
            </TableCell>
            <TableCell>
                {user.NameSurnamePatronymic}
            </TableCell>
            <TableCell>
                {user.login}
            </TableCell>
            <TableCell>
                {user.role}
            </TableCell>
            <TableCell>
                {user.date}
            </TableCell>
            <TableCell>
                {user.date}
            </TableCell>
            <TableCell>
                {user.date}
            </TableCell>
            <TableCell>
                {user.rentedCells.length}
            </TableCell>
            <TableCell>
                {user.indebtedness}
            </TableCell>
        </TableRow>
    )
    return (<>
        <Table>
            <TableHead>
                <TableCell>
                    id
                </TableCell>
                <TableCell>
                    ФИО
                </TableCell>
                <TableCell>
                    Логин
                </TableCell>
                <TableCell>
                    Роль
                </TableCell>
                <TableCell>
                    Дата регистрации
                </TableCell>
                <TableCell>
                    Дата рождения
                </TableCell>
                <TableCell>
                    Дата обновления
                </TableCell>
                <TableCell>
                    Количество арендованных ячеек
                </TableCell>
                <TableCell>
                    Задолженность
                </TableCell>
            </TableHead>
            <TableBody>
                {listUsers}
            </TableBody>
        </Table>
    </>)
}