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

export const CreateTipoApuesta = () => {
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

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// precio
		if (!values.ta_precio) aux.ta_precio = null;
		// saldo minimo
		if (!values.ta_saldo_minimo) aux.ta_saldo_minimo = null;
		// multiplicador
		if (!values.ta_multiplicador) aux.ta_multiplicador = null;
		// precio jugada adicional
		if (!values.ta_precio_jugada_adicional)
			aux.ta_precio_jugada_adicional = null;
		// ta_cant_minima_caballos_necesaria_en_carrera
		if (!values.ta_cant_minima_caballos_necesaria_en_carrera)
			aux.ta_cant_minima_caballos_necesaria_en_carrera = null;
		// ta_cant_maxima_caballos_por_carrera
		if (!values.ta_cant_maxima_caballos_por_carrera)
			aux.ta_cant_maxima_caballos_por_carrera = null;
		// ta_cant_maxima_caballos
		if (!values.ta_cant_maxima_caballos) aux.ta_cant_maxima_caballos = null;
		// ta_cant_valida_ultimas_carreras_programa
		if (!values.ta_cant_valida_ultimas_carreras_programa)
			aux.ta_cant_valida_ultimas_carreras_programa = null;
		// ta_limite_premiado_inferior
		if (!values.ta_limite_premiado_inferior)
			aux.ta_limite_premiado_inferior = null;
		// ta_limite_premiado_superior
		if (!values.ta_limite_premiado_superior)
			aux.ta_limite_premiado_superior = null;
		// ta_limite_premiado_superior
		if (!values.ta_descripcion) aux.ta_descripcion = null;

		return aux;
	};

	// create
	const handleCreate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to create
		let response = await actions.createTipoApuesta(params);
		if (!response) {
			console.log(
				`🚀 ~ file: createEntrenador.js:55 ~ handleCreate ~ response`,
				response
			);

			console.log("Hubo un error en la creacion");
			// show the alert
			setAlertShow(true);
			return false;
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	// validator for data
	const schema = yup.object({
		ta_nombre: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		ta_precio: yup
			.number("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 8 numeros como maximo")
			.required("Es obligatorio"),
		ta_saldo_minimo: yup
			.number("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 8 numeros como maximo"),
		ta_multiplicador: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 8 numeros como maximo"),
		ta_precio_jugada_adicional: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 8 numeros como maximo"),
		ta_cant_minima_caballos_necesaria_en_carrera: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(17, "Debe ser menor a 17"),
		ta_cant_maxima_caballos_por_carrera: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(17, "Debe ser menor a 17"),
		ta_cant_maxima_caballos: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(193, "Debe ser menor a 192"),
		ta_cant_valida_ultimas_carreras_programa: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(17, "Debe ser menor a 17"),
		ta_llegada_en_orden: yup
			.boolean("Debe ser un booleano")
			.required("Es obligatorio"),
		ta_limite_premiado_inferior: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(17, "Debe ser menor a 17")
			.required("Es obligatorio"),
		ta_limite_premiado_superior: yup
			.number("Debe ser un numero")
			.integer("Debe ser un entero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(17, "Debe ser menor a 17")
			.required("Es obligatorio"),
		ta_descripcion: yup.string("Debe ser texto"),
	});

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Tipo de apuesta creado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El tipo de apuesta ha sido creado exitosamente</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={10}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Nuevo tipo apuesta
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del tipo apuesta a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										ta_nombre: "",
										ta_precio: "",
										ta_saldo_minimo: "",
										ta_multiplicador: "",
										ta_precio_jugada_adicional: "",
										ta_cant_minima_caballos_necesaria_en_carrera: "",
										ta_cant_maxima_caballos_por_carrera: "",
										ta_cant_maxima_caballos: "",
										ta_cant_valida_ultimas_carreras_programa: "",
										ta_llegada_en_orden: "",
										ta_limite_premiado_inferior: "",
										ta_limite_premiado_superior: "",
										ta_descripcion: "",
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
											{/* Nombre */}
											<Row className="mb-3">
												{/* Nombre */}
												<Form.Group as={Col} md="12" controlId="ta_nombre">
													<Form.Label>Nombre</Form.Label>
													<Form.Control
														type="text"
														name="ta_nombre"
														placeholder="6 Electronico"
														value={values.ta_nombre}
														onChange={handleChange}
														isValid={touched.ta_nombre && !errors.ta_nombre}
														isInvalid={!!errors.ta_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_nombre}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Precio, saldo minimo, multiplicador y precio jugada adicional */}
											<Row className="mb-3">
												{/* Precio */}
												<Form.Group as={Col} md="3" controlId="ta_precio">
													<Form.Label>Precio</Form.Label>
													<Form.Control
														type="text"
														name="ta_precio"
														placeholder="Ej. 100"
														value={values.ta_precio}
														onChange={handleChange}
														isValid={touched.ta_precio && !errors.ta_precio}
														isInvalid={!!errors.ta_precio}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_precio}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Saldo minimo */}
												<Form.Group as={Col} md="3" controlId="ta_saldo_minimo">
													<Form.Label>Saldo minimo</Form.Label>
													<Form.Control
														type="text"
														name="ta_saldo_minimo"
														placeholder="Ej. 100"
														value={values.ta_saldo_minimo}
														onChange={handleChange}
														isValid={
															touched.ta_saldo_minimo && !errors.ta_saldo_minimo
														}
														isInvalid={!!errors.ta_saldo_minimo}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_saldo_minimo}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Multiplicador */}
												<Form.Group
													as={Col}
													md="3"
													controlId="ta_multiplicador">
													<Form.Label>Multiplicador</Form.Label>
													<Form.Control
														type="text"
														name="ta_multiplicador"
														placeholder="Ej. 100"
														value={values.ta_multiplicador}
														onChange={handleChange}
														isValid={
															touched.ta_multiplicador &&
															!errors.ta_multiplicador
														}
														isInvalid={!!errors.ta_multiplicador}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_multiplicador}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Precio jugada adicional */}
												<Form.Group
													as={Col}
													md="3"
													controlId="ta_precio_jugada_adicional">
													<Form.Label>Precio jugada adicional</Form.Label>
													<Form.Control
														type="text"
														name="ta_precio_jugada_adicional"
														placeholder="Ej. 50"
														value={values.ta_precio_jugada_adicional}
														onChange={handleChange}
														isValid={
															touched.ta_precio_jugada_adicional &&
															!errors.ta_precio_jugada_adicional
														}
														isInvalid={!!errors.ta_precio_jugada_adicional}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_precio_jugada_adicional}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Cantidad caballo minimo en carrera,
												cantidad maxima de caballos por carrera,
												cantidad maxima de caballos,
												valida para ultimas n carreras del programa */}
											<Row className="mb-3">
												{/* Cantidad caballo minimo por carera  */}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_cant_minima_caballos_necesaria_en_carrera">
													<Form.Label>
														Cantidad caballos minimos necesarios en carrera
													</Form.Label>
													<Form.Control
														type="text"
														name="ta_cant_minima_caballos_necesaria_en_carrera"
														placeholder="Ej. 4"
														value={
															values.ta_cant_minima_caballos_necesaria_en_carrera
														}
														onChange={handleChange}
														isValid={
															touched.ta_cant_minima_caballos_necesaria_en_carrera &&
															!errors.ta_cant_minima_caballos_necesaria_en_carrera
														}
														isInvalid={
															!!errors.ta_cant_minima_caballos_necesaria_en_carrera
														}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{
															errors.ta_cant_minima_caballos_necesaria_en_carrera
														}
													</Form.Control.Feedback>
												</Form.Group>
												{/* cantidad maxima de caballos por carrera */}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_cant_maxima_caballos_por_carrera">
													<Form.Label>
														Cantidad maxima de caballos por carrera
													</Form.Label>
													<Form.Control
														type="text"
														name="ta_cant_maxima_caballos_por_carrera"
														placeholder="Ej. 4"
														value={values.ta_cant_maxima_caballos_por_carrera}
														onChange={handleChange}
														isValid={
															touched.ta_cant_maxima_caballos_por_carrera &&
															!errors.ta_cant_maxima_caballos_por_carrera
														}
														isInvalid={
															!!errors.ta_cant_maxima_caballos_por_carrera
														}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_cant_maxima_caballos_por_carrera}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Cantidad caballo minimo en carrera,
												cantidad maxima de caballos por carrera,
												cantidad maxima de caballos,
												valida para ultimas n carreras del programa */}
											<Row className="mb-3">
												{/* cantidad maxima de caballos  */}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_cant_maxima_caballos">
													<Form.Label>
														Cantidad maxima de caballos seleccionados
													</Form.Label>
													<Form.Control
														type="text"
														name="ta_cant_maxima_caballos"
														placeholder="Ej. 4"
														value={values.ta_cant_maxima_caballos}
														onChange={handleChange}
														isValid={
															touched.ta_cant_maxima_caballos &&
															!errors.ta_cant_maxima_caballos
														}
														isInvalid={!!errors.ta_cant_maxima_caballos}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_cant_maxima_caballos}
													</Form.Control.Feedback>
												</Form.Group>
												{/* valida para las ultimas n numero de carreras del programa*/}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_cant_valida_ultimas_carreras_programa">
													<Form.Label>
														Numero de ultimas carreras del programa para las que
														es valida
													</Form.Label>
													<Form.Control
														type="text"
														name="ta_cant_valida_ultimas_carreras_programa"
														placeholder="Ej. 4"
														value={
															values.ta_cant_valida_ultimas_carreras_programa
														}
														onChange={handleChange}
														isValid={
															touched.ta_cant_valida_ultimas_carreras_programa &&
															!errors.ta_cant_valida_ultimas_carreras_programa
														}
														isInvalid={
															!!errors.ta_cant_valida_ultimas_carreras_programa
														}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_cant_valida_ultimas_carreras_programa}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Llegada en orden,
												limite de premiacion inferior,
												limite de premiacion superior*/}
											<Row className="mb-3">
												{/* Llegada en orden */}
												<Form.Group
													as={Col}
													md="4"
													controlId="ta_llegada_en_orden">
													<Form.Label>
														Se toma en cuenta el orden de llegada?
													</Form.Label>
													<Form.Select
														name="ta_llegada_en_orden"
														value={values.ta_llegada_en_orden}
														onChange={handleChange}
														isValid={
															touched.ta_llegada_en_orden &&
															!errors.ta_llegada_en_orden
														}
														isInvalid={!!errors.ta_llegada_en_orden}>
														<option value="">Seleccione</option>

														<option value={true}>Si</option>
														<option value={false}>No</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_llegada_en_orden}
													</Form.Control.Feedback>
												</Form.Group>
												{/* limite de premiacion inferior */}
												<Form.Group
													as={Col}
													md="4"
													controlId="ta_limite_premiado_inferior">
													<Form.Label>Limite de premiacion inferior</Form.Label>
													<Form.Control
														type="text"
														name="ta_limite_premiado_inferior"
														placeholder="Ej. 1"
														value={values.ta_limite_premiado_inferior}
														onChange={handleChange}
														isValid={
															touched.ta_limite_premiado_inferior &&
															!errors.ta_limite_premiado_inferior
														}
														isInvalid={!!errors.ta_limite_premiado_inferior}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_limite_premiado_inferior}
													</Form.Control.Feedback>
												</Form.Group>
												{/* limite de premiacion superior */}
												<Form.Group
													as={Col}
													md="4"
													controlId="ta_limite_premiado_superior">
													<Form.Label>Limite de premiacion superior</Form.Label>
													<Form.Control
														type="text"
														name="ta_limite_premiado_superior"
														placeholder="Ej. 4"
														value={values.ta_limite_premiado_superior}
														onChange={handleChange}
														isValid={
															touched.ta_limite_premiado_superior &&
															!errors.ta_limite_premiado_superior
														}
														isInvalid={!!errors.ta_limite_premiado_superior}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_limite_premiado_superior}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Descripcion */}
											<Row className="mb-3">
												<Form.Group as={Col} md="12" controlId="ta_descripcion">
													<Form.Label>Discrepcion</Form.Label>
													<Form.Control
														as="textarea"
														name="ta_descripcion"
														placeholder="Descripcion de la apuesta"
														value={values.ta_descripcion}
														onChange={handleChange}
														isValid={
															touched.ta_descripcion && !errors.ta_descripcion
														}
														isInvalid={!!errors.ta_descripcion}
														rows={2}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_descripcion}
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
