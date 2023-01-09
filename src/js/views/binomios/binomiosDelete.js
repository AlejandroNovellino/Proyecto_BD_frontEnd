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

export const BinomiosDelete = () => {
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

	// error state
	const [errorShow, setErrorShow] = useState(false);
	// alert state
	const [errorMessage, setErrorMessage] = useState(false);

	// navigate hook
	let navigate = useNavigate();

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getBinomios();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getBinomios();
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
			let response = await actions.deleteBinomio(element.bi_clave);
			if (!response) {
				console.log(response);
				console.log("Hubo un error en alguna eliminacion");

				// cover the modal
				setModalShow(false);
				// set the error state
				setErrorShow(true);
				setErrorMessage(true);

				return false;
			}
			data.filter(element2 => element2.bi_clave != element.bi_clave);
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
			selector: row => row.bi_clave,
			omit: true,
		},
		{
			name: "Ejemplar",
			selector: row => row.ejemplar?.e_nombre,
			sortable: true,
		},
		{
			name: "Jinete",
			selector: row =>
				`${row.jinete?.p_primer_nombre} ${row.jinete?.p_primer_apellido}`,
			sortable: true,
		},
		{
			name: "Peso ejemplar",
			selector: row => row.bi_ejemplar_peso,
			sortable: true,
		},
		{
			name: "Peso jinete",
			selector: row => row.bi_jinete_peso,
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

			{errorShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setErrorShow(false)}
						dismissible>
						<Alert.Heading>No se pudo eliminar!</Alert.Heading>
						<p>
							No se pudo eliminar los elementos, el binomio esta inscrito en una
							carrera, para eliminarlo por favor primero borre las carreras en
							las que se encuentra inscrito
						</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Lista de binomios en el sistema
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
