import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Tab } from "react-bootstrap";
import { eventsInit } from "../../serviceFiles/constants";

export default function AllEventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState(eventsInit);
    function handleUserClick(event: Event) {
        navigate("/event", { state: event })
    }
    const listUsers = events.map((event: Event, index) =>
        <tr key={event.eventId} onClick={() => handleUserClick(event)}>
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
        </tr>
    )
    return (<>
        <Table striped bordered hover>
            <thead>
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
            </thead>
            <tbody>
                {listUsers}
            </tbody>
        </Table>
    </>)
}