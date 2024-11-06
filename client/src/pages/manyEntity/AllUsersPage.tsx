import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../serviceFiles/types";
import { Table } from "react-bootstrap";

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
        <tr key={user.id} onClick={()=>handleUserClick(user)}>
            <td>
                {user.id}
            </td>
            <td>
                {user.NameSurnamePatronymic}
            </td>
            <td>
                {user.login}
            </td>
            <td>
                {user.role}
            </td>
            <td>
                {user.date}
            </td>
            <td>
                {user.date}
            </td>
            <td>
                {user.date}
            </td>
            <td>
                {user.rentedCells.length}
            </td>
            <td>
                {user.indebtedness}
            </td>
        </tr>
    )
    return (<>
        <Table striped bordered hover>
            <thead>
                <th>
                    id
                </th>
                <th>
                    ФИО
                </th>
                <th>
                    Логин
                </th>
                <th>
                    Роль
                </th>
                <th>
                    Дата регистрации
                </th>
                <th>
                    Дата рождения
                </th>
                <th>
                    Дата обновления
                </th>
                <th>
                    Количество арендованных ячеек
                </th>
                <th>
                    Задолженность
                </th>
            </thead>
            <tbody>
                {listUsers}
            </tbody>
        </Table>
    </>)
}