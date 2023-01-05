import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react router imports
import { useNavigate } from "react-router-dom";

export const EjemplaresUpdate = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	// alert state
	const [alertShow, setAlertShow] = useState(false);

	// navigate hook
	let navigate = useNavigate();

	// function to fetch entrenadores

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getEjemplares();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	/*useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getEntrenadores();
			setData(data);
		};

		fetchData();

		return () => {};
	}, [elementUpdated]);*/

	// handle select in the table
	const handleSelect = ({ selectedRows }) => {
		// action to do when an element is selected
		setSelectedRows(selectedRows);
	};

	// handle update
	const handleUpdate = () => {
		if (selectedRows.length) {
			// navigate to UpdateEntrenador
			navigate("/ejemplar/update", { state: selectedRows.at(0) });
		} else {
			setAlertShow(true);
		}
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
		<>
			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>No se selecciono un elemento!</Alert.Heading>
						<p>Debe seleccionar un elemento para ser actualizado</p>
					</Alert>
				</Container>
			)}

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
									selectableRows
									pagination
									responsive
									highlightOnHover
									striped
									selectableRowsNoSelectAll
									selectableRowsSingle
									onSelectedRowsChange={handleSelect}
									theme="dark"
								/>
							</Card.Body>
							<Card.Footer>
								<Container className="p-0">
									<Row>
										<Col xs={6} className="ps-0">
											<div className="d-grid gap-2" type="submit">
												<Button
													variant="secondary"
													onClick={() => navigate("/home")}>
													Cancelar
												</Button>
											</div>
										</Col>
										<Col xs={6} className="pe-0">
											<div className="d-grid gap-2" type="submit">
												<Button variant="warning" onClick={handleUpdate}>
													Actualizar
												</Button>
											</div>
										</Col>
									</Row>
								</Container>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
