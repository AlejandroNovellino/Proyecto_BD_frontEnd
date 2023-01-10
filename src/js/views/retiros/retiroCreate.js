import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react dom imports
import { useNavigate } from "react-router-dom";

export const RetiroCreate = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [activesInscripciones, setActivesInscripciones] = useState([]);
	const [selectedInscripcion, setSelectedInscripcion] = useState({});
	const [causasRetiros, setCausasRetiros] = useState([]);
	// alert state
	const [alertShow, setAlertShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// navigate hook
	let navigate = useNavigate();

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			//inscripciones
			let data = await actions.getInscripcionesActivas();
			setActivesInscripciones(data);

			//causas
			data = await actions.getCausasRetiro();
			setCausasRetiros(data);
		};

		fetchData();

		return () => {};
	}, []);

	// handle select in the table
	const handleSelect = ({ selectedRows }) => {
		// action to do when an element is selected
		console.log(selectedRows[0]);
		setSelectedInscripcion(selectedRows[0]);
	};

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};

		return aux;
	};

	// create entrenador
	const handleCreate = async values => {
		if (Object.keys(selectedInscripcion).length === 0) {
			// show the alert
			setErrorMessage("Se debe elegir una inscripcion");
			setAlertShow(true);

			return false;
		}
		// set the nullable elements
		let params = setNullables(values);

		//set the fk
		params.fk_inscripcion = selectedInscripcion.ins_clave;
		params.r_fecha_retiro = new Date();

		// try to create
		let response = await actions.createRetiro(params);
		if (!response) {
			console.log(response);

			console.log("Hubo un error en la creacion");

			// show the alert
			setErrorMessage("Error en la creacion del retiro");
			setAlertShow(true);
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	const columns = [
		{
			name: "Clave",
			selector: row => row.ins_clave,
			omit: true,
		},
		{
			name: "Ejemplar",
			selector: row => row.binomio.ejemplar.e_nombre,
			sortable: true,
		},
		{
			name: "Sexo ejemplar",
			selector: row =>
				row.binomio.ejemplar.e_sexo === "Y" ? "Yegua" : "Caballo",
			sortable: true,
		},
		{
			name: "Jinete",
			selector: row =>
				`${row.binomio.jinete.p_primer_nombre} ${row.binomio.jinete.p_primer_apellido}`,
			sortable: true,
		},
		{
			name: "Num gualdrapa",
			selector: row => row.ins_num_gualdrapa,
			sortable: true,
		},
		{
			name: "Puesto partida",
			selector: row => row.ins_puesto_pista,
			sortable: true,
		},
		{
			name: "Fecha inscripcion",
			selector: row => row.ins_fecha,
			sortable: true,
		},
		{
			name: "Ejemplar favorito",
			selector: row => (row.ins_ejemplar_favorito ? "Si" : "No"),
			sortable: true,
		},
		{
			name: "Precio reclamo",
			selector: row =>
				row.ins_precio_reclamado ? row.ins_precio_reclamado : "No es reclamo",
			sortable: true,
		},
		{
			name: "Nombre carrera",
			selector: row => (row.carrera.c_nombre ? row.carrera.c_nombre : ""),
			sortable: true,
		},
		{
			name: "Fecha carrera",
			selector: row => row.carrera.c_fecha,
			sortable: true,
		},
		{
			name: "Hora",
			selector: row => row.carrera.c_hora,
			sortable: true,
		},
	];

	// validator for data
	const schema = yup.object({
		fk_causaretiro: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
		r_descripcion: yup
			.string()
			.max(50, "Longitud max 50 caracteres")
			.required("Es obligatorio"),
	});

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Info!</Alert.Heading>
					<p>
						Se muestran todas las inscripciones activas, es decir aquellas cuya
						carrera no ha ocurrido.
					</p>
				</Alert>
			</Container>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>{errorMessage}</p>
					</Alert>
				</Container>
			)}

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Retiro registrado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha registrado el retiro exitosamente</Modal.Body>
			</Modal>

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Registro de un retiro
							</Card.Header>

							<Card.Body className="">
								<Container fluid>
									<Card.Title className="mb-3">
										Lista de inscripciones activas en el sistema
									</Card.Title>
									<DataTable
										columns={columns}
										data={activesInscripciones}
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
								</Container>

								<Container className="mt-4" fluid>
									<Formik
										validationSchema={schema}
										onSubmit={values => {
											handleCreate(values);
										}}
										initialValues={{
											ins_ejemplar_favorito: "",
											ins_precio_reclamado: "",
										}}>
										{({
											handleSubmit,
											handleChange,
											handleBlur,
											values,
											touched,
											isValid,
											errors,
										}) => (
											<Form noValidate onSubmit={handleSubmit}>
												{/* Causa */}
												<Row className="mb-3">
													{/* Causa */}
													<Form.Group
														as={Col}
														md="12"
														controlId="fk_causaretiro">
														<Form.Label>Causas de retiro</Form.Label>
														<Form.Select
															name="fk_causaretiro"
															value={values.fk_causaretiro}
															onChange={handleChange}
															isValid={
																touched.fk_causaretiro && !errors.fk_causaretiro
															}
															isInvalid={!!errors.fk_causaretiro}>
															<option value="">Seleccione</option>
															{causasRetiros.map((element, index) => {
																return (
																	<option key={index} value={element.cr_clave}>
																		{`${element.cr_nombre}`}
																	</option>
																);
															})}
														</Form.Select>
														<Form.Control.Feedback>
															Todo bien!
														</Form.Control.Feedback>
														<Form.Control.Feedback type="invalid">
															{errors.fk_causaretiro}
														</Form.Control.Feedback>
													</Form.Group>
												</Row>

												{/* Descripcion */}
												<Row className="mb-3">
													<Form.Group
														as={Col}
														md="12"
														controlId="r_descripcion">
														<Form.Label>Descripcion adicional</Form.Label>
														<Form.Control
															as="textarea"
															name="r_descripcion"
															placeholder="Descripcion adicional del motivo del retiro"
															value={values.r_descripcion}
															onChange={handleChange}
															isValid={
																touched.r_descripcion && !errors.r_descripcion
															}
															isInvalid={!!errors.r_descripcion}
															rows={3}
														/>
														<Form.Control.Feedback>
															Todo bien!
														</Form.Control.Feedback>
														<Form.Control.Feedback type="invalid">
															{errors.r_descripcion}
														</Form.Control.Feedback>
													</Form.Group>
												</Row>

												{/* Buttons */}
												<Row className="px-3">
													<Col xs={6} className="ps-0">
														<div className="d-grid gap-2" type="submit">
															<Button
																variant="danger"
																onClick={() => navigate(-1)}>
																Cancelar
															</Button>
														</div>
													</Col>
													<Col xs={6} className="pe-0">
														<div className="d-grid gap-2" type="submit">
															<Button type="submit" variant="primary">
																Retirar
															</Button>
														</div>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
