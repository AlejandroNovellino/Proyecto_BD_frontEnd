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

export const TiposApuestaUpdate = () => {
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
			let data = await actions.getTiposApuesta();
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
			navigate("/tipo/apuesta/update", { state: selectedRows.at(0) });
		} else {
			setAlertShow(true);
		}
	};

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
								Lista de tipos de apuestas en el sistema
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
													onClick={() => navigate(-1)}>
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
