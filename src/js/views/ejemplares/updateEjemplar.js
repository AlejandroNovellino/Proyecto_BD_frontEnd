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

export const UpdateEjemplar = props => {
	// state
	const [haras, setHaras] = useState([]);
	const [caballerizas, setCaballerizas] = useState([]);
	const [puestos, setPuestos] = useState([]);
	const [yeguas, setYeguas] = useState([]);
	const [caballos, setCaballos] = useState([]);
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

	// get data when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getHaras();
			setHaras(data);

			data = await actions.getCaballerizas();
			setCaballerizas(data);

			data = await actions.getEjemplares();

			setYeguas(data.filter(ejemplar => ejemplar.e_sexo === "Y"));
			setCaballos(data.filter(ejemplar => ejemplar.e_sexo === "C"));

			data = await actions.getCaballerizaPuestos(element.fk_caballeriza);
			setPuestos(data);
		};

		fetchData();

		return () => {};
	}, []);

	const fetchCaballerizasPuestos = caballeriza_id => {
		console.log(caballeriza_id);

		const fetchPuestos = async () => {
			let data = await actions.getCaballerizaPuestos(caballeriza_id);
			setPuestos(data);
		};

		fetchPuestos();
	};

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// madre
		if (!values.fk_madre) aux.fk_madre = null;
		// padre
		if (!values.fk_padre) aux.fk_padre = null;

		return aux;
	};

	// create entrenador
	const handleUpdate = async values => {
		// set the nullable elements
		let params = setNullables(values);
		// try to update
		let response1 = await actions.updateEjemplar(params);
		if (!response1) {
			console.log(response1);

			console.log("Hubo un error en la actualizacion");
		} else if (values.fk_puesto !== element.fk_puesto) {
			let response2 = await actions.updateHistoricoPuesto(element.fk_puesto);

			if (!response2) {
				console.log(response1);

				console.log("Hubo un error en la actualizacion del historico");
			} else {
				let response3 = await actions.createHistoricoPuesto({
					hp_fecha_inicio: new Date(),
					hp_fecha_final: null,
					fk_puesto: values.fk_puesto,
					fk_ejemplar: element.e_tatuaje_labial,
				});
				if (!response3) {
					console.log(response3);

					console.log("Hubo un error en la creacion del historico de puesto");
				} else {
					handleShow(true);
					await new Promise(r => setTimeout(r, 2000));
					navigate("/ejemplares/update");
					handleShow(false);
				}
			}
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/ejemplares/update");
			handleShow(false);
		}
	};

	// validator for data
	const schema = yup.object({
		e_tatuaje_labial: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		e_nombre: yup
			.string()
			.max(45, "Longitud max 45 caracteres")
			.required("Es obligatorio"),
		e_color_pelaje: yup
			.string()
			.oneOf(["C", "Z", "T", "A"], "Color pelaje invalido")
			.required("Es obligatorio"),
		e_sexo: yup
			.string()
			.oneOf(["Y", "C"], "Sexo invalido")
			.required("Es obligatorio"),
		e_fecha_nacimiento: yup.date().max(new Date()).required("Es obligatorio"),
		e_fecha_ing_hipo: yup.date().max(new Date()).required("Es obligatorio"),
		e_peso: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(99999, "Debe poseer 5 numeros como maximo")
			.required("Es obligatorio"),
		fk_haras: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
		fk_madre: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo"),
		fk_padre: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo"),
		fk_puesto: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.required("Es obligatorio"),
		fk_caballeriza: yup
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
					<Modal.Title>Ejemplar actualizado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El ejemplar se ha actualizado exitosamente</Modal.Body>
			</Modal>
			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={9}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Ejemplar a actualizar
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Ingrese los datos del ejemplar a actualizar:
								</Card.Title>
								<Formik
									validationSchema={schema}
									onSubmit={values => {
										handleUpdate(values);
									}}
									initialValues={{
										e_tatuaje_labial: element.e_tatuaje_labial,
										e_nombre: element.e_nombre,
										e_color_pelaje: element.e_color_pelaje,
										e_sexo: element.e_sexo,
										e_fecha_nacimiento: element.e_fecha_nacimiento,
										e_fecha_ing_hipo: element.e_fecha_ing_hipo,
										e_peso: element.e_peso,
										fk_haras: element.fk_haras,
										fk_madre: element.fk_madre ? element.fk_madre : "",
										fk_padre: element.fk_padre ? element.fk_padre : "",
										fk_puesto: element.fk_puesto,
										fk_caballeriza: element.fk_caballeriza,
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
											{/* Tatuaje labial y nombre */}
											<Row className="mb-3">
												{/* Tatuaje labial */}
												<Form.Group
													as={Col}
													md="6"
													controlId="e_tatuaje_labial">
													<Form.Label>Tatuaje Labial</Form.Label>
													<Form.Control
														type="text"
														name="e_tatuaje_labial"
														placeholder="Ej. 6578"
														value={values.e_tatuaje_labial}
														onChange={handleChange}
														isValid={
															touched.e_tatuaje_labial &&
															!errors.e_tatuaje_labial
														}
														isInvalid={!!errors.e_tatuaje_labial}
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
														{errors.e_tatuaje_labial}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Nombre */}
												<Form.Group as={Col} md="6" controlId="e_nombre">
													<Form.Label>Nombre</Form.Label>
													<Form.Control
														type="text"
														name="e_nombre"
														placeholder="Smith"
														value={values.e_nombre}
														onChange={handleChange}
														isValid={touched.e_nombre && !errors.e_nombre}
														isInvalid={!!errors.e_nombre}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.e_nombre}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Color pelaje, sexo y peso */}
											<Row className="mb-3">
												{/* Color pelaje */}
												<Form.Group as={Col} md="4" controlId="e_color_pelaje">
													<Form.Label>Color pelaje</Form.Label>
													<Form.Select
														name="e_color_pelaje"
														value={values.e_color_pelaje}
														onChange={handleChange}
														isValid={
															touched.e_color_pelaje && !errors.e_color_pelaje
														}
														isInvalid={!!errors.e_color_pelaje}>
														<option>Seleccione</option>
														<option value="C">Castano</option>
														<option value="A">Alazan</option>
														<option value="Z">Zaino</option>
														<option value="T">Tordillo</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.e_color_pelaje}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Sexo */}
												<Form.Group as={Col} md="4" controlId="e_sexo">
													<Form.Label>Genero</Form.Label>
													<Form.Select
														name="e_sexo"
														value={values.e_sexo}
														onChange={handleChange}
														isValid={touched.e_sexo && !errors.e_sexo}
														isInvalid={!!errors.e_sexo}>
														<option>Seleccione</option>
														<option value="Y">Yegua</option>
														<option value="C">Caballo</option>
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.e_sexo}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Peso */}
												<Form.Group as={Col} md="4" controlId="e_peso">
													<Form.Label>Peso (Kg)</Form.Label>
													<Form.Control
														type="text"
														name="e_peso"
														placeholder="Ej. 50"
														value={values.e_peso}
														onChange={handleChange}
														isValid={touched.e_peso && !errors.e_peso}
														isInvalid={!!errors.e_peso}
													/>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.e_peso}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Fecha nacimiento y fecha entrada al hipodromo */}
											<Row className="mb-3">
												{/* Fecha nacimiento */}
												<Form.Group
													as={Col}
													md="6"
													controlId="e_fecha_nacimiento">
													<Form.Label>Fecha nacimiento</Form.Label>
													<DatePickerField
														id="e_fecha_nacimiento"
														className={
															!errors.e_fecha_nacimiento
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="e_fecha_nacimiento"
														value={values.e_fecha_nacimiento}
														isValid={
															touched.e_fecha_nacimiento &&
															!errors.e_fecha_nacimiento
														}
														isInvalid={!!errors.e_fecha_nacimiento}
													/>
													{!errors.e_fecha_nacimiento && (
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
													{!!errors.e_fecha_nacimiento && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.e_fecha_nacimiento}
														</div>
													)}
												</Form.Group>
												{/* Fecha entrada al hipodromo */}
												<Form.Group
													as={Col}
													md="6"
													controlId="e_fecha_nacimiento">
													<Form.Label>Fecha ingreso al hipodromo</Form.Label>
													<DatePickerField
														id="e_fecha_ing_hipo"
														className={
															!errors.e_fecha_ing_hipo
																? "form-control is-valid"
																: "form-control is-invalid"
														}
														name="e_fecha_ing_hipo"
														value={values.e_fecha_ing_hipo}
														isValid={
															touched.e_fecha_ing_hipo &&
															!errors.e_fecha_ing_hipo
														}
														isInvalid={!!errors.e_fecha_ing_hipo}
													/>
													{!errors.e_fecha_ing_hipo && (
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
													{!!errors.e_fecha_ing_hipo && (
														<div
															className=""
															style={{
																width: "100%",
																marginTop: "0.25rem",
																fontSize: ".875em",
																color: "#dc3545",
															}}>
															{errors.e_fecha_ing_hipo}
														</div>
													)}
												</Form.Group>
											</Row>
											{/* Haras, Caballeriza y Puesto */}
											<Row className="mb-3">
												{/* Haras */}
												<Form.Group as={Col} md="4" controlId="fk_haras">
													<Form.Label>Haras</Form.Label>
													<Form.Select
														name="fk_haras"
														value={values.fk_haras}
														onChange={handleChange}
														isValid={touched.fk_haras && !errors.fk_haras}
														isInvalid={!!errors.fk_haras}>
														<option>Seleccione</option>
														{haras.map((element, index) => {
															return (
																<option key={index} value={element.h_clave}>
																	{element.h_nombre}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_haras}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Caballeriza */}
												<Form.Group as={Col} md="4" controlId="fk_caballeriza">
													<Form.Label>Caballeriza</Form.Label>
													<Form.Select
														name="fk_caballeriza"
														value={values.fk_caballeriza}
														onChange={handleChange}
														onChangeCapture={e =>
															fetchCaballerizasPuestos(e.target.value)
														}
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
												{/* Puesto */}
												<Form.Group as={Col} md="4" controlId="fk_puesto">
													<Form.Label>Puesto</Form.Label>
													<Form.Select
														name="fk_puesto"
														value={values.fk_puesto}
														onChange={handleChange}
														isValid={touched.fk_puesto && !errors.fk_puesto}
														isInvalid={!!errors.fk_puesto}>
														<option>Seleccione</option>
														{puestos.map((element, index) => {
															return (
																<option key={index} value={element.pu_clave}>
																	{element.pu_numero}
																</option>
															);
														})}
													</Form.Select>
													<Form.Control.Feedback>
														Todo bien!
													</Form.Control.Feedback>
													<Form.Control.Feedback type="invalid">
														{errors.fk_puesto}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											{/* Madre y Padre */}
											<Row className="mb-3">
												{/* Madre */}
												<Form.Group as={Col} md="6" controlId="fk_madre">
													<Form.Label>Madre</Form.Label>
													<Form.Select
														name="fk_madre"
														value={values.fk_madre}
														onChange={handleChange}
														isValid={touched.fk_madre && !errors.fk_madre}
														isInvalid={!!errors.fk_madre}>
														<option value="">Seleccione</option>
														{yeguas.map((element, index) => {
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
														{errors.fk_madre}
													</Form.Control.Feedback>
												</Form.Group>
												{/* Padre */}
												<Form.Group as={Col} md="6" controlId="fk_padre">
													<Form.Label>Padre</Form.Label>
													<Form.Select
														name="fk_padre"
														value={values.fk_padre}
														onChange={handleChange}
														isValid={touched.fk_padre && !errors.fk_padre}
														isInvalid={!!errors.fk_padre}>
														<option value="">Seleccione</option>
														{caballos.map((element, index) => {
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
														{errors.fk_padre}
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
