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

export const CarrerasDelete = () => {
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
	// alert state
	const [alertInRelationShow, setAlertInRelationShow] = useState(false);

	// navigate hook
	let navigate = useNavigate();

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getCarreras();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getCarreras();
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
			let response = await actions.deleteCarrera(element.c_clave);
			if (!response) {
				console.log(response);
				console.log("Hubo un error en alguna eliminacion");

				// cover the modal
				setModalShow(false);
				// error because is in a relation
				setAlertInRelationShow(true);

				return false;
			}
			data.filter(element2 => element2.c_clave != element.c_clave);
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
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Importante!</Alert.Heading>
					<p>
						Al eliminar una carrera eliminara todas las incripciones que se
						hayan hecho a la misma. Asi como tambien las asignaciones de carrera
						porcentaje dividendo.
					</p>
				</Alert>
			</Container>

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

			{alertInRelationShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertInRelationShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>
							El ejemplar todavia posee registros historicos de los puestos,
							todavia forma parte de un binomio o dentro de la pertenencia de un
							propietario/stud.
						</p>
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
