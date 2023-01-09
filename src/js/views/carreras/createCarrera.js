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
import { CarreraDatePickerField } from "./carreraDatePickerField";

export const CreateCarrera = () => {
	// state
	const [tiposCarrera, setTiposCarrera] = useState([]);
	const [categoriasCarrera, setCategoriasCarrera] = useState([]);
	const [pista, setPista] = useState([]);
	const [numerosLlamado, setNumerosLlamado] = useState([]);
	const [porcentajeDividendo, setPorcentajeDividendo] = useState([]);
	const [lugaresPremiados, setLugaresPremiados] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
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

	// get data when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTipoCarrera();
			setTiposCarrera(data);

			data = await actions.getCategoriaCarrera();
			setCategoriasCarrera(data);

			data = await actions.getPista();
			setPista(data);

			data = await actions.getPorcentajeDividendo();
			setPorcentajeDividendo(data);
		};

		fetchData();

		return () => {};
	}, []);

	const fetchNumLlamadoCarrera = date => {
		const fetchInfo = async date => {
			let data = await actions.getNumLlamadoCarrera(JSON.stringify(date));

			let allNumLlamada = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			let usedNumLlamada = data.map(element => {
				return element.c_num_llamado;
			});

			let aux = allNumLlamada.filter(
				element => !usedNumLlamada.includes(element)
			);

			setNumerosLlamado(aux);
		};

		fetchInfo(date);
	};

	// get puestos premiados
	const getPuestosPremiados = () => {
		let aux = [];

		for (let element of porcentajeDividendo) {
			if (lugaresPremiados.at(element.pd_clave - 1)) {
				aux.push(element.pd_clave);
			}
		}

		return aux;
	};

	// set the fecha by num_llamado
	const setFechaByNumLlamado = c_num_llamado => {
		console.log(c_num_llamado);

		switch (c_num_llamado) {
			case 1:
				return "01:00:00";
			case 2:
				return "01:30:00";
			case 3:
				return "02:00:00";
			case 4:
				return "02:30:00";
			case 5:
				return "03:00:00";
			case 6:
				return "03:30:00";
			case 7:
				return "04:00:00";
			case 8:
				return "04:30:00";
			case 9:
				return "05:00:00";
			case 10:
				return "05:30:00";
			case 11:
				return "06:00:00";
			case 12:
				return "06:30:00";
			default:
				return "";
		}
	};

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// nombre
		if (!values.c_nombre) aux.c_nombre = null;
		// pull dinero
		if (!values.c_pull_dinero_total) aux.c_pull_dinero_total = null;
		// comentario
		if (!values.c_comentario) aux.c_comentario = null;

		return aux;
	};

	// create entrenador
	const handleCreate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// set the
		params.c_hora = setFechaByNumLlamado(parseInt(values.c_num_llamado));
		// try to create
		let response1 = await actions.createCarrera(params);
		if (!response1) {
			console.log(response1);

			console.log("Hubo un error en la creacion de la carrera");
			// show the alert
			setAlertShow(true);
		} else {
			let lugares = getPuestosPremiados();
			for (let lugar of lugares) {
				let response2 = await actions.createCarreraPorcentajeDividendo({
					cpd_monto_otorgar: response1.c_pull_dinero_total
						? response1.c_pull_dinero_total *
						  porcentajeDividendo.at(lugar - 1).pd_porcentaje
						: 0,
					fk_carrera: response1.c_clave,
					fk_porcentaje_dividendo: lugar,
				});

				if (!response2) {
					console.log(response2);

					console.log(
						"Hubo un error en la creacion en la carrera porcentaje dividendo"
					);
					return false;
				}
			}
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	// validator for data
	const schema = yup.object({
		c_nombre: yup.string().max(45, "Longitud max 45 caracteres"),
		c_fecha: yup.date().min(new Date()).required("Es obligatorio"),
		c_num_llamado: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		c_pull_dinero_total: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo"),
		c_distancia: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		c_comentario: yup.string().max(100, "Longitud max 100 caracteres"),
		fk_tipo_carrera: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
		fk_categoria_carrera: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
		fk_pista: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
	});

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Importante!</Alert.Heading>
					<p>
						Si no hay numero de llamada disponible es que la cantidad de
						carreras para ese dia se completaron. {"\n"} La hora de la carrera
						se asigna automaticamente dependiendo del numero de llamado.
					</p>
				</Alert>
			</Container>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Carrera creada</Modal.Title>
				</Modal.Header>
				<Modal.Body>La carrera se ha creado exitosamente</Modal.Body>
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
					<Col xs={9}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">Nueva carrera</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos de la carrera a registrar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleCreate(values);
									}}
									initialValues={{
										c_nombre: "",
										c_fecha: "",
										c_num_llamado: "",
										c_pull_dinero_total: "",
										c_distancia: "",
										c_comentario: "",
										fk_tipo_carrera: "",
										fk_categoria_carrera: "",
										fk_pista: "",
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
											{/* Nombre, fecha y hora */}
											<Row className="mb-3">
												{/* Nombre */}
												<Form.Group as={Col} md="4" controlId="c_nombre">
													<Form.Label>Nombre</Form.Label>
													<Form.Control
														type="text"
														name="c_nombre"
														placeholder="Carrera A"
														value={values.c_nombre}
														onChange={handleChange}
														isValid={touched.c_nombre && !errors.c_nombre}
														isInvalid={!!errors.c_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.c_nombre}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Fecha */}
												<Form.Group as={Col} md="4" controlId="c_fecha">
													<Form.Label>Fecha</Form.Label>
													<CarreraDatePickerField
														id="c_fecha"
														className={
															!errors.c_fecha
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="c_fecha"
														value={values.c_fecha}
														isValid={touched.c_fecha && !errors.c_fecha}
														isInvalid={!!errors.c_fecha}
														auxFun={fetchNumLlamadoCarrera}
													/>
													{!errors.c_fecha && (
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
													{!!errors.c_fecha && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.c_fecha}
														</div>
													)}
												</Form.Group>
												{/* Num llamado */}
												<Form.Group as={Col} md="4" controlId="c_num_llamado">
													<Form.Label>Numero Llamado</Form.Label>
													<Form.Select
														name="c_num_llamado"
														value={values.c_num_llamado}
														onChange={handleChange}
														isValid={
															touched.c_num_llamado && !errors.c_num_llamado
														}
														isInvalid={!!errors.c_num_llamado}>
														<option value="">Seleccione</option>
														{numerosLlamado.map((element, index) => {
															return (
																<option key={index} value={element}>
																	{element}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.c_num_llamado}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Color pelaje, sexo y peso */}
											<Row className="mb-3">
												{/* Pull dinero */}
												<Form.Group
													as={Col}
													md="6"
													controlId="c_pull_dinero_total">
													<Form.Label>Pull dinero total (Bs)</Form.Label>
													<Form.Control
														type="text"
														name="c_pull_dinero_total"
														placeholder="Ej. 1000"
														value={values.c_pull_dinero_total}
														onChange={handleChange}
														isValid={
															touched.c_pull_dinero_total &&
															!errors.c_pull_dinero_total
														}
														isInvalid={!!errors.c_pull_dinero_total}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.c_pull_dinero_total}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Distancia */}
												<Form.Group as={Col} md="6" controlId="c_distancia">
													<Form.Label>Distancia (m)</Form.Label>
													<Form.Control
														type="text"
														name="c_distancia"
														placeholder="Ej. 1000"
														value={values.c_distancia}
														onChange={handleChange}
														isValid={touched.c_distancia && !errors.c_distancia}
														isInvalid={!!errors.c_distancia}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.c_distancia}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Comentario */}
											<Row className="mb-3">
												{/* Comentario */}
												<Form.Group as={Col} md="12" controlId="c_comentario">
													<Form.Label>Comentario</Form.Label>
													<Form.Control
														as="textarea"
														name="c_comentario"
														placeholder="Comentario de la carrera"
														value={values.c_comentario}
														onChange={handleChange}
														isValid={
															touched.c_comentario && !errors.c_comentario
														}
														isInvalid={!!errors.c_comentario}
														rows={2}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.c_comentario}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Tipo, Categoria y Pista */}
											<Row className="mb-3">
												{/* Tipo */}
												<Form.Group as={Col} md="4" controlId="fk_tipo_carrera">
													<Form.Label>Tipo carrera</Form.Label>
													<Form.Select
														name="fk_tipo_carrera"
														value={values.fk_tipo_carrera}
														onChange={handleChange}
														isValid={
															touched.fk_tipo_carrera && !errors.fk_tipo_carrera
														}
														isInvalid={!!errors.fk_tipo_carrera}>
														<option value="">Seleccione</option>
														{tiposCarrera.map((element, index) => {
															return (
																<option key={index} value={element.tc_clave}>
																	{`Nombre: ${element.tc_nombre}
																		Sexo: ${element.tc_sexo}
																		Edad min: ${element.tc_edad_minima}
																		Edad max: ${element.tc_edad_maxima}
																		Vict min: ${element.tc_victoria_minima}
																		Vict max: ${element.tc_victoria_maxima}
																	`}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_tipo_carrera}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Categoria */}
												<Form.Group
													as={Col}
													md="4"
													controlId="fk_categoria_carrera">
													<Form.Label>Categoria carrera</Form.Label>
													<Form.Select
														name="fk_categoria_carrera"
														value={values.fk_categoria_carrera}
														onChange={handleChange}
														isValid={
															touched.fk_categoria_carrera &&
															!errors.fk_categoria_carrera
														}
														isInvalid={!!errors.fk_categoria_carrera}>
														<option value="">Seleccione</option>
														{categoriasCarrera.map((element, index) => {
															return (
																<option key={index} value={element.ca_clave}>
																	{element.ca_nombre}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_categoria_carrera}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Pista */}
												<Form.Group as={Col} md="4" controlId="fk_pista">
													<Form.Label>Pista</Form.Label>
													<Form.Select
														name="fk_pista"
														value={values.fk_pista}
														onChange={handleChange}
														isValid={touched.fk_pista && !errors.fk_pista}
														isInvalid={!!errors.fk_pista}>
														<option value="">Seleccione</option>
														{pista.map((element, index) => {
															return (
																<option key={index} value={element.pi_clave}>
																	{"Pista de: " +
																		element.pi_longitud +
																		" metros"}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_pista}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Porcentaje dividendo */}
											<Row className="mb-3">
												{/* Porcentaje dividendo */}
												<Form.Group as={Col} md="12">
													<Form.Label>Puestos que se premiaran</Form.Label>

													{porcentajeDividendo.map((element, index) => {
														return (
															<Form.Check
																key={index}
																type={"checkbox"}
																value={element.pd_clave}
																label={
																	"Premio para el puesto: " + element.pd_puesto
																}
																onChange={() => {
																	let aux = [...lugaresPremiados];
																	aux[element.pd_clave - 1] = !aux.at(
																		element.pd_clave - 1
																	);
																	setLugaresPremiados(aux);
																}}
															/>
														);
													})}
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
