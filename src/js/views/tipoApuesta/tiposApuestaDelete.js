import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react router imports
import { useNavigate } from "react-router-dom";

export const TiposApuestaDelete = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [elementDeleted, setElementDeleted] = useState(0);

	// modal state
	const [modalShow, setModalShow] = useState(false);
	// modal functions
	const handleClose = () => setModalShow(false);
	const handleShow = () => setModalShow(true);

	// alert state
	const [alertShow, setAlertShow] = useState(false);

	// navigate hook
	let navigate = useNavigate();

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTiposApuesta();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTiposApuesta();
			setData(data);
		};

		fetchData();

		return () => {};
	}, [elementDeleted]);

	// handle select in the table
	const handleSelect = ({ selectedRows }) => {
		// action to do when an element is selected
		setSelectedRows(selectedRows);
	};

	// handle delete
	const handleDelete = async () => {
		// Delete the selected elements
		console.log("Selected Rows: ", selectedRows);
		for (let element of selectedRows) {
			let response = await actions.deleteTipoApuesta(element.ta_clave);
			if (!response) {
				console.log(
					`🚀 ~ file: entrenadoresDelete.js:59 ~ handleDelete ~ response`,
					response
				);
				console.log("Hubo un error en alguna eliminacion");
				break;
			}
			data.filter(element2 => element2.ta_clave != element.ta_clave);
		}
		setData(data);
		setElementDeleted(elementDeleted + 1);
		// cover the modal
		setModalShow(false);
		// show the alert
		setAlertShow(true);
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
			<Modal
				show={modalShow}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmacion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Seguro que quiere eliminar los registros seleccionados
				</Modal.Body>
				<Modal.Footer>
					{}
					<Button variant="secondary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="success"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Elementos eliminados!</Alert.Heading>
						<p>Los elementos seleccionados fueron eliminados correctamente</p>
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
												<Button variant="danger" onClick={handleShow}>
													Eliminar
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
