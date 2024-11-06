import { useState } from "react";
import { Cell } from "../serviceFiles/types";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function PaymentPage() {
    const {state} = useLocation();
    let navigate = useNavigate();
    function handleClick(){
        navigate("/rentCell")
    }
    return (<>
    {console.log("in payment", state)}
        <h2>Оплата аренды ячейки</h2>
        <div>
            <p>Ячейка номер {state.cellId}</p>
            <p>Размер {state.size}</p>
            <Button> Оплата по карте </Button>
            <Button> Оплата по СБП </Button>
            <Button onClick={handleClick}>Отмена</Button>
            
        </div>
    </>)
}
