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

export const CreateUsuario = () => {
	// state
	const [tiposUsuario, setTiposUsuario] = useState([]);
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
		navigate(-1);
	};

	// get data when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTiposUsuarios();
			setTiposUsuario(data);
		};

		fetchData();

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
		// set params
		params.u_fecha_registro = new Date();
		params.fk_entrenador = null;
		params.fk_propietario = null;
		params.fk_jinete = null;
		params.fk_veterinario = null;
		params.fk_aficionado = null;
		// try to create
		let response = await actions.createUsuario(params);
		if (!response) {
			console.log(response);

			console.log("Hubo un error en la creacion");
			// show the alert
			setAlertShow(true);
			return false;
		}
		// success
		handleShow(true);
		await new Promise(r => setTimeout(r, 2000));
		navigate("/home");
		handleShow(false);
	};

	// validator for data
	const schema = yup.object({
		u_correo_e: yup
			.string()
			.email()
			.max(45, "Longitud max 45 caracteres")
			.required("Es obligatorio"),
		u_password: yup
			.string()
			.max(16, "Longitud max 16 caracteres")
			.required("Es obligatorio"),
		fk_tipo_usuario: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
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
					<Modal.Title>Usuario creado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El usuario se ha creado exitosamente</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>El correo no es unico</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={9}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">Nuevo usuario</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del usuario a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										u_correo_e: "",
										u_password: "",
										fk_tipo_usuario: "",
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
											{/* Correo */}
											<Row className="mb-3">
												{/* Correo */}
												<Form.Group as={Col} md="12" controlId="u_correo_e">
													<Form.Label>Correo</Form.Label>
													<Form.Control
														type="text"
														name="u_correo_e"
														placeholder="Ej. abc@gmail.com"
														value={values.u_correo_e}
														onChange={handleChange}
														isValid={touched.u_correo_e && !errors.u_correo_e}
														isInvalid={!!errors.u_correo_e}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.u_correo_e}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Contrasena */}
											<Row className="mb-3">
												{/* Contrasena */}
												<Form.Group as={Col} md="12" controlId="u_password">
													<Form.Label>Contrasena</Form.Label>
													<Form.Control
														type="password"
														name="u_password"
														placeholder="Cualquiera :D"
														value={values.u_password}
														onChange={handleChange}
														isValid={touched.u_password && !errors.u_password}
														isInvalid={!!errors.u_password}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.u_password}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Tipo usuario */}
											<Row className="mb-3">
												{/* Tipo usuario */}
												<Form.Group
													as={Col}
													md="12"
													controlId="fk_tipo_usuario">
													<Form.Label>Tipo usuario</Form.Label>
													<Form.Select
														name="fk_tipo_usuario"
														value={values.fk_tipo_usuario}
														onChange={handleChange}
														isValid={
															touched.fk_tipo_usuario && !errors.fk_tipo_usuario
														}
														isInvalid={!!errors.fk_tipo_usuario}>
														<option value="">Seleccione</option>
														{tiposUsuario.map((element, index) => {
															return (
																<option key={index} value={element.tu_clave}>
																	{element.tu_nombre}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_tipo_usuario}
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
