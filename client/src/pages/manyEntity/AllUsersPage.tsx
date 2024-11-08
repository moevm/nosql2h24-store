import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../serviceFiles/types";
import { Table } from "react-bootstrap";
import { usersInit } from "../../serviceFiles/constants";

export default function AllUsersPage() {
    let navigate = useNavigate();

    const [users, setUsers] = useState(usersInit);
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
                {user.regDate}
            </td>
            <td>
                {user.birthday}
            </td>
            <td>
                {user.editDate}
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
                <tr>
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
                </tr>
            </thead>
            <tbody>
                {listUsers}
            </tbody>
        </Table>
    </>)
}