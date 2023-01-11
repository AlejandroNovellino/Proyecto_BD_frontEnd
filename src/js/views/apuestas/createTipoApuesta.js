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
		// saldo minimo
		if (!values.ta_saldo_minimo) aux.ta_saldo_minimo = null;
		// precio jugada adicional
		if (!values.ta_precio_jugada_adicional)
			aux.ta_precio_jugada_adicional = null;
		// cantidad de caballos minimos por carrera
		if (!values.ta_cant_caballo_minimo_carrera)
			aux.ta_cant_caballo_minimo_carrera = null;
		// numeros de ejemplaree necesarios
		if (!values.ta_num_ejemplar_minimo_necesario)
			aux.ta_num_ejemplar_minimo_necesario = null;

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
			.lessThan(9999, "Debe poseer 5 numeros como maximo")
			.required("Es obligatorio"),
		ta_saldo_minimo: yup
			.number("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(9999, "Debe poseer 5 numeros como maximo"),
		ta_precio_jugada_adicional: yup
			.number("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 10 numeros como maximo"),
		ta_cant_caballo_minimo_carrera: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(145, "Debe poseer 145 numeros como maximo")
			.required("Es obligatorio"),
		ta_num_ejemplar_minimo_necesario: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(145, "Debe poseer 145 numeros como maximo"),
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
					<Col xs={8}>
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
										ta_precio_jugada_adicional: "",
										ta_cant_caballo_minimo_carrera: "",
										ta_num_ejemplar_minimo_necesario: "",
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
													<Form.Label>Primer Nombre</Form.Label>
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
											{/* Precio, saldo minimo y precio jugada adicional */}
											<Row className="mb-3">
												{/* Precio */}
												<Form.Group as={Col} md="4" controlId="ta_precio">
													<Form.Label>Precio</Form.Label>
													<Form.Control
														type="text"
														name="ta_precio"
														placeholder="6 Electronico"
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
												<Form.Group as={Col} md="4" controlId="ta_saldo_minimo">
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
												{/* Precio jugada adicional */}
												<Form.Group
													as={Col}
													md="4"
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
											{/* Cantidad caballo minimo por carera y numero de ejemplares minimos */}
											<Row className="mb-3">
												{/* Cantidad caballo minimo por carera  */}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_cant_caballo_minimo_carrera">
													<Form.Label>
														Cantidad caballo minimo por carera
													</Form.Label>
													<Form.Control
														type="text"
														name="ta_cant_caballo_minimo_carrera"
														placeholder="Ej. 4"
														value={values.ta_cant_caballo_minimo_carrera}
														onChange={handleChange}
														isValid={
															touched.ta_cant_caballo_minimo_carrera &&
															!errors.ta_cant_caballo_minimo_carrera
														}
														isInvalid={!!errors.ta_precio}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_cant_caballo_minimo_carrera}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Numero de ejemplares minimos */}
												<Form.Group
													as={Col}
													md="6"
													controlId="ta_num_ejemplar_minimo_necesario">
													<Form.Label>Numero de ejemplares minimos</Form.Label>
													<Form.Control
														type="text"
														name="ta_num_ejemplar_minimo_necesario"
														placeholder="Ej. 4"
														value={values.ta_num_ejemplar_minimo_necesario}
														onChange={handleChange}
														isValid={
															touched.ta_num_ejemplar_minimo_necesario &&
															!errors.ta_num_ejemplar_minimo_necesario
														}
														isInvalid={
															!!errors.ta_num_ejemplar_minimo_necesario
														}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.ta_num_ejemplar_minimo_necesario}
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
