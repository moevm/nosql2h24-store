import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, eventFields } from "../../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Button, Tab } from "react-bootstrap";
import { eventsInit, GET_ALL_EVENTS_URL, POST_NEW_EVENT_URL } from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";
import Filter from "../../components/Filter";

export default function AllEventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState(eventsInit);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        axios.get(GET_ALL_EVENTS_URL, { params: filters }).then(response => { console.log(response); setEvent(response.data); }).catch(error => {
            console.error('Ошибка при получении событий. Взяты дефолтные события', error);
            setEvent(eventsInit);
        });
    }, [])
    function handleSendFilters(obj: Event) {
        console.log("Получен объект в AllEventsPage (filters)", obj);
        setFilters(obj)
    }

    function handleEventClick(event: Event) {
        navigate("/event", { state: event })
    }
    const listUsers = events.map((event: Event, index) =>
        <tr key={event._key} >
            <td>
                {event._key}
            </td>
            <td>
                {event.cellKey}
            </td>
            <td>
                {event.userKey}
            </td>
            <td>
                {event.action}
            </td>
            <td>
                {event.dateAndTime}
            </td>
            <td>
                {event.description}
            </td>
            <td> <Button type="button" className="btn" onClick={() => handleEventClick(event)}> Подробнее </Button></td>
        </tr>
    )
    return (<>
        <Filter handleSend={handleSendFilters} obj={eventFields}></Filter>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        _key события
                    </th>
                    <th>
                    _key ячейки
                    </th>
                    <th>
                    _key пользователя
                    </th>
                    <th>
                        action
                    </th>
                    <th>
                        dateAndTime
                    </th>
                    <th>
                        description
                    </th>
                </tr>
            </thead>
            <tbody>
                {listUsers}
            </tbody>
        </Table>
    </>)
}