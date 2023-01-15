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
// react router imports
import { useNavigate, useLocation } from "react-router-dom";

// import context
import { Context } from "../../store/appContext";

export const CreateResultadosEjemplares = () => {
	// state
	const [resultados, setResultados] = useState({});
	const [inscripciones, setInscripciones] = useState([]);
	const [posiciones, setPosiciones] = useState([]);
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();
	// location
	let location = useLocation();
	let element = location.state;
	// calculate the amount of resultados parciales
	let amount_resultados_parciales = Math.floor(element.c_distancia / 400);
	if (element.c_distancia % 400 !== 0) {
		amount_resultados_parciales += 1;
	}
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// alert state
	const [alertShow, setAlertShow] = useState(false);

	// get data when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getInscripcionesCarrera(element.c_clave);
			setInscripciones(data);

			let auxResultados = [];
			let resultados_parciales = [...Array(amount_resultados_parciales).keys()];

			for (let inscripcion of data) {
				auxResultados[inscripcion.ins_clave] = {
					res_orden_llegada: "",
					res_diferencia_cuerpos: "",
					res_dividendo_pagado: "",
					res_speed_rating: "",
					res_variante_pista: "",
					fk_inscripcion: inscripcion.ins_clave,
					parciales: resultados_parciales.map(i => {
						return {
							pp_distancia:
								(i + 1) * 400 > element.c_distancia
									? element.c_distancia
									: (i + 1) * 400,
							pp_tiempo: "",
							pp_posicion: "",
							fk_resultado_ejemplar: "",
						};
					}),
				};
			}
			console.log(
				`🚀 ~ file: createResultadosEjemplares.js:50 ~ fetchData ~ auxResultados`,
				auxResultados
			);

			setResultados(auxResultados);

			setPosiciones([...Array(data.length).keys()]);
		};

		fetchData();

		return () => {};
	}, []);

	// create entrenador
	const handleCreate = async values => {
		console.log(resultados);
		// try to create
		for (let resultado_clave of Object.keys(resultados)) {
			let result = resultados[resultado_clave];
			// add the carrera
			result.carrera_id = element.c_clave;
			// try to create
			let response1 = await actions.createResultadoEjemplar(result);

			if (!response1) {
				console.log(response1);

				console.log("Hubo un error en la creacion del resultado");
				// show the alert
				setAlertShow(true);
				return false;
			} else {
				for (let resultado_parcial of result.parciales) {
					// add the fk to resultado
					resultado_parcial.fk_resultado_ejemplar = response1.res_clave;
					// try to cerate resultado parcial
					let response2 = await actions.createResultadoParcial(
						resultado_parcial
					);

					if (!response2) {
						console.log(response2);

						console.log("Hubo un error en la creacion en la posicion parcial");
						// show the alert
						setAlertShow(true);
						return false;
					} else {
						handleShow(true);
						await new Promise(r => setTimeout(r, 2000));
						navigate("/home");
					}
				}
			}
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Resultados creados</Modal.Title>
				</Modal.Header>
				<Modal.Body>Los resutlados se han registrados exitosamente</Modal.Body>
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
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Resultados de los ejemplares en la carrera:
							</Card.Header>
							<Card.Body className="px-5">
								<Container className="px-0 mt-3 mb-4 fs-5 fw-bold">
									{`Carrera: ${element.c_nombre}, Distancia: ${element.c_distancia}`}
								</Container>
								{inscripciones.map((element, index) => {
									return (
										<Card
											bg={"secondary"}
											text={"white"}
											className="mb-4"
											key={index}>
											<Card.Header className="fs-5 fw-bold">
												{`Ejemplar: ${element.binomio?.ejemplar?.e_nombre} (T.L. ${element.binomio?.ejemplar?.e_tatuaje_labial}), Jinete: ${element.binomio?.jinete?.p_primer_nombre} (C.I. ${element.binomio?.jinete?.p_cedula})`}
											</Card.Header>
											<Card.Body className="px-5">
												<Form>
													{/* Orden de llegada, diferencia de cuerpo, speed rating y variante de pista */}
													<Row>
														<Form.Group className="mb-3" as={Col} md="3">
															<Form.Label>Orden de llegada</Form.Label>
															<Form.Control
																type="text"
																placeholder="Orden de llegada"
																value={
																	resultados[element.ins_clave]
																		?.res_orden_llegada
																		? resultados[element.ins_clave]
																				?.res_orden_llegada
																		: ""
																}
																onChange={e => {
																	let aux = { ...resultados };
																	aux[element.ins_clave].res_orden_llegada =
																		e.target.value;

																	setResultados(aux);
																}}
															/>
														</Form.Group>

														<Form.Group className="mb-3" as={Col} md="3">
															<Form.Label>Diferencia de cuerpos</Form.Label>
															<Form.Control
																type="text"
																placeholder="Ej. 3"
																value={
																	resultados[element.ins_clave]
																		?.res_diferencia_cuerpos
																		? resultados[element.ins_clave]
																				?.res_diferencia_cuerpos
																		: ""
																}
																onChange={e => {
																	let aux = { ...resultados };
																	aux[
																		element.ins_clave
																	].res_diferencia_cuerpos = e.target.value;

																	setResultados(aux);
																}}
															/>
														</Form.Group>
														<Form.Group className="mb-3" as={Col} md="3">
															<Form.Label>Speed rating</Form.Label>
															<Form.Control
																type="text"
																placeholder="Ej. 145"
																value={
																	resultados[element.ins_clave]
																		?.res_speed_rating
																		? resultados[element.ins_clave]
																				?.res_speed_rating
																		: ""
																}
																onChange={e => {
																	let aux = { ...resultados };
																	aux[element.ins_clave].res_speed_rating =
																		e.target.value;

																	setResultados(aux);
																}}
															/>
														</Form.Group>
														<Form.Group className="mb-3" as={Col} md="3">
															<Form.Label>Variable de pista</Form.Label>
															<Form.Control
																type="text"
																placeholder="Ej. 45"
																value={
																	resultados[element.ins_clave]
																		?.res_variante_pista
																		? resultados[element.ins_clave]
																				?.res_variante_pista
																		: ""
																}
																onChange={e => {
																	let aux = { ...resultados };
																	aux[element.ins_clave].res_variante_pista =
																		e.target.value;

																	setResultados(aux);
																}}
															/>
														</Form.Group>
													</Row>
													<>
														{[...Array(amount_resultados_parciales).keys()].map(
															(j, index) => {
																return (
																	<Card
																		bg={"dark"}
																		text={"white"}
																		className="my-2"
																		key={index}>
																		<Card.Header className="fs-6 fw-bold">
																			Resultado parcial: {index + 1}
																		</Card.Header>
																		<Card.Body>
																			<Row>
																				<Form.Group
																					className="mb-3"
																					as={Col}
																					md="4">
																					<Form.Label>Distancia</Form.Label>
																					<Form.Control
																						type="text"
																						placeholder="Ej. 145"
																						value={
																							resultados[element.ins_clave]
																								?.parciales[index].pp_distancia
																								? resultados[element.ins_clave]
																										?.parciales[index]
																										.pp_distancia
																								: ""
																						}
																						disabled={true}
																					/>
																				</Form.Group>

																				<Form.Group
																					className="mb-3"
																					as={Col}
																					md="4">
																					<Form.Label>Tiempo</Form.Label>
																					<Form.Control
																						type="text"
																						placeholder="Ej. 00:00:00"
																						value={
																							resultados[element.ins_clave]
																								?.parciales[index].pp_tiempo
																								? resultados[element.ins_clave]
																										?.parciales[index].pp_tiempo
																								: ""
																						}
																						onChange={e => {
																							let aux = { ...resultados };

																							aux[element.ins_clave].parciales[
																								index
																							].pp_tiempo = e.target.value;

																							setResultados(aux);
																						}}
																					/>
																				</Form.Group>
																				<Form.Group
																					className="mb-3"
																					as={Col}
																					md="4">
																					<Form.Label>Posicion</Form.Label>
																					<Form.Control
																						type="text"
																						placeholder="Ej. 45"
																						value={
																							resultados[element.ins_clave]
																								?.parciales[index].pp_posicion
																								? resultados[element.ins_clave]
																										?.parciales[index]
																										.pp_posicion
																								: ""
																						}
																						onChange={e => {
																							let aux = { ...resultados };

																							aux[element.ins_clave].parciales[
																								index
																							].pp_posicion = e.target.value;

																							setResultados(aux);
																						}}
																					/>
																				</Form.Group>
																			</Row>
																		</Card.Body>
																	</Card>
																);
															}
														)}
													</>
												</Form>
												{/* Resultados parciales */}
											</Card.Body>
										</Card>
									);
								})}
								{/* Buttons */}
								<Row className="px-3">
									<Col xs={6} className="ps-0">
										<div className="d-grid gap-2" type="submit">
											<Button variant="danger" onClick={() => navigate(-1)}>
												Cancelar
											</Button>
										</div>
									</Col>
									<Col xs={6} className="pe-0">
										<div className="d-grid gap-2" onClick={handleCreate}>
											<Button type="submit" variant="primary">
												Registrar
											</Button>
										</div>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
