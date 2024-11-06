import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Tab } from "react-bootstrap";

export default function AllEventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState([
        {
            eventId: 1,
            cellId: 1,
            userId: 1,
            action: "open",
            dateAndTime: "2024-10-13 12:46:01",
            description: ""

        }, {
            eventId: 2,
            cellId: 2,
            userId: 1,
            action: "close",
            dateAndTime: "2024-11-13 13:50:01",
            description: ""

        },
        {
            eventId: 3,
            cellId: 2,
            userId: 1,
            action: "breaking",
            dateAndTime: "2024-11-16 01:50:01",
            description: "Сломана дверца"

        }]);
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