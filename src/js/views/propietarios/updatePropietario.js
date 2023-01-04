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

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// react router imports
import { useNavigate, useLocation } from "react-router-dom";

// import context
import { Context } from "../../store/appContext";

// import date picker
import { DatePickerField } from "../datePickerField";

export const UpdatePropietario = props => {
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

		return aux;
	};

	// create entrenador
	const handleUpdate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to update
		let response = await actions.updatePropietario(params);
		if (!response) {
			console.log(response);

			console.log("Hubo un error en la actualizacion");
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/propietarios/update");
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
		pr_correo: yup
			.string()
			.email()
			.max(40, "Longitud max 40 caracteres")
			.required("Es obligatorio"),
		pr_fecha_nacimiento: yup.date().max(new Date()).required("Es obligatorio"),
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
					<Modal.Title>Propietario actualizado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El propietario se ha actualizado exitosamente</Modal.Body>
			</Modal>
			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={8}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Propietario a actualizar
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del propietario a actualizar:
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
										pr_correo: element.pr_correo,
										pr_fecha_nacimiento: element.pr_fecha_nacimiento,
										fk_lugar: element.fk_lugar,
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
											{/* Correo */}
											<Row className="mb-3">
												<Form.Group as={Col} md="12" controlId="pr_correo">
													<Form.Label>Correo</Form.Label>
													<Form.Control
														type="text"
														name="pr_correo"
														placeholder="example@gmail.com"
														value={values.pr_correo}
														onChange={handleChange}
														isValid={touched.pr_correo && !errors.pr_correo}
														isInvalid={!!errors.pr_correo}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.pr_correo}
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
											{/* Lugar y entrada al hipodromo */}
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
														{lugares.map((element, index) => {
															return (
																<option key={index} value={element.l_clave}>
																	{element.l_nombre}
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
												<Form.Group
													as={Col}
													md="6"
													controlId="pr_fecha_nacimiento">
													<Form.Label>Fecha nacimiento</Form.Label>
													<DatePickerField
														id="pr_fecha_nacimiento"
														className={
															!errors.pr_fecha_nacimiento
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="pr_fecha_nacimiento"
														value={values.pr_fecha_nacimiento}
														isValid={
															touched.pr_fecha_nacimiento &&
															!errors.pr_fecha_nacimiento
														}
														isInvalid={!!errors.pr_fecha_nacimiento}
													/>
													{!errors.pr_fecha_nacimiento && (
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
													{!!errors.pr_fecha_nacimiento && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.pr_fecha_nacimiento}
														</div>
													)}
												</Form.Group>
											</Row>
											{/* Direccion */}
											<Row className="mb-3">
												<Form.Group as={Col} md="12" controlId="p_direccion">
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
											{/* Buttons */}
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
