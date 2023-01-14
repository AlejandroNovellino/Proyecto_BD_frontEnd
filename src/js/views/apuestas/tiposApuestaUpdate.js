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
