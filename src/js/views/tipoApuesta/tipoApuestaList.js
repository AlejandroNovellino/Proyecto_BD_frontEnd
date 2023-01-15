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
			name: "Multiplicador",
			selector: row => (row.ta_multiplicador ? row.ta_multiplicador : ""),
			sortable: true,
		},
		{
			name: "Precio jugada adicional",
			selector: row =>
				row.ta_precio_jugada_adicional ? row.ta_precio_jugada_adicional : "",
			sortable: true,
		},
		{
			name: "Cab. minimos necesarios en carrera",
			selector: row =>
				row.ta_cant_minima_caballos_necesaria_en_carrera
					? row.ta_cant_minima_caballos_necesaria_en_carrera
					: "",
			sortable: true,
		},
		{
			name: "Cab. maximos por carrera",
			selector: row =>
				row.ta_cant_maxima_caballos_por_carrera
					? row.ta_cant_maxima_caballos_por_carrera
					: "",
			sortable: true,
		},
		{
			name: "Cab. maximos a seleccionar",
			selector: row =>
				row.ta_cant_maxima_caballos ? row.ta_cant_maxima_caballos : "",
			sortable: true,
		},
		{
			name: "Ultimas carreras validas",
			selector: row =>
				row.ta_cant_valida_ultimas_carreras_programa
					? row.ta_cant_valida_ultimas_carreras_programa
					: "",
			sortable: true,
		},
		{
			name: "Orden de llegada",
			selector: row => (row.ta_llegada_en_orden ? "Si" : "No"),
			sortable: true,
		},
		{
			name: "Limite premiado inferior",
			selector: row =>
				row.ta_limite_premiado_inferior ? row.ta_limite_premiado_inferior : "",
			sortable: true,
		},
		{
			name: "Limite premiado superior",
			selector: row =>
				row.ta_limite_premiado_superior ? row.ta_limite_premiado_superior : "",
			sortable: true,
		},
		{
			name: "Descripcion",
			selector: row => (row.ta_descripcion ? row.ta_descripcion : ""),
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
