import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, eventFields } from "../../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Button, Pagination, Tab } from "react-bootstrap";
import {
    eventDefaultFilter,
    eventsInit,
    GET_ALL_EVENTS_URL,
} from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";
import Filter from "../../components/Filter";
import "../../css/manyEntity/AllEventsPage.css";

export default function AllEventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState(eventsInit);
    const [filters, setFilters] = useState(eventDefaultFilter);
    const [countPages, setCountPages] =  useState(3);
    const [curPage, setCurPage] =  useState(0);

    useEffect(() => {
        console.log("отправлен запрос на получение событий, с параметрами:", filters);
        axios
            .post(GET_ALL_EVENTS_URL, {...filters, page: curPage})
            .then((response) => {
                console.log(response);
                setEvent(response.data.events);
                setCountPages(response.data.count);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении событий. Взяты дефолтные события",
                    error
                );
                setEvent(eventsInit);
            });
    }, [filters, curPage]);
    function handleSendFilters(obj: any) {
        console.log("Получен объект в AllEventsPage (filters)", obj);
        setFilters(obj);
    }

    function handleEventClick(event: Event) {
        navigate("/event", { state: event });
    }
    const listUsers = events.map((event: Event, index) => (
        <tr key={event._key}>
            <td>{event._key}</td>
            <td>{event.cellKey}</td>
            <td>{event.userKey}</td>
            <td>{event.action}</td>
            <td>{event.dateAndTime}</td>
            <td>{event.description}</td>
            <td>
                {" "}
                <button
                    type="button"
                    className="button"
                    onClick={() => handleEventClick(event)}
                >
                    {" "}
                    Подробнее{" "}
                </button>
            </td>
        </tr>
    ));
    function handlePageChange(i: number){
        setCurPage(i)
    }
    const paginationList = []
    for(let i = 0; i<countPages; i++){
        paginationList.push(<Pagination.Item key={i} active={i===curPage} onClick={()=>handlePageChange(i)}>{i+1}</Pagination.Item>)
    }
    return (
        <div className="allEventsPageContainer">
            <Filter handleSend={handleSendFilters} obj={eventFields} default={eventDefaultFilter}></Filter>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="tableName">_key события</th>
                        <th className="tableName">_key ячейки</th>
                        <th className="tableName">_key пользователя</th>
                        <th className="tableName">action</th>
                        <th className="tableName">dateAndTime</th>
                        <th className="tableName">description</th>
                    </tr>
                </thead>
                <tbody>{listUsers}</tbody>
            </Table>
            <Pagination>
                <Pagination.First />
                {paginationList}
                <Pagination.Last />
            </Pagination>
        </div>
    );
}
