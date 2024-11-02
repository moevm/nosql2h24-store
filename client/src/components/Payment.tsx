import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";
import { Cell } from "../serviceFiles/types";

export default function Payment(props: { cell: Cell|null, handleClick: any, isOpen: boolean }) {
    function handleClickClose() {
        props.handleClick()
    }
    return (<>
    {console.log("in dialog", props.cell)}
        <Dialog open={props.isOpen}>
            <DialogTitle>Оплата аренды ячейки</DialogTitle>
            <p>Ячейка номер {props.cell!.cellId}</p>
            <p>Размер {props.cell!.size}</p>
            <ListItemButton>
                <Button variant="outlined"> Оплата по карте </Button>
            </ListItemButton>
            <ListItemButton >
                <Button variant="outlined"> Оплата по СБП </Button>
            </ListItemButton>
            <Button variant="outlined" onClick={handleClickClose}>
                Отмена
            </Button>
        </Dialog>
    </>)
}
