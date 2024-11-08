import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, userFields } from "../../serviceFiles/types";
import { Button, Table } from "react-bootstrap";
import { GET_ALL_USERS_URL, POST_NEW_USER_URL, usersInit } from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";

export default function AllUsersPage() {
    let navigate = useNavigate();
    const [users, setUsers] = useState(usersInit);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        axios.get(GET_ALL_USERS_URL, {params: filters}).then(response => { setUsers(response.data) }).catch(error => {
            console.error('Ошибка при получении пользователей. Взяты дефолтные пользователи', error);
            setUsers(usersInit);
        });
    })
    function handleSendNewData(newObj: User) {
        console.log("Получен объект в AllUsersPage", newObj);
        axios.post(POST_NEW_USER_URL, newObj).then(response => { setUsers(response.data) }).catch(error => {
            console.error('Ошибка при получении пользователей. Взяты дефолтные пользователи', error);
            setUsers(usersInit);
        });
    }
    
    function handleUserClick(user: User) {
        navigate("/user", { state: user })
    }
    const listUsers = users.map((user: User, index) =>
        <tr key={user.id}>
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
            <td> <Button type="button" className="btn" onClick={() => handleUserClick(user)}> Подробнее </Button></td>
        </tr>
    )
    return (<>
        <Addition handleSend={handleSendNewData} obj={userFields}></Addition>
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