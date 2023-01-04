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
import { useNavigate, useLocation } from "react-router-dom";

// import context
import { Context } from "../../store/appContext";

// import date picker
import { DatePickerField } from "../datePickerField";

export const UpdateJinete = () => {
	// state
	const [lugares, setLugares] = useState([]);
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();
	// location
	let location = useLocation();
	let element = location.state;
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// alert state
	const [alertShow, setAlertShow] = useState(false);

	const goBack = () => {
		navigate(-1);
	};

	// get lugares when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getLugaresByType();
			setLugares(data.parroquias);
		};

		fetchData();

		return () => {};
	}, []);

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// segundo nombre
		if (!values.p_segundo_nombre) aux.p_segundo_nombre = null;
		// segundo apellido
		if (!values.p_segundo_apellido) aux.p_segundo_apellido = null;
		// rango
		if (!values.j_rango) aux.j_rango = null;

		return aux;
	};

	// update element
	const handleUpdate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to create
		let response = await actions.updateJinete(params);
		if (!response) {
			console.log(
				`🚀 ~ file: updateJinete.js:81 ~ handleUpdate ~ response`,
				response
			);

			console.log("Hubo un error en la actualizacion");
			// show the alert
			setAlertShow(true);
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/jinetes/update");
			handleShow(false);
		}
	};

	// validator for data
	const schema = yup.object({
		p_cedula: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		p_primer_nombre: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		p_segundo_nombre: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.nullable(),
		p_primer_apellido: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		p_segundo_apellido: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.nullable(),
		p_sexo: yup
			.string()
			.oneOf(["M", "F"], "Sexo invalido")
			.required("Es obligatorio"),
		p_direccion: yup
			.string()
			.max(50, "Longitud max 50 caracteres")
			.required("Es obligatorio"),
		j_altura: yup
			.number()
			.positive("Solo puede ser positiva")
			.lessThan(9.99, "Debe ser menor a 9.99 m")
			.moreThan(0, "No puede ser 0")
			.required("Es obligatorio"),
		j_peso_al_ingresar: yup
			.number()
			.integer()
			.positive("Solo puede ser positiva")
			.lessThan(100, "Debe ser menor a 9.99 m")
			.moreThan(0, "No puede ser 0")
			.required("Es obligatorio"),
		j_peso_actual: yup
			.number()
			.integer()
			.positive("Solo puede ser positiva")
			.lessThan(100, "Debe ser menor a 9.99 m")
			.moreThan(0, "No puede ser 0")
			.required("Es obligatorio"),
		j_rango: yup
			.string()
			.oneOf(["APRENDIZ", "PROFESIONAL", ""], "Rango invalido")
			.nullable(),
		j_fecha_nacimiento: yup
			.date()
			.max(new Date(), "Debe ser antes del dia de hoy")
			.required("Es obligatorio"),
		fk_lugar: yup.number().integer().positive().required("Es obligatorio"),
	});

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Jinete actualizado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El jinete se ha actualizado exitosamente</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>La cedula debe ser unica</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={8}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Jinete a actualizar
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del jinete a actualizar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleUpdate(values);
									}}
									initialValues={{
										p_cedula: element.p_cedula,
										p_primer_nombre: element.p_primer_nombre,
										p_segundo_nombre: element.p_segundo_nombre
											? element.p_segundo_nombre
											: "",
										p_primer_apellido: element.p_primer_apellido,
										p_segundo_apellido: element.p_segundo_apellido
											? element.p_segundo_apellido
											: "",
										p_sexo: element.p_sexo,
										p_direccion: element.p_direccion,
										ent_fecha_ing_hipo: element.ent_fecha_ing_hipo,
										fk_lugar: element.fk_lugar,
										j_altura: element.j_altura,
										j_peso_al_ingresar: element.j_peso_al_ingresar,
										j_peso_actual: element.j_peso_actual,
										j_rango: element.j_rango ? element.j_rango : "",
										j_fecha_nacimiento: element.j_fecha_nacimiento,
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
												<Form.Group as={Col} md="6" controlId="p_primer_nombre">
													<Form.Label>Primer Nombre</Form.Label>
													<Form.Control
														type="text"
														name="p_primer_nombre"
														placeholder="Jhon"
														value={values.p_primer_nombre}
														onChange={handleChange}
														isValid={
															touched.p_primer_nombre && !errors.p_primer_nombre
														}
														isInvalid={!!errors.p_primer_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_primer_nombre}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group
													as={Col}
													md="6"
													controlId="p_segundo_nombre">
													<Form.Label>Segundo nombre</Form.Label>
													<Form.Control
														type="text"
														name="p_segundo_nombre"
														placeholder="Smith"
														value={values.p_segundo_nombre}
														onChange={handleChange}
														isValid={
															touched.p_segundo_nombre &&
															!errors.p_segundo_nombre
														}
														isInvalid={!!errors.p_segundo_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_segundo_nombre}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Primer y segundo apellido */}
											<Row className="mb-3">
												<Form.Group
													as={Col}
													md="6"
													controlId="p_primer_apellido">
													<Form.Label>Primer Apellido</Form.Label>
													<Form.Control
														type="text"
														name="p_primer_apellido"
														placeholder="Walker"
														value={values.p_primer_apellido}
														onChange={handleChange}
														isValid={
															touched.p_primer_apellido &&
															!errors.p_primer_apellido
														}
														isInvalid={!!errors.p_primer_apellido}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_primer_apellido}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group
													as={Col}
													md="6"
													controlId="p_segundo_apellido">
													<Form.Label>Segundo Apellido</Form.Label>
													<Form.Control
														type="text"
														name="p_segundo_apellido"
														placeholder="Wickings"
														value={values.p_segundo_apellido}
														onChange={handleChange}
														isValid={
															touched.p_segundo_apellido &&
															!errors.p_segundo_apellido
														}
														isInvalid={!!errors.p_segundo_apellido}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_segundo_apellido}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Cedula y genero */}
											<Row className="mb-3">
												<Form.Group as={Col} md="6" controlId="p_cedula">
													<Form.Label>Cedula Identidad</Form.Label>
													<Form.Control
														type="text"
														name="p_cedula"
														placeholder="Ej. 8908709"
														value={values.p_cedula}
														onChange={handleChange}
														isValid={touched.p_cedula && !errors.p_cedula}
														isInvalid={!!errors.p_cedula}
														disabled
														style={{
															backgroundColor: "#7a7a7a",
															borderColor: "#565656",
														}}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_cedula}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md="6" controlId="p_sexo">
													<Form.Label>Genero</Form.Label>
													<Form.Select
														name="p_sexo"
														value={values.p_sexo}
														onChange={handleChange}
														isValid={touched.p_sexo && !errors.p_sexo}
														isInvalid={!!errors.p_sexo}>
														<option>Seleccione</option>
														<option value="F">Femenino</option>
														<option value="M">Masculino</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_sexo}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Lugar y direccion */}
											<Row className="mb-3">
												<Form.Group as={Col} md="6" controlId="fk_lugar">
													<Form.Label>Lugar</Form.Label>
													<Form.Select
														name="fk_lugar"
														value={values.fk_lugar}
														onChange={handleChange}
														isValid={touched.fk_lugar && !errors.fk_lugar}
														isInvalid={!!errors.fk_lugar}>
														<option>Seleccione</option>
														{lugares.map((lugar, index) => {
															return (
																<option key={index} value={lugar.l_clave}>
																	{lugar.l_nombre}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_lugar}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md="6" controlId="p_direccion">
													<Form.Label>Direccion</Form.Label>
													<Form.Control
														as="textarea"
														name="p_direccion"
														placeholder="Direccion exacta"
														value={values.p_direccion}
														onChange={handleChange}
														isValid={touched.p_direccion && !errors.p_direccion}
														isInvalid={!!errors.p_direccion}
														rows={2}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.p_direccion}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Altura y peso al ingresar */}
											<Row className="mb-3">
												<Form.Group as={Col} md="6" controlId="j_altura">
													<Form.Label>Altura (m)</Form.Label>
													<Form.Control
														type="text"
														name="j_altura"
														placeholder="Ej. 1.6"
														value={values.j_altura}
														onChange={handleChange}
														isValid={touched.j_altura && !errors.j_altura}
														isInvalid={!!errors.j_altura}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.j_altura}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group
													as={Col}
													md="6"
													controlId="j_peso_al_ingresar">
													<Form.Label>Peso al ingresar (Kg)</Form.Label>
													<Form.Control
														type="text"
														name="j_peso_al_ingresar"
														placeholder="Ej. 50"
														value={values.j_peso_al_ingresar}
														onChange={handleChange}
														isValid={
															touched.j_peso_al_ingresar &&
															!errors.j_peso_al_ingresar
														}
														isInvalid={!!errors.j_peso_al_ingresar}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.j_peso_al_ingresar}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Peso actual y rango */}
											<Row className="mb-3">
												<Form.Group as={Col} md="6" controlId="j_peso_actual">
													<Form.Label>Peso actual (Kg)</Form.Label>
													<Form.Control
														type="text"
														name="j_peso_actual"
														placeholder="Ej. 52"
														value={values.j_peso_actual}
														onChange={handleChange}
														isValid={
															touched.j_peso_actual && !errors.j_peso_actual
														}
														isInvalid={!!errors.j_peso_actual}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.j_peso_actual}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md="6" controlId="j_rango">
													<Form.Label>Rango</Form.Label>
													<Form.Select
														name="j_rango"
														value={values.j_rango}
														onChange={handleChange}
														isValid={touched.j_rango && !errors.j_rango}
														isInvalid={!!errors.j_rango}>
														<option value="">Seleccione</option>
														<option value="APRENDIZ">Aprendiz</option>
														<option value="PROFESIONAL">Profesional</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.j_rango}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Fecha nacimiento */}
											<Row className="mb-3">
												<Form.Group
													as={Col}
													md="6"
													controlId="j_fecha_nacimiento">
													<Form.Label>Fecha nacimiento</Form.Label>
													<DatePickerField
														id="j_fecha_nacimiento"
														className={
															!errors.j_fecha_nacimiento
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="j_fecha_nacimiento"
														value={values.j_fecha_nacimiento}
														isValid={
															touched.j_fecha_nacimiento &&
															!errors.j_fecha_nacimiento
														}
														isInvalid={!!errors.j_fecha_nacimiento}
													/>
													{!errors.j_fecha_nacimiento && (
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
													{!!errors.j_fecha_nacimiento && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.j_fecha_nacimiento}
														</div>
													)}
												</Form.Group>
											</Row>
											<Row className="px-3">
												<Col xs={6} className="ps-0">
													<div className="d-grid gap-2" type="submit">
														<Button variant="danger" onClick={goBack}>
															Cancelar
														</Button>
													</div>
												</Col>
												<Col xs={6} className="pe-0">
													<div className="d-grid gap-2" type="submit">
														<Button type="submit" variant="primary">
															Actualizar
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
