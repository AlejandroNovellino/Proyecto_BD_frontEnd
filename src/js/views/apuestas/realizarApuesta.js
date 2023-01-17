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

export const RealizarApuesta = () => {
	// state
	const [carreras, setCarreras] = useState([]);
	const [inscripciones, setInscripciones] = useState({});
	const [retiros, setRetiros] = useState({});
	const [metodosPago, setMetodosPago] = useState([]);
	const [metodoPagoSelected, setMetodoPagoSelected] = useState("");
	const [inscripcionesSelected, setInscripcionesSelected] = useState({});
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();
	// location
	let location = useLocation();
	let tipo_apuesta = location.state;
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// alert state
	const [alertShow, setAlertShow] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	// get data when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let carrerasPermitidas = await actions.getCarrerasForTipoApuesta();

			if (!carrerasPermitidas.length) {
				let data = await actions.getCarrerasApostar();

				// filter the amount of carreras by last carreras of programa
				if (
					tipo_apuesta.ta_cant_valida_ultimas_carreras_programa &&
					data.length > tipo_apuesta.ta_cant_valida_ultimas_carreras_programa
				) {
					// sort by hora desc
					data.sort(
						(a, b) =>
							parseInt(a.c_hora.replace(/:/g, "")) <
							parseInt(b.c_hora.replace(/:/g, ""))
					);
					//delete the ones lef behind
					for (let i of [
						...Array(
							tipo_apuesta.ta_cant_valida_ultimas_carreras_programa
						).keys(),
					]) {
						data.pop();
					}
					// sort again
					data.sort(
						(a, b) =>
							parseInt(a.c_hora.replace(/:/g, "")) >
							parseInt(b.c_hora.replace(/:/g, ""))
					);
				}

				// for each carrera get their inscripciones
				let auxInscripciones = {};
				let auxInscripcionesSelected = {};
				for (let carrera of data) {
					// get the inscripciones for the carrera and save them
					let auxInscripiones = await actions.getInscripcionesCarrera(
						carrera.c_clave
					);

					// set the inscripciones
					auxInscripciones[carrera.c_clave] = auxInscripiones;
					auxInscripcionesSelected[carrera.c_clave] = [];
				}

				// filter the carreras for num ejemplares
				if (tipo_apuesta.ta_cant_minima_caballos_necesaria_en_carrera) {
					data = data.filter(carrera => {
						auxInscripciones[carrera.c_clave] >=
							tipo_apuesta.ta_cant_minima_caballos_necesaria_en_carrera;
					});
					//auxInscripciones = auxInscripciones.filter((inscripcion) => );
				}

				// set the carreras
				setCarreras(data);

				// set the inscripciones and inscripciones selected
				setInscripciones(auxInscripciones);
				setInscripcionesSelected(auxInscripcionesSelected);
			} else {
				if (tipo_apuesta.ta_cant_valida_ultimas_carreras_programa) {
					// sort by hora desc
					carrerasPermitidas.sort(
						(a, b) =>
							parseInt(a.c_hora.replace(/:/g, "")) <
							parseInt(b.c_hora.replace(/:/g, ""))
					);
					//delete the ones lef behind
					for (let i of [
						...Array(
							tipo_apuesta.ta_cant_valida_ultimas_carreras_programa
						).keys(),
					]) {
						carrerasPermitidas.pop();
					}
					// sort again
					carrerasPermitidas.sort(
						(a, b) =>
							parseInt(a.c_hora.replace(/:/g, "")) >
							parseInt(b.c_hora.replace(/:/g, ""))
					);
				}

				setCarreras(carrerasPermitidas);
			}

			// get the retiros
			let data = await actions.getRetiros();
			setRetiros(data);
			// get metodos de pago
			data = await actions.getMetodosPago();
			setMetodosPago(data);
		};

		fetchData();

		return () => {};
	}, []);

	// rules of tipo apuesta completed
	const verifyRules = () => {
		// verify apuesta not empty
		let apuestaNotEmpty = 0;
		for (let carreraClave in inscripcionesSelected) {
			apuestaNotEmpty += inscripcionesSelected[carreraClave].length;
		}
		if (!apuestaNotEmpty) {
			setAlertMessage(`Debe seleccionar la cantida de caballos indicada`);
			setAlertShow(true);
			return false;
		}

		// verify rules of tipo apuesta for cant ejemplares
		let verifyEjemplaresMaxGeneral = 0;

		for (let carreraClave in inscripcionesSelected) {
			if (
				inscripcionesSelected[carreraClave].length >
				tipo_apuesta.ta_cant_maxima_caballos_por_carrera
			) {
				setAlertMessage(
					`Debe seleccionar como maximo ${tipo_apuesta.ta_cant_maxima_caballos_por_carrera} ejemplares por carrera`
				);
				setAlertShow(true);
				return false;
			}
			verifyEjemplaresMaxGeneral += inscripcionesSelected[carreraClave].length;
		}
		// verify max cantidad de caballos
		if (verifyEjemplaresMaxGeneral > tipo_apuesta.ta_cant_maxima_caballos) {
			setAlertMessage(
				`Debe seleccionar como maximo ${tipo_apuesta.ta_cant_maxima_caballos} ejemplares en todas las carreras`
			);
			setAlertShow(true);
			return false;
		}

		return true;
	};

	const getSaldoTotal = () => {
		let amountOfApuestas = 0;

		for (let carreraClave in inscripcionesSelected) {
			amountOfApuestas += inscripcionesSelected[carreraClave].length ? 1 : 0;
		}

		return (
			(tipo_apuesta.ta_precio
				? tipo_apuesta.ta_precio
				: tipo_apuesta.ta_multiplicador) * amountOfApuestas
		);
	};

	const getCombinaciones = () => {
		let comb = 1;
		for (let carreraClave in inscripcionesSelected) {
			comb *= inscripcionesSelected[carreraClave].length;
		}

		return comb;
	};

	// create apuesta
	const handleCreate = async _ => {
		console.log(inscripcionesSelected);
		// verify metodo pago selected
		if (!metodoPagoSelected) {
			setAlertMessage(`Debe seleccionar un metodo de pago`);
			setAlertShow(true);
			return false;
		}

		// verify tipo apuesta rules
		if (!verifyRules()) {
			return false;
		}

		// try to create
		let apuesta = await actions.createApuesta({
			apu_saldo_total: getSaldoTotal(),
			apu_combinacion: getCombinaciones(),
			apu_fecha_hora: new Date(),
			fk_tipoapuesta: tipo_apuesta.ta_clave,
			fk_usuario: store.user.u_clave,
			fk_aficionado: null,
		});

		if (!apuesta) {
			console.log(apuesta);

			console.log("Hubo un error en la creacion de la apuesta");
			// show the alert
			setAlertShow(true);
			return false;
		} else {
			// para cada carrera
			for (let carrera_id in inscripcionesSelected) {
				// para cada inscripcion crear el detalle apuesta
				inscripcionesSelected[carrera_id].forEach(
					async (inscripcion, index) => {
						// try to create
						let detalleApuesta = await actions.createDetalleApuesta({
							da_orden_llegada_ejemplar: index + 1,
							fk_apuesta: apuesta.apu_clave,
							fk_inscripcion: inscripcion.ins_clave,
							fk_metodopago: metodoPagoSelected,
						});

						if (!detalleApuesta) {
							console.log(detalleApuesta);

							console.log("Hubo un error en la creacion del detalle apuesta");
							return false;
						}
					}
				);
			}
			// ok show confirmation
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Importante!</Alert.Heading>
					<p>
						Se muestran las carreras validas para el tipo de apuesta
						seleccionada
					</p>
					<p>
						Si la apuesta toma en cuenta el orden de llegada se tomara el mismo
						segun el orden en el que se seleccionen:
					</p>
					<p>
						(primero = orden de llegada 1, segundo = orden de llegada 2, asi
						sucesivamente)
					</p>
				</Alert>
			</Container>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Apuesta registrada</Modal.Title>
				</Modal.Header>
				<Modal.Body>La apuesta se ha registrado exitosamente</Modal.Body>
			</Modal>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Ups, hubo un error!</Alert.Heading>
						<p>{alertMessage}</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Realizar apuesta
							</Card.Header>
							<Card.Body className="px-5">
								<Card.Title className="text-center py-3">
									Seleccione sus opciones:
								</Card.Title>

								<Container>
									<Row>
										<Col xs={4}>{`Nombre: ${tipo_apuesta?.ta_nombre}`}</Col>
										<Col
											xs={
												4
											}>{`Cant. de caballos a seleccionar por carrera: ${tipo_apuesta?.ta_cant_maxima_caballos_por_carrera}`}</Col>
										<Col
											xs={
												4
											}>{`Cant. de caballos max a seleccionar: ${tipo_apuesta?.ta_cant_maxima_caballos}`}</Col>
									</Row>
									<Row>
										<Col xs={4}>{`Orden de llegada: ${
											tipo_apuesta?.ta_llegada_en_orden ? "Si" : "No"
										}`}</Col>
										<Col xs={4}>{`Precio: ${tipo_apuesta?.ta_precio}`}</Col>
										<Col xs={4}>{`Multiplicador: ${
											tipo_apuesta?.ta_multiplicador
												? tipo_apuesta?.ta_multiplicador
												: "No tiene"
										}`}</Col>
									</Row>
								</Container>

								<Container className="mt-4">
									<Row>
										{carreras.map((carrera, index) => {
											return (
												<Col key={index} xs={4}>
													<Card
														bg={"secondary"}
														text={"white"}
														className="mb-4"
														key={index}>
														<Card.Header className="fs-5 fw-bold">
															{`Carrera: #${carrera.c_num_llamado} ${carrera.c_nombre}`}
														</Card.Header>
														<Card.Body className="px-5">
															<Form>
																{inscripciones[carrera.c_clave] &&
																	inscripciones[carrera.c_clave].map(
																		(inscripcion, index) => {
																			return (
																				<Form.Check
																					key={index}
																					type="checkbox"
																					label={`N.G. ${inscripcion.ins_num_gualdrapa} ${inscripcion.binomio.ejemplar.e_nombre}`}
																					onClick={() => {
																						let aux = {
																							...inscripcionesSelected,
																						};
																						if (
																							aux[carrera.c_clave].filter(
																								element =>
																									inscripcion.ins_clave ==
																									element.ins_clave
																							).length
																						) {
																							aux[carrera.c_clave] = aux[
																								carrera.c_clave
																							].filter(
																								element =>
																									inscripcion.ins_clave !=
																									element.ins_clave
																							);
																						} else {
																							aux[carrera.c_clave].push(
																								inscripcion
																							);
																						}

																						//update selected inscripciones
																						setInscripcionesSelected(aux);
																					}}
																				/>
																			);
																		}
																	)}
															</Form>
														</Card.Body>
													</Card>
												</Col>
											);
										})}
									</Row>
									<Row>
										<Form.Group as={Col} md="4" controlId="fk_pista">
											<Form.Label>Seleccione le metodo de pago</Form.Label>
											<Form.Select
												value={metodoPagoSelected}
												onChange={e => {
													setMetodoPagoSelected(e.target.value);
												}}>
												<option value={""}>Seleccione</option>
												{metodosPago.map((metodoPago, index) => {
													return (
														<option key={index} value={metodoPago.mp_clave}>
															{metodoPago.mp_nombre}
														</option>
													);
												})}
											</Form.Select>
										</Form.Group>
									</Row>
								</Container>
							</Card.Body>

							<Card.Footer>
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
										<div className="d-grid gap-2" type="submit">
											<Button
												type="submit"
												variant="success"
												onClick={handleCreate}>
												Apostar
											</Button>
										</div>
									</Col>
								</Row>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
