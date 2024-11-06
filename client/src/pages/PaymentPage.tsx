import { useState } from "react";
import { Cell } from "../serviceFiles/types";
import { useLocation, useNavigate } from "react-router-dom";

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
            <button> Оплата по карте </button>
            <button> Оплата по СБП </button>
            <button onClick={handleClick}>Отмена</button>
            
        </div>
    </>)
}
