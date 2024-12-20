import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, userFields } from "../../serviceFiles/types";
import { Pagination, Table } from "react-bootstrap";
import {
    GET_ALL_USERS_URL,
    POST_NEW_USER_URL,
    usersDefaultFilter,
    usersInit, roles
} from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";
import Filter from "../../components/Filter";
import "../../css/manyEntity/AllUsersPage.css";

export default function AllUsersPage() {
    let navigate = useNavigate();
    const [users, setUsers] = useState(usersInit);
    const [filters, setFilters] = useState(usersDefaultFilter);
    const [countPages, setCountPages] = useState(3);
    const [curPage, setCurPage] = useState(0);

    useEffect(() => {
        console.log("отправлен запрос на получение пользователей, с параметрами:", filters);
        axios
            .post(GET_ALL_USERS_URL, {...filters, page: curPage})
            .then((response) => {
                console.log(response);
                setUsers(response.data.users);
                setCountPages(response.data.count);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении пользователей. Взяты дефолтные пользователи",
                    error
                );
                setUsers(usersInit);
            });
    }, [filters, curPage]);
    function handleSendFilters(obj: any) {
        console.log("Получен объект в AllUsersPage (filters)", obj);
        obj.startindebtedness = parseFloat(obj.startindebtedness);
        obj.endindebtedness = parseFloat(obj.endindebtedness);
        setFilters(obj);
    }
    function handleSendNewData(newObj: User) {
        console.log("Получен объект в AllUsersPage", newObj);
        axios
            .post(POST_NEW_USER_URL, newObj)
            .then(() => {
                axios
                    .post(GET_ALL_USERS_URL, {...filters, page: curPage})
                    .then((response) => {
                        setUsers(response.data.users);
                        setCountPages(response.data.count);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении пользователей. Взяты дефолтные пользователи",
                            error
                        );
                        setUsers(usersInit);
                    });
            })
            .catch((error) => {
                axios
                    .post(GET_ALL_USERS_URL, {...filters, page: curPage})
                    .then((response) => {
                        setUsers(response.data.users);
                        setCountPages(response.data.count);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении пользователей. Взяты дефолтные пользователи",
                            error
                        );
                        setUsers(usersInit);
                    });
                console.error("Ошибка при создании пользователя.", error);
            });
    }

    function handleUserClick(user: User) {
        navigate("/user", { state: user });
    }
    const listUsers = users.map((user: User, index) => (
        <tr key={user._key}>
            <td>{user._key}</td>
            <td>{user.nameSurnamePatronymic}</td>
            <td>{user.login}</td>
            <td>{roles[user.role]}</td>
            <td>{user.regDate}</td>
            <td>{user.birthday}</td>
            <td>{user.editDate}</td>
            {/* <td>
                {user.rentedCells.length}
            </td> */}
            <td>{user.indebtedness}</td>
            <td>
                {" "}
                <button
                    type="button"
                    className="button"
                    onClick={() => handleUserClick(user)}
                >
                    {" "}
                    Подробнее{" "}
                </button>
            </td>
        </tr>
    ));
    function handlePageChange(i: number) {
        setCurPage(i)
    }
    const paginationList = []
    for (let i = 0; i < countPages; i++) {
        paginationList.push(<Pagination.Item key={i} active={i === curPage} onClick={() => handlePageChange(i)}>{i + 1}</Pagination.Item>)
    }
    return (
        <div className="allUsersPageContainer">
            <Filter handleSend={handleSendFilters} obj={userFields} default={usersDefaultFilter}></Filter>
            <Addition handleSend={handleSendNewData} obj={userFields} listKeys={[]} default={usersDefaultFilter}></Addition>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="tableName">_key</th>
                        <th className="tableName">ФИО</th>
                        <th className="tableName">Логин</th>
                        <th className="tableName">Роль</th>
                        <th className="tableName">Дата регистрации</th>
                        <th className="tableName">Дата рождения</th>
                        <th className="tableName">Дата обновления</th>
                        {/* <th>
                        Количество арендованных ячеек
                    </th> */}
                        <th className="tableName">Задолженность</th>
                    </tr>
                </thead>
                <tbody>{listUsers}</tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => { if (curPage > 0) setCurPage(curPage - 1) }} />
                {paginationList}
                <Pagination.Last onClick={() => { if (curPage < countPages - 1) setCurPage(curPage + 1) }} />
            </Pagination>
        </div>
    );
}
