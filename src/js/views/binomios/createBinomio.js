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

export const CreateBinomio = () => {
	// state
	const [jinetes, setJinetes] = useState([]);
	const [ejemplares, setEjemplares] = useState([]);
	const [errorResponse, setErrorResponse] = useState([]);
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
		const fetchJinetes = async () => {
			let data = await actions.getJinetes();
			setJinetes(data);
		};
		const fetchEjemplares = async () => {
			let data = await actions.getEjemplares();
			setEjemplares(data);
		};

		fetchJinetes();
		fetchEjemplares();

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
		// try to create
		let response = await actions.createBinomios(params);
		if (!response) {
			console.log(response);

			console.log("Hubo un error en la creacion");
			// save the error
			setErrorResponse(response);
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
		fk_ejemplar: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		fk_jinete: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		bi_jinete_peso: yup
			.number()
			.integer()
			.positive("Solo puede ser positiva")
			.lessThan(99, "Debe ser menor a 99 kg")
			.moreThan(0, "No puede ser 0")
			.required("Es obligatorio"),
		bi_ejemplar_peso: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(99999, "Debe poseer 5 numeros como maximo")
			.required("Es obligatorio"),
	});

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Importante!</Alert.Heading>
					<p>
						Peso ejemplar: peso del ejemplar al momento de crear el binomio.
						Peso jinete: peso del jinete al momento de crear el binomio.
					</p>
				</Alert>
			</Container>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Binomio creado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Binomio creado exitosamente</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>Ya este binomio existe</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={8}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">Nuevo binomio</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del binomio a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										fk_ejemplar: "",
										fk_jinete: "",
										bi_jinete_peso: "",
										bi_ejemplar_peso: "",
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
											{/* Peso ejemplar y peso del jinete */}
											<Row className="mb-3">
												{/* Peso ejemplar */}
												<Form.Group
													as={Col}
													md="6"
													controlId="bi_ejemplar_peso">
													<Form.Label>Peso ejemplar (Kg)</Form.Label>
													<Form.Control
														type="text"
														name="bi_ejemplar_peso"
														placeholder="Ej. 50"
														value={values.bi_ejemplar_peso}
														onChange={handleChange}
														isValid={
															touched.bi_ejemplar_peso &&
															!errors.bi_ejemplar_peso
														}
														isInvalid={!!errors.bi_ejemplar_peso}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.bi_ejemplar_peso}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Peso jinete */}
												<Form.Group as={Col} md="6" controlId="bi_jinete_peso">
													<Form.Label>Peso jinete (Kg)</Form.Label>
													<Form.Control
														type="text"
														name="bi_jinete_peso"
														placeholder="Ej. 50"
														value={values.bi_jinete_peso}
														onChange={handleChange}
														isValid={
															touched.bi_jinete_peso && !errors.bi_jinete_peso
														}
														isInvalid={!!errors.bi_jinete_peso}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.bi_jinete_peso}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Ejemplares y Jinetes */}
											<Row className="mb-3">
												{/* Ejemplares */}
												<Form.Group as={Col} md="6" controlId="fk_ejemplar">
													<Form.Label>Ejemplares</Form.Label>
													<Form.Select
														name="fk_ejemplar"
														value={values.fk_ejemplar}
														onChange={handleChange}
														isValid={touched.fk_ejemplar && !errors.fk_ejemplar}
														isInvalid={!!errors.fk_ejemplar}>
														<option value="">Seleccione</option>
														{ejemplares.map((element, index) => {
															return (
																<option
																	key={index}
																	value={element.e_tatuaje_labial}>
																	{"T.L. " +
																		element.e_tatuaje_labial +
																		", " +
																		element.e_nombre}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_ejemplar}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Jinetes */}
												<Form.Group as={Col} md="6" controlId="fk_jinete">
													<Form.Label>Jinetes</Form.Label>
													<Form.Select
														name="fk_jinete"
														value={values.fk_jinete}
														onChange={handleChange}
														isValid={touched.fk_jinete && !errors.fk_jinete}
														isInvalid={!!errors.fk_jinete}>
														<option value="">Seleccione</option>
														{jinetes.map((element, index) => {
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
														{errors.fk_jinete}
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
