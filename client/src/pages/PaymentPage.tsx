import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";

export default function PaymentPage() {
    return (<>
        <h2> Оплата </h2>
        <ListItemButton>
            <Button variant="outlined"> Оплата по карте </Button>
        </ListItemButton>
        <ListItemButton >
            <Button variant="outlined"> Оплата по СБП </Button>
        </ListItemButton>
    </>)
}