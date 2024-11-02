import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../serviceFiles/types";

export default function EventsPage() {
    let navigate = useNavigate();

    const [events, setEvent] = useState([{
        eventId: 1
    }, {
        eventId: 2
    }]);
    function handleUserClick(event: Event){
        navigate("/event", {state: event})
    }
    const listUsers = events.map((event: Event, index) =>
        <TableRow key={event.eventId} onClick={()=>handleUserClick(event)}>
            <TableCell>
                {event.eventId}
            </TableCell>
        </TableRow>
    )
    return (<>
        <Table>
            <TableHead>
                <TableCell>
                    id
                </TableCell>
            </TableHead>
            <TableBody>
                {listUsers}
            </TableBody>
        </Table>
    </>)
}