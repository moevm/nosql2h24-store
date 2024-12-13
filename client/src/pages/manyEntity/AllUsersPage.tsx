import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, userFields } from "../../serviceFiles/types";
import { Table } from "react-bootstrap";
import {
  GET_ALL_USERS_URL,
  POST_NEW_USER_URL,
  usersDefaultFilter,
  usersInit,
} from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";
import Filter from "../../components/Filter";
import "../../css/manyEntity/AllUsersPage.css";

export default function AllUsersPage() {
  let navigate = useNavigate();
  const [users, setUsers] = useState(usersInit);
  const [filters, setFilters] = useState(usersDefaultFilter);

  useEffect(() => {
    console.log("отправлен запрос на получение пользователей, с параметрами:", filters);
    axios
      .get(GET_ALL_USERS_URL, { params: filters })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(
          "Ошибка при получении пользователей. Взяты дефолтные пользователи",
          error
        );
        setUsers(usersInit);
      });
  }, [filters]);
  function handleSendFilters(obj: any) {
    console.log("Получен объект в AllUsersPage (filters)", obj);
    obj.startbirthday = obj.startbirthday || usersDefaultFilter.startbirthday;
    obj.endbirthday = obj.startbirthday || usersDefaultFilter.startbirthday;
    obj.starteditDate = obj.startbirthday || usersDefaultFilter.startbirthday; 
    obj.endeditDate = obj.startbirthday || usersDefaultFilter.startbirthday; 
    obj.startindebtedness = obj.startindebtedness ? parseFloat(obj.startindebtedness) : usersDefaultFilter.startindebtedness;
    obj.endindebtedness = obj.endindebtedness ? parseFloat(obj.endindebtedness) : usersDefaultFilter.endindebtedness;
    obj.startregDate = obj.startbirthday || usersDefaultFilter.startbirthday;
    obj.endregDate = obj.startbirthday || usersDefaultFilter.startbirthday;
    setFilters(obj);
  }
  function handleSendNewData(newObj: User) {
    console.log("Получен объект в AllUsersPage", newObj);
    axios
      .post(POST_NEW_USER_URL, newObj)
      .then(() => {
        axios
          .get(GET_ALL_USERS_URL, { params: filters })
          .then((response) => {
            setUsers(response.data);
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
        .get(GET_ALL_USERS_URL, { params: filters })
        .then((response) => {
          setUsers(response.data);
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
      <td>{user.role}</td>
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
  return (
    <div className="allUsersPageContainer">
      {/* <Filter handleSend={handleSendFilters} obj={userFields}></Filter> */}
      <Addition handleSend={handleSendNewData} obj={userFields} listKeys={[]}></Addition>
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
    </div>
  );
}
