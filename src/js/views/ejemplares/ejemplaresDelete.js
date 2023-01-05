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

export const EjemplaresDelete = () => {
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
			let data = await actions.getEjemplares();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getEjemplares();
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
			let response = await actions.deleteEjemplar(element.e_tatuaje_labial);
			if (!response) {
				console.log(response);
				console.log("Hubo un error en alguna eliminacion");

				// cover the modal
				setModalShow(false);
				// error because is in a relation
				setAlertInRelationShow(true);

				return false;
			}
			data.filter(
				element2 => element2.e_tatuaje_labial != element.e_tatuaje_labial
			);
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
