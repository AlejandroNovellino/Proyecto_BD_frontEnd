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

export const CarrerasList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getCarreras();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	const columns = [
		{
			name: "Clave",
			selector: row => row.c_clave,
			omit: true,
		},
		{
			name: "Nombre",
			selector: row => (row.c_nombre ? row.c_nombre : ""),
			sortable: true,
		},
		{
			name: "Fecha",
			selector: row => row.c_fecha,
			sortable: true,
		},
		{
			name: "Hora",
			selector: row => row.c_hora,
			sortable: true,
		},
		{
			name: "Num llamada",
			selector: row => row.c_num_llamado,
			sortable: true,
		},
		{
			name: "Pull dinero total",
			selector: row => (row.c_pull_dinero_total ? row.c_pull_dinero_total : ""),
			sortable: true,
		},
		{
			name: "Distancia",
			selector: row => row.c_distancia,
			sortable: true,
		},
		{
			name: "Categoria carrera",
			selector: row => row.categoria_carrera.ca_nombre,
			sortable: true,
		},
		{
			name: "Tipo carrera",
			selector: row => row.tipo_carrera.tc_nombre,
			sortable: true,
		},
		{
			name: "Sexo necesario",
			selector: row =>
				row.tipo_carrera.tc_sexo ? row.tipo_carrera.tc_sexo : "",
			sortable: true,
		},
		{
			name: "Edad min necesario",
			selector: row =>
				row.tipo_carrera.tc_edad_minima ? row.tipo_carrera.tc_edad_minima : "",
			sortable: true,
		},
		{
			name: "Edad max necesario",
			selector: row =>
				row.tipo_carrera.tc_edad_maxima ? row.tipo_carrera.tc_edad_maxima : "",
			sortable: true,
		},
		{
			name: "Victorias min necesario",
			selector: row =>
				row.tipo_carrera.tc_victoria_minima
					? row.tipo_carrera.tc_victoria_minima
					: "",
			sortable: true,
		},
		{
			name: "Victorias max necesario",
			selector: row =>
				row.tipo_carrera.tc_victoria_maxima
					? row.tipo_carrera.tc_victoria_maxima
					: "",
			sortable: true,
		},
		{
			name: "Pista",
			selector: row => row.pista.pi_longitud,
			sortable: true,
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de carreras en el sistema
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
