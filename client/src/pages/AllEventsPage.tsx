import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../serviceFiles/types";

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
        <TableRow key={event.eventId} onClick={() => handleUserClick(event)}>
            <TableCell>
                {event.eventId}
            </TableCell>
            <TableCell>
                {event.cellId}
            </TableCell>
            <TableCell>
                {event.userId}
            </TableCell>
            <TableCell>
                {event.action}
            </TableCell>
            <TableCell>
                {event.dateAndTime}
            </TableCell>
            <TableCell>
                {event.description}
            </TableCell>
        </TableRow>
    )
    return (<>
        <Table>
            <TableHead>
                <TableCell>
                    eventId
                </TableCell>
                <TableCell>
                    cellId
                </TableCell>
                <TableCell>
                    userId
                </TableCell>
                <TableCell>
                    action
                </TableCell>
                <TableCell>
                    dateAndTime
                </TableCell>
                <TableCell>
                    description
                </TableCell>
            </TableHead>
            <TableBody>
                {listUsers}
            </TableBody>
        </Table>
    </>)
}