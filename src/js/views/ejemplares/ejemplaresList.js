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

export const EjemplaresList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getEjemplares();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	// get ejemplar age
	const getAge = birthDate => {
		return Math.floor(
			(new Date() - new Date(birthDate).getTime()) / 3.15576e10
		);
	};

	const columns = [
		{
			name: "Tatuaje labial",
			selector: row => row.e_tatuaje_labial,
			sortable: true,
		},
		{
			name: "Nombre",
			selector: row => row.e_nombre,
			sortable: true,
		},
		{
			name: "Color pelaje",
			selector: row =>
				row.e_color_pelaje === "C"
					? "Castano"
					: row.e_color_pelaje === "Z"
					? "Zaino"
					: row.e_color_pelaje === "A"
					? "Alazan"
					: "Tordillo",
			sortable: true,
		},
		{
			name: "Sexo",
			selector: row => (row.e_sexo === "Y" ? "Yegua" : "Caballo"),
			sortable: true,
		},
		{
			name: "Edad",
			selector: row => getAge(row.e_fecha_nacimiento),
			sortable: true,
		},
		{
			name: "Fecha nacimiento",
			selector: row => row.e_fecha_nacimiento,
			sortable: true,
		},
		{
			name: "Fecha ingreso hipodromo",
			selector: row => row.e_fecha_ing_hipo,
			sortable: true,
		},
		{
			name: "Peso",
			selector: row => row.e_peso,
			sortable: true,
		},
		{
			name: "Madre",
			selector: row => (row.parent?.e_nombre ? row.parent?.e_nombre : ""),
			sortable: true,
		},
		{
			name: "Padre",
			selector: row => (row.parent1?.e_nombre ? row.parent1?.e_nombre : ""),
			sortable: true,
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de ejemplares en el sistema
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
