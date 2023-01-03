import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// react router imports
import { useNavigate } from "react-router-dom";

// import context
import { Context } from "../../store/appContext";

// import date picker
import { DatePickerField } from "../datePickerField";

export const CreateHistoricoEntrenador = () => {
	// state
	const [entrenadores, setEntrenadores] = useState([]);
	const [caballerizas, setCaballerizas] = useState([]);
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// alert state
	const [alertShow, setAlertShow] = useState(false);

	const returnHome = () => {
		navigate("/home");
	};

	// get lugares when component is mounted
	useEffect(() => {
		const fetchEntrenadores = async () => {
			let data = await actions.getEntrenadores();
			setEntrenadores(data);
		};
		const fetchCaballerizas = async () => {
			let data = await actions.getCaballerizas();
			setCaballerizas(data);
		};

		fetchEntrenadores();
		fetchCaballerizas();

		return () => {};
	}, []);

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// he_fecha_fin
		if (!values.he_fecha_fin) aux.he_fecha_fin = null;

		return aux;
	};

	// create entrenador
	const handleCreate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to create
		let response = await actions.createHistoricoEntrenador(params);
		if (!response) {
			console.log(
				`🚀 ~ file: createEntrenador.js:55 ~ handleCreate ~ response`,
				response
			);

			console.log("Hubo un error en la creacion");
			// show the alert
			setAlertShow(true);
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	// validator for data
	const schema = yup.object({
		he_fecha_inicio: yup.date().required("Es obligatorio"),
		he_fecha_fin: yup
			.date()
			.min(yup.ref("he_fecha_inicio"), "Debe ser mayor a fecha inicio")
			.nullable(),
		he_activo: yup.boolean().required("Es obligatorio"),
		fk_caballeriza: yup
			.number()
			.integer()
			.positive()
			.required("Es obligatorio"),
		fk_entrenador: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
	});

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Historico de entrenador creado</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					El historico de entrenador se ha creado exitosamente
				</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p></p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={8}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Nuevo historico de entrenador
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del historico a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										he_fecha_inicio: "",
										he_fecha_fin: "",
										he_activo: false,
										fk_caballeriza: "",
										fk_entrenador: "",
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
											{/* Primer y segundo nombre */}
											<Row className="mb-3">
												{/* Fecha de inicio */}
												<Form.Group as={Col} md="4" controlId="he_fecha_inicio">
													<Form.Label>Fecha inicio caballeriza</Form.Label>
													<DatePickerField
														id="he_fecha_inicio"
														className={
															!errors.he_fecha_inicio
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="he_fecha_inicio"
														value={values.he_fecha_inicio}
														isValid={
															touched.he_fecha_inicio && !errors.he_fecha_inicio
														}
														isInvalid={!!errors.he_fecha_inicio}
													/>
													{!errors.he_fecha_inicio && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#198754",
															}}>
															Todo bien!
														</div>
													)}
													{!!errors.he_fecha_inicio && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.he_fecha_inicio}
														</div>
													)}
												</Form.Group>
												{/* Fecha de fin */}
												<Form.Group as={Col} md="4" controlId="he_fecha_fin">
													<Form.Label>Fecha final de la asignacion</Form.Label>
													<DatePickerField
														id="he_fecha_fin"
														className={
															!errors.he_fecha_fin
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="he_fecha_fin"
														value={values.he_fecha_fin}
														isValid={
															touched.he_fecha_fin && !errors.he_fecha_fin
														}
														isInvalid={!!errors.he_fecha_fin}
													/>
													{!errors.he_fecha_fin && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#198754",
															}}>
															Todo bien!
														</div>
													)}
													{!!errors.he_fecha_fin && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.he_fecha_fin}
														</div>
													)}
												</Form.Group>
												{/* Activo */}
												<Form.Group as={Col} md="4" controlId="he_activo">
													<Form.Label>Status</Form.Label>
													<Form.Select
														name="he_activo"
														value={values.he_activo}
														onChange={handleChange}
														isValid={touched.he_activo && !errors.he_activo}
														isInvalid={!!errors.he_activo}>
														<option>Seleccione</option>
														<option value={true}>Activo</option>
														<option value={false}>Inactivo</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.he_activo}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Entrenadores y Caballerizas */}
											<Row className="mb-3">
												{/* Entrenadores */}
												<Form.Group as={Col} md="6" controlId="fk_entrenador">
													<Form.Label>Entrenadores</Form.Label>
													<Form.Select
														name="fk_entrenador"
														value={values.fk_entrenador}
														onChange={handleChange}
														isValid={
															touched.fk_entrenador && !errors.fk_entrenador
														}
														isInvalid={!!errors.fk_entrenador}>
														<option>Seleccione</option>
														{entrenadores.map((element, index) => {
															return (
																<option key={index} value={element.p_cedula}>
																	{element.p_primer_nombre +
																		" " +
																		element.p_primer_apellido +
																		" (C.I. " +
																		element.p_cedula +
																		")"}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_entrenador}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md="6" controlId="fk_lugar">
													<Form.Label>Caballerizas</Form.Label>
													<Form.Select
														name="fk_caballeriza"
														value={values.fk_caballeriza}
														onChange={handleChange}
														isValid={
															touched.fk_caballeriza && !errors.fk_caballeriza
														}
														isInvalid={!!errors.fk_caballeriza}>
														<option>Seleccione</option>
														{caballerizas.map((element, index) => {
															return (
																<option key={index} value={element.ca_clave}>
																	{element.ca_numero}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_caballeriza}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Buttons */}
											<Row className="px-3">
												<Col xs={6} className="ps-0">
													<div className="d-grid gap-2" type="submit">
														<Button variant="danger" onClick={returnHome}>
															Cancelar
														</Button>
													</div>
												</Col>
												<Col xs={6} className="pe-0">
													<div className="d-grid gap-2" type="submit">
														<Button type="submit" variant="primary">
															Crear
														</Button>
													</div>
												</Col>
											</Row>
										</Form>
									)}
								</Formik>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
