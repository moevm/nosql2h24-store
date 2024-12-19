import { Chart, registerables, Colors } from "chart.js"
import { CategoryScale } from "chart.js"
import { Bar } from "react-chartjs-2"
import { Accordion, Button, Form, InputGroup } from "react-bootstrap";
import "../css/StatisticPage.css"
import axios from "axios";
import { STAT_BREAK_EVENT_CELL, STAT_COUNT_CELLS_WAREHOUSE, STAT_EVENT_USER, STAT_EVENT_WAREHOUSE, STAT_RENT_EVENT_CELL } from "../serviceFiles/constants";
import { useEffect, useState } from "react";

Chart.register(...registerables, Colors);
//TO DO get исправить на post 

export default function StatisticPage() {
    const [labelsServer, setLabels] = useState([])
    const [dataServer, setData] = useState([])
    const [type, setType] = useState("")
    const [scaleName, setScaleName] = useState([""])

    const listKeys = ["4358fdg", "456fdg"];
    const data = {
        labels: labelsServer,
        datasets: [{
            label: type,
            data: dataServer,
            borderColor: "#6a5acd",
            backgroundColor: "rgb(149, 140, 206)"

        }]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: scaleName[1],
                    color:"rgb(66, 56, 134)",
                    font: {
                        size: 20,
                        
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: scaleName[0],
                    color:"rgb(66, 56, 134)",
                    font: {
                        size: 20,
                        
                    }
                }
            }
        }
    };

    useEffect(()=>{
        handleCountCellsWarehouse();
    }, [])

    function handleCountCellsWarehouse() {
        axios.get(STAT_COUNT_CELLS_WAREHOUSE).then((res) => {
            console.log(res.data);
            setType("Количество ячеек по складам");
            setScaleName(["Кол-во ячеек", "Склад"]);
            setData(res.data.map((item: any) => item.count))
            setLabels(res.data.map((item: any) => [item.warehouseKey, item.warehouseAddress]))
        }).catch((error) => {
            console.error(
                "Ошибка при получении статистики",
                error
            );
        });
    }
    function handleEventWarehouse(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)
        axios.post(STAT_EVENT_WAREHOUSE, formDataObj).then((res) => {
            console.log(res.data);
            setType("Используемость складов");
            setScaleName(["Кол-во аренд", "Склад"]);
            setData(res.data.map((item: any) => item.count))
            setLabels(res.data.map((item: any) => [item._key, item.address]))
        }).catch((error) => {
            console.error(
                "Ошибка при получении статистики",
                error
            );
        });
    }

    function handleEventUser(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)
        axios.post(STAT_EVENT_USER, formDataObj).then((res) => {
            console.log(res.data);
            setType("Продуктивность рабочих");
            setScaleName(["Кол-во ремонтов", "Рабочий"]);
            setData(res.data.map((item: any) => item.count))
            setLabels(res.data.map((item: any) => [item._key, item.nameSurnamePatronymic]))
        }).catch((error) => {
            console.error(
                "Ошибка при получении статистики",
                error
            );
        });
    }

    function handleRentEventCell(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)
        axios.post(STAT_RENT_EVENT_CELL, formDataObj).then((res) => {
            console.log(res.data);
            setType("Используемость ячеек");
            setScaleName(["Кол-во аренд", "Ячейка"]);
            setData(res.data.map((item: any) => item.count))
            setLabels(res.data.map((item: any) => [item._key, item.cellNum]))
        }).catch((error) => {
            console.error(
                "Ошибка при получении статистики",
                error
            );
        });
    }

    function handleBreakEventCell(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)
        axios.post(STAT_BREAK_EVENT_CELL, formDataObj).then((res) => {
            console.log(res.data);
            setType("Проблемность ячеек");
            setScaleName(["Кол-во поломок", "Ячейка"]);
            setData(res.data.map((item: any) => item.count))
            setLabels(res.data.map((item: any) => [item._key, item.cellNum]))
        }).catch((error) => {
            console.error(
                "Ошибка при получении статистики",
                error
            );
        });
    }

    return (<div className="flexContainer">
        <Accordion defaultActiveKey="0" className="accordion">
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-fixSize">Количество ячеек по складам</Accordion.Header>
                <Accordion.Body>
                    <p>Количество ячеек по складам</p>
                    <Button onClick={handleCountCellsWarehouse}>Построить</Button>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header className="accordion-fixSize">Используемость складов</Accordion.Header>
                <Accordion.Body>
                    <p>Количество событий "Аренда" суммарное по всем ячейкам для каждого склада за выбранный период</p>
                    <Form onSubmit={handleEventWarehouse}>
                        <InputGroup.Text id="basic-addon1">Склад</InputGroup.Text>
                        <Form.Select name="warehouse">{listKeys.map((warehouseKey: string) => <option value={warehouseKey}>{warehouseKey}</option>)}</Form.Select>
                        <InputGroup.Text id="basic-addon1">Начальная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="start"
                            defaultValue="1900-01-01T00:00" />
                        <InputGroup.Text id="basic-addon1">Конечная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="end"
                            defaultValue="2050-12-12T00:00" />
                        <Button type="submit">Построить</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header className="accordion-fixSize">Продуктивность рабочих</Accordion.Header>
                <Accordion.Body>
                    <p>Количество событий "Проведено ТО" для каждого работника за выбранный период</p>
                    <Form onSubmit={handleEventUser}>
                        <InputGroup.Text id="basic-addon1">Начальная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="start"
                            defaultValue="1900-01-01T00:00" />
                        <InputGroup.Text id="basic-addon1">Конечная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="end"
                            defaultValue="2050-12-12T00:00" />
                        <Button type="submit">Построить</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header className="accordion-fixSize">Используемость ячеек</Accordion.Header>
                <Accordion.Body>
                    <p>Количество событий "Аренда" для каждой ячейки выбранного склада за выбранный период</p>
                    <Form onSubmit={handleRentEventCell}>
                        <InputGroup.Text id="basic-addon1">Склад</InputGroup.Text>
                        <Form.Select name="warehouse">{listKeys.map((warehouseKey: string) => <option value={warehouseKey}>{warehouseKey}</option>)}</Form.Select>
                        <InputGroup.Text id="basic-addon1">Начальная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="start"
                            defaultValue="1900-01-01T00:00" />
                        <InputGroup.Text id="basic-addon1">Конечная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="end"
                            defaultValue="2050-12-12T00:00" />
                        <Button type="submit">Построить</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header className="accordion-fixSize">Проблемность ячеек</Accordion.Header>
                <Accordion.Body>
                    <p>Количество событий "Поломка" для каждой ячейки выбранного склада за выбранный период</p>
                    <Form onSubmit={handleBreakEventCell}>
                        <InputGroup.Text id="basic-addon1">Склад</InputGroup.Text>
                        <Form.Select name="warehouse">{listKeys.map((warehouseKey: string) => <option value={warehouseKey}>{warehouseKey}</option>)}</Form.Select>
                        <InputGroup.Text id="basic-addon1">Начальная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="start"
                            defaultValue="1900-01-01T00:00" />
                        <InputGroup.Text id="basic-addon1">Конечная дата</InputGroup.Text>
                        <Form.Control type="datetime-local"
                            name="end"
                            defaultValue="2050-12-12T00:00" />
                        <Button type="submit">Построить</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <div className="chartContainer"><Bar className="bar-fixSize" data={data} options={options} /></div>
    </div>
    )
}