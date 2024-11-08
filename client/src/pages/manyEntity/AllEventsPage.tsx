import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, eventFields } from "../../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Button, Tab } from "react-bootstrap";
import { eventsInit, GET_ALL_EVENTS_URL, POST_NEW_EVENT_URL } from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";

export default function AllEventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState(eventsInit);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        axios.post(GET_ALL_EVENTS_URL, filters).then(response => { setEvent(response.data) }).catch(error => {
            console.error('Ошибка при получении событий. Взяты дефолтные события', error);
            setEvent(eventsInit);
        });
    })
    function handleSendNewData(newObj: Event) {
        console.log("Получен объект в AllEventssPage", newObj);
        axios.post(POST_NEW_EVENT_URL, newObj).then(response => { setEvent(response.data) }).catch(error => {
            console.error('Ошибка при получении событий. Взяты дефолтные события', error);
            setEvent(eventsInit);
        });
    }

    function handleEventClick(event: Event) {
        navigate("/event", { state: event })
    }
    const listUsers = events.map((event: Event, index) =>
        <tr key={event.eventId} >
            <td>
                {event.eventId}
            </td>
            <td>
                {event.cellId}
            </td>
            <td>
                {event.userId}
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
        <Addition handleSend={handleSendNewData} obj={eventFields}></Addition>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        eventId
                    </th>
                    <th>
                        cellId
                    </th>
                    <th>
                        userId
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