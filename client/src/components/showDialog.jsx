import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'


export default function ShowDialog() {
    const [isOpen, setIsOpen] = useState(true);
    function handleClickClose(){
        setIsOpen(false);
    }
    return (<>
        <Dialog open={isOpen}>
            <DialogTitle>Вы теперь одеты как черт</DialogTitle>
            <Button variant="outlined" onClick={handleClickClose}>
                Ага
            </Button>
        </Dialog>
    </>)
}