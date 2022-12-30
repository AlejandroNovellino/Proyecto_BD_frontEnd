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

export const EntrenadoresDelete = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	//const [selectedRows, setSelectedRows] = React.useState([]);
	//const [toggleCleared, setToggleCleared] = React.useState(false);
	const [entrenadores, setEntrenadores] = useState([]);
	// function to fetch entrenadores
	const fetchEntrenadores = async () => {
		let entrenadores = await actions.getEntrenadores();
		setEntrenadores(entrenadores);
	};
	// get entrenadores
	useEffect(() => {
		fetchEntrenadores();
	}, []);

	// handle delete
	const handleChange = ({ selectedRows }) => {
		// You can set state or dispatch with something like Redux so we can use the retrieved data
		console.log("Selected Rows: ", selectedRows);
	};

	const columns = [
		{
			name: "Cedula",
			selector: row => row.p_cedula,
			sortable: true,
		},
		{
			name: "Primer Nombre",
			selector: row => row.p_primer_nombre,
			sortable: true,
		},
		{
			name: "Segundo Nombre",
			selector: row => row.p_segundo_nombre,
			sortable: true,
		},
		{
			name: "Primer Apellido",
			selector: row => row.p_primer_apellido,
			sortable: true,
		},
		{
			name: "Segundo Apellido",
			selector: row => row.p_segundo_apellido,
			sortable: true,
		},
		{
			name: "Sexo",
			selector: row => row.p_sexo,
			sortable: true,
		},
		{
			name: "Lugar",
			selector: row => row.fk_lugar,
			sortable: true,
		},
		{
			name: "Direccion",
			selector: row => row.p_direccion,
			sortable: true,
		},
		{
			name: "Entrada Hipodromo",
			selector: row => row.ent_fecha_ing_hipo,
			sortable: true,
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de entrenadores en el sistema
						</Card.Header>
						<Card.Body>
							<DataTable
								columns={columns}
								data={entrenadores}
								selectableRows
								pagination
								responsive
								highlightOnHover
								striped
								onSelectedRowsChange={handleChange}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};