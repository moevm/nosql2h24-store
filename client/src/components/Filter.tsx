import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./Filter.css";

export default function Filter(props: { handleSend: any, obj: any, default: any }) {
    const [state, setState] = useState(props.obj);

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        props.handleSend(formDataObj);
    }

    function reset(){
        props.handleSend(props.default);
    }
    const filters = []
    for (let key in props.obj) {
        if (!props.obj[key].noNeedFiltration){
            filters.push(
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">{props.obj[key].name}</InputGroup.Text>
                    {props.obj[key].type == "b" && <InputGroup.Checkbox defaultChecked={props.obj[key].default} name={key} />}
                    {["s", "select_dynamic"].includes(props.obj[key].type) && <div><Form.Control
                        placeholder={props.obj[key].name} name={key}
                    /></div>}
                    {
                        props.obj[key].type == "d" && <div><Form.Control type="date"
                            placeholder={props.obj[key].name + ' от'} name={'start' + key}
                            defaultValue={props.default['start' + key]}
                        /><Form.Control type="date"
                            placeholder={props.obj[key].name + ' до'} name={'end' + key}
                            defaultValue={props.default['end' + key]}
                            /></div>}
                    {
                        props.obj[key].type == "dt" && <div><Form.Control type="datetime-local"
                            placeholder={props.obj[key].name + ' от'} name={'start' + key}
                            defaultValue={props.default['start' + key]}
                        /><Form.Control type="datetime-local"
                            placeholder={props.obj[key].name + ' до'} name={'end' + key}
                            defaultValue={props.default['end' + key]}
                            /></div>}
                    {
                        props.obj[key].type == "n" && <div><Form.Control type="number"
                            placeholder={props.obj[key].name + ' от'} name={'start' + key}
                            defaultValue={props.default['start' + key]}
                        /><Form.Control type="number"
                            placeholder={props.obj[key].name + ' до'} name={'end' + key}
                            defaultValue={props.default['end' + key]}
                            /></div>}
                    {
                        props.obj[key].type == "nf" && <div><Form.Control
                            type="number"
                            step={0.1}
                            placeholder={props.obj[key].name + ' от'} name={'start' + key}
                            defaultValue={props.default['start' + key]}
                        /><Form.Control
                                type="number"
                                step={0.1}
                                placeholder={props.obj[key].name + ' до'} name={'end' + key}
                                defaultValue={props.default['end' + key]}
                            /></div>
                    }
                    {
                        props.obj[key].type == "l" && <Form.Control
                            placeholder={props.obj[key].name} name={key} pattern="[0-9,]+"
                        />
                    }
                    {props.obj[key].type == "select_const" && <Form.Select name={key}>{props.obj[key].options.map((role: string) => <option value={role[0]}>{role[1]}</option>)}</Form.Select>}
                </InputGroup>
            )
        }

    }
    return (<>
        <Form onSubmit={handleSubmit}>
            {filters}
            <Button type="submit">Поиск</Button>
            <Button type="reset" onClick={reset}>Очистить</Button>
        </Form>

    </>)
}
