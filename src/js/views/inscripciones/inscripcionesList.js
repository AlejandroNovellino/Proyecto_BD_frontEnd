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

export const InscripcionesList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getInscripciones();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	// get activo
	const getCarreraActive = fecha => {
		console.log(
			`🚀 ~ file: inscripcionesList.js:39 ~ getCarreraActive ~ fecha`,
			typeof fecha
		);

		return new Date() <= new Date(fecha);
	};

	const columns = [
		{
			name: "Clave",
			selector: row => row.ins_clave,
			omit: true,
		},
		{
			name: "Carrera activa",
			selector: row => (getCarreraActive(row.carrera.c_fecha) ? "Si" : "No"),
			sortable: true,
		},
		{
			name: "Ejemplar",
			selector: row => row.binomio.ejemplar.e_nombre,
			sortable: true,
		},
		{
			name: "Sexo ejemplar",
			selector: row => row.binomio.ejemplar.e_sexo,
			sortable: true,
		},
		{
			name: "Jinete",
			selector: row =>
				`${row.binomio.jinete.p_primer_nombre} ${row.binomio.jinete.p_primer_apellido}`,
			sortable: true,
		},
		{
			name: "Num gualdrapa",
			selector: row => row.ins_num_gualdrapa,
			sortable: true,
		},
		{
			name: "Puesto partida",
			selector: row => row.ins_puesto_pista,
			sortable: true,
		},
		{
			name: "Fecha inscripcion",
			selector: row => row.ins_fecha,
			sortable: true,
		},
		{
			name: "Ejemplar favorito",
			selector: row => (row.ins_ejemplar_favorito ? "Si" : "No"),
			sortable: true,
		},
		{
			name: "Precio reclamo",
			selector: row =>
				row.ins_precio_reclamado ? row.ins_precio_reclamado : "No es reclamo",
			sortable: true,
		},
		{
			name: "Nombre carrera",
			selector: row => (row.carrera.c_nombre ? row.carrera.c_nombre : ""),
			sortable: true,
		},
		{
			name: "Fecha carrera",
			selector: row => row.carrera.c_fecha,
			sortable: true,
		},
		{
			name: "Hora",
			selector: row => row.carrera.c_hora,
			sortable: true,
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de inscripciones en el sistema
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
