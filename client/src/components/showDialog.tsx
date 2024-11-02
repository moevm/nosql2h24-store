import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'


export default function ShowDialog(props: {handleClick: any, isOpen: boolean}) {
    const [isOpen, setIsOpen] = useState(true);
    function handleClickClose(){
        props.handleClick()
    }
    return (<>
        <Dialog open={props.isOpen}>
            <DialogTitle>Вы теперь одеты как черт</DialogTitle>
            <Button variant="outlined" onClick={handleClickClose}>
                Ага
            </Button>
        </Dialog>
    </>)
}