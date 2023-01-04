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

export const UpdateStud = () => {
	// state
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

	// empty
	useEffect(() => {
		return () => {};
	}, []);

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// set the id
		aux.s_clave = element.s_clave;

		return aux;
	};

	// update element
	const handleUpdate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to create
		let response = await actions.updateStud(params);
		if (!response) {
			console.log(response);

			console.log("Hubo un error en la actualizacion");
			// show the alert
			setAlertShow(true);
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/studs/update");
			handleShow(false);
		}
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
					<Modal.Title>Stud actualizado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El stud se ha actualizado exitosamente</Modal.Body>
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
										s_nombre: element.s_nombre,
										s_fecha_creacion: element.s_fecha_creacion,
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
