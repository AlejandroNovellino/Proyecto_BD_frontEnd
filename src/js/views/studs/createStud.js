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

export const CreateStud = () => {
	// state
	const [colores, setColores] = useState([]);
	const [selectedColors, setSelectedColors] = useState([]);
	const [propietarios, setPropietarios] = useState([]);
	const [selectedPropietarios, setSelectedPropietarios] = useState([]);
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
		const fetchPropietarios = async () => {
			let data = await actions.getPropietarios();

			let selectedStart = [];
			for (let propietario of data) {
				selectedStart.push({
					p_cedula: propietario.p_cedula,
					selected: false,
					ps_porcentaje: 0,
				});
			}

			setPropietarios(data);
			setSelectedPropietarios(selectedStart);
		};
		const fetchColores = async () => {
			let data = await actions.getColores();

			let aux = [];
			for (let color of data) {
				aux.push({
					col_clave: color.col_clave,
					sc_chaquetilla: false,
					sc_gorra: false,
				});
			}

			setColores(data);
			setSelectedColors(aux);
		};

		fetchPropietarios();
		fetchColores();

		return () => {};
	}, []);

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};

		return aux;
	};

	// create entrenador
	const handleCreate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		let propietarios = selectedPropietarios.filter(element => element.selected);
		let colors = selectedColors.filter(
			element => element.sc_chaquetilla || element.sc_gorra
		);
		// try to create
		let response = await actions.createStud(params);
		console.log(
			`🚀 ~ file: createStud.js:106 ~ handleCreate ~ response`,
			response
		);

		if (!response) {
			console.log(response);

			console.log("Hubo un error en la creacion");
			// show the alert
			setAlertShow(true);
		} else {
			// create the other relations
			for (let propietario of propietarios) {
				let propietariosResponse = await actions.createStudPropietario({
					ps_porcentaje: propietario.ps_porcentaje,
					fk_stud: response.s_clave,
					fk_propietario: propietario.p_cedula,
				});

				if (!propietariosResponse) {
					console.log(propietariosResponse);

					console.log(
						"Hubo un error en la creacion de la relacion con propietarios"
					);
					// show the alert
					setAlertShow(true);
					return false;
				}
			}
			for (let color of colors) {
				let colorsResponse = await actions.createStudColor({
					sc_chaquetilla: color.sc_chaquetilla,
					sc_gorra: color.sc_gorra,
					fk_color: color.col_clave,
					fk_stud: response.s_clave,
				});

				if (!colorsResponse) {
					console.log(colorsResponse);

					console.log(
						"Hubo un error en la creacion de la relacion con colores"
					);
					// show the alert
					setAlertShow(true);
					return false;
				}
			}

			// finish
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	// handle porcentaje pertenencia
	const handleSelected = (e, index) => {
		let aux = selectedPropietarios;

		aux.at(index).selected = !aux.at(index).selected;

		setSelectedPropietarios(aux);
	};

	// handle porcentaje pertenencia
	const handlePorcentaje = (e, index) => {
		let aux = selectedPropietarios;

		if (aux.at(index).selected) {
			aux.at(index).ps_porcentaje = e.target.value;
		}

		setSelectedPropietarios(aux);
	};

	// handle chaquetilla
	const handleChaquetilla = index => {
		let aux = selectedColors;

		aux.at(index).sc_chaquetilla = !aux.at(index).sc_chaquetilla;

		setSelectedColors(aux);
	};

	// handle gorro
	const handleGorro = index => {
		let aux = selectedColors;

		aux.at(index).sc_gorra = !aux.at(index).sc_gorra;

		setSelectedColors(aux);
	};

	// validator for data
	const schema = yup.object({
		s_nombre: yup
			.string()
			.max(45, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		s_fecha_creacion: yup.date().max(new Date()).required("Es obligatorio"),
	});

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Stud creado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El stud se ha creado exitosamente</Modal.Body>
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
							<Card.Header className="fs-5 fw-bold">Nuevo stud</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del stud a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										s_nombre: "",
										s_fecha_creacion: "",
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
											{/* Nombre y Fecha creacion */}
											<Row className="mb-3">
												{/* Nombre */}
												<Form.Group as={Col} md="6" controlId="s_nombre">
													<Form.Label>Nombre</Form.Label>
													<Form.Control
														type="text"
														name="s_nombre"
														placeholder="The stud"
														value={values.s_nombre}
														onChange={handleChange}
														isValid={touched.s_nombre && !errors.s_nombre}
														isInvalid={!!errors.s_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.s_nombre}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Fecha creacion */}
												<Form.Group
													as={Col}
													md="6"
													controlId="s_fecha_creacion">
													<Form.Label>Fecha entrada hipodromo</Form.Label>
													<DatePickerField
														id="s_fecha_creacion"
														className={
															!errors.ent_fecha_ing_hipo
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="s_fecha_creacion"
														value={values.s_fecha_creacion}
														isValid={
															touched.s_fecha_creacion &&
															!errors.s_fecha_creacion
														}
														isInvalid={!!errors.s_fecha_creacion}
													/>
													{!errors.s_fecha_creacion && (
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
													{!!errors.s_fecha_creacion && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.s_fecha_creacion}
														</div>
													)}
												</Form.Group>
											</Row>
											{/* Propietarios */}
											<Row className="justify-content-md-center mb-2">
												<Col xs={12}>
													<p className="text-start fs-5 mt-2">
														Elija los propietarios y su porcentaje de posesion:
													</p>
												</Col>
											</Row>
											{propietarios.map((propietario, index) => {
												return (
													<Row
														key={index}
														className="justify-content-md-center mb-2">
														<Col xs={6}>
															<Form.Check
																type="switch"
																id={index}
																label={
																	propietario.p_primer_nombre +
																	" " +
																	propietario.p_primer_apellido +
																	" CI. " +
																	propietario.p_cedula
																}
																onChange={e => handleSelected(e, index)}
															/>
														</Col>
														<Col xs={4}>
															<Form.Control
																placeholder="Porcentaje de pertenencia"
																onChange={e => handlePorcentaje(e, index)}
															/>
														</Col>
													</Row>
												);
											})}
											{/* Colores */}
											<Row className="justify-content-md-center mb-2">
												<Col xs={12}>
													<p className="text-start fs-5 mt-2">
														Elija los colores:
													</p>
												</Col>
											</Row>
											{colores.map((color, index) => {
												return (
													<Row
														key={index}
														className="justify-content-md-center mb-2">
														<Col xs={4}>
															<p>{color.col_nombre}</p>
														</Col>
														<Col xs={4}>
															<Form.Check
																type="switch"
																label="Chaquetilla"
																onChange={e => handleChaquetilla(index)}
															/>
														</Col>
														<Col xs={4}>
															<Form.Check
																type="switch"
																label="Gorro"
																onChange={e => handleGorro(index)}
															/>
														</Col>
													</Row>
												);
											})}
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
