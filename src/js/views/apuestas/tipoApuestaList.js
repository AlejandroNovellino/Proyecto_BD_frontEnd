import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react dom imports

export const TiposApuestaList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTiposApuesta();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	const columns = [
		{
			name: "Clave",
			selector: row => row.ta_clave,
			omit: true,
		},
		{
			name: "Nombre",
			selector: row => row.ta_nombre,
			sortable: true,
		},
		{
			name: "Precio",
			selector: row => row.ta_precio,
			sortable: true,
		},
		{
			name: "Saldo minimo",
			selector: row => (row.ta_saldo_minimo ? row.ta_saldo_minimo : ""),
			sortable: true,
		},
		{
			name: "Precio jugada adicional",
			selector: row =>
				row.ta_precio_jugada_adicional ? row.ta_precio_jugada_adicional : "",
			sortable: true,
		},
		{
			name: "Cab. minimos por carrera",
			selector: row =>
				row.ta_cant_caballo_minimo_carrera
					? row.ta_cant_caballo_minimo_carrera
					: "",
			sortable: true,
		},
		{
			name: "Cab. minimos por apuesta",
			selector: row =>
				row.ta_num_ejemplar_minimo_necesario
					? row.ta_num_ejemplar_minimo_necesario
					: "",
			sortable: true,
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de tipos de apuesta en el sistema
						</Card.Header>
						<Card.Body>
							<DataTable
								columns={columns}
								data={data}
								pagination
								responsive
								highlightOnHover
								striped
								theme="dark"
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
