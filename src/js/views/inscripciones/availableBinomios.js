import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react dom imports
import { useNavigate } from "react-router-dom";

export const AvailableBinomios = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [victories, setVictories] = useState({});
	const [availableCarreras, setAvailableCarreras] = useState([]);
	const [selectedBinomio, setSelectedBinomio] = useState({});
	const [selectedCarrera, setSelectedCarrera] = useState({});
	// alert state
	const [alertShow, setAlertShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// navigate hook
	let navigate = useNavigate();

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			// binomios
			let binomios = await actions.getBinomios();
			setData(binomios);

			// victories
			let data = await actions.getEjemplarBinomiosVictories();
			setVictories(data);
		};

		fetchData();

		return () => {};
	}, []);

	// get available carreras
	const fetchAvailableCarreras = element => {
		const fetchCarreras = async (ejemplar_id, ejemplar_age, ejemplar_wins) => {
			let data = await actions.getCarrerasForEjemplar(
				ejemplar_id,
				ejemplar_age,
				ejemplar_wins
			);
			setAvailableCarreras(data);
		};

		fetchCarreras(
			element.ejemplar.e_tatuaje_labial,
			getAge(element.ejemplar.e_fecha_nacimiento),
			victories[element.ejemplar.e_tatuaje_labial]
		);
	};

	// handle select in the table
	const handleSelectBinomio = ({ selectedRows }) => {
		// action to do when an element is selected
		console.log(selectedRows[0]);
		setSelectedBinomio(selectedRows[0]);

		if (selectedRows[0]) {
			fetchAvailableCarreras(selectedRows[0]);
		} else {
			setAvailableCarreras([]);
		}
	};

	// handle select in the table
	const handleSelectCarrera = ({ selectedRows }) => {
		// action to do when an element is selected
		console.log(selectedRows[0]);
		setSelectedCarrera(selectedRows[0]);
	};

	const getAge = birthDate => {
		return Math.floor(
			(new Date() - new Date(birthDate).getTime()) / 3.15576e10
		);
	};

	// set nullable elements to null
	const setNullables = values => {
		let aux = {
			...values,
		};
		// madre
		if (!values.ins_ejemplar_favorito) aux.ins_ejemplar_favorito = false;
		// padre
		if (!values.ins_precio_reclamado) aux.ins_precio_reclamado = null;

		return aux;
	};

	// create entrenador
	const handleCreate = async values => {
		if (
			Object.keys(selectedBinomio).length === 0 ||
			Object.keys(selectedCarrera).length === 0
		) {
			setErrorMessage("Se debe elegir un binomio y carrera");
			setAlertShow(true);
			return false;
		}
		// set the nullable elements
		let params = setNullables(values);
		// foreign keys
		params.fk_carrera = selectedCarrera.c_clave;
		params.fk_binomio = selectedBinomio.bi_clave;
		params.fk_implemento = 0;
		// set the other values
		params.ins_num_gualdrapa = 0;
		params.ins_puesto_pista = 0;
		params.ins_fecha = new Date();
		// try to create
		let response1 = await actions.createInscripcion(params);
		if (!response1) {
			console.log(response1);

			console.log("Hubo un error en la creacion");
			// show the alert
			setErrorMessage(
				"La carrera no posee puestos disponibles o ya se encuentra registrado en la misma."
			);
			setAlertShow(true);
		} else {
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
			handleShow(false);
		}
	};

	const binomioColumns = [
		{
			name: "Clave",
			selector: row => row.bi_clave,
			omit: true,
		},
		{
			name: "Ejemplar",
			selector: row => row.ejemplar?.e_nombre,
			sortable: true,
		},
		{
			name: "Sexo ejemplar",
			selector: row => (row.ejemplar.e_sexo === "Y" ? "Yegua" : "Caballo"),
			sortable: true,
		},
		{
			name: "Edad ejemplar",
			selector: row => getAge(row.ejemplar.e_fecha_nacimiento),
			sortable: true,
		},
		{
			name: "Victorias ejemplar",
			selector: row => victories[row.ejemplar.e_tatuaje_labial],
			sortable: true,
		},
		{
			name: "Jinete",
			selector: row =>
				`${row.jinete?.p_primer_nombre} ${row.jinete?.p_primer_apellido}`,
			sortable: true,
		},
		{
			name: "Peso ejemplar",
			selector: row => row.bi_ejemplar_peso,
			sortable: true,
		},
		{
			name: "Peso jinete",
			selector: row => row.bi_jinete_peso,
			sortable: true,
		},
	];

	const carreraColumns = [
		{
			name: "Clave",
			selector: row => row.c_clave,
			omit: true,
		},
		{
			name: "Nombre",
			selector: row => (row.c_nombre ? row.c_nombre : ""),
			sortable: true,
		},
		{
			name: "Fecha",
			selector: row => row.c_fecha,
			sortable: true,
		},
		{
			name: "Hora",
			selector: row => row.c_hora,
			sortable: true,
		},
		{
			name: "Num llamada",
			selector: row => row.c_num_llamado,
			sortable: true,
		},
		{
			name: "Pull dinero total",
			selector: row => (row.c_pull_dinero_total ? row.c_pull_dinero_total : ""),
			sortable: true,
		},
		{
			name: "Distancia",
			selector: row => row.c_distancia,
			sortable: true,
		},
		{
			name: "Categoria carrera",
			selector: row => row.categoria_carrera.ca_nombre,
			sortable: true,
		},
		{
			name: "Tipo carrera",
			selector: row => row.tipo_carrera.tc_nombre,
			sortable: true,
		},
		{
			name: "Sexo necesario",
			selector: row =>
				row.tipo_carrera.tc_sexo ? row.tipo_carrera.tc_sexo : "",
			sortable: true,
		},
		{
			name: "Edad min necesario",
			selector: row =>
				row.tipo_carrera.tc_edad_minima ? row.tipo_carrera.tc_edad_minima : "",
			sortable: true,
		},
		{
			name: "Edad max necesario",
			selector: row =>
				row.tipo_carrera.tc_edad_maxima ? row.tipo_carrera.tc_edad_maxima : "",
			sortable: true,
		},
		{
			name: "Victorias min necesario",
			selector: row =>
				row.tipo_carrera.tc_victoria_minima
					? row.tipo_carrera.tc_victoria_minima
					: "",
			sortable: true,
		},
		{
			name: "Victorias max necesario",
			selector: row =>
				row.tipo_carrera.tc_victoria_maxima
					? row.tipo_carrera.tc_victoria_maxima
					: "",
			sortable: true,
		},
		{
			name: "Pista",
			selector: row => row.pista.pi_longitud,
			sortable: true,
		},
	];

	// validator for data
	const schema = yup.object({
		ins_ejemplar_favorito: yup.boolean(),
		ins_precio_reclamado: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(0, "Debe ser mayor a 0")
			.lessThan(99999999, "Debe poseer 8 numeros como maximo"),
	});

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Importante!</Alert.Heading>
					<p>
						Se muestran todos los binomios disponibles en el sistema.
						<br />
						Seleccione uno para realizar su inscripcion a una carrera en la que
						pueda participar.
					</p>
				</Alert>
			</Container>

			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>Hubo un error!</Alert.Heading>
						<p>{errorMessage}</p>
					</Alert>
				</Container>
			)}

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Inscripcion registrada</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha registrado la inscripcion exitosamente</Modal.Body>
			</Modal>

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Registro de una inscripcion
							</Card.Header>
							<Card.Body>
								<Card.Title className="mb-3">
									Lista de binomios en el sistema
								</Card.Title>
								<DataTable
									columns={binomioColumns}
									data={data}
									selectableRows
									pagination
									responsive
									highlightOnHover
									striped
									selectableRowsNoSelectAll
									selectableRowsSingle
									onSelectedRowsChange={handleSelectBinomio}
									theme="dark"
								/>
								<br />
								<br />
								<Card.Title className="mb-2">
									Careras disponibles para el binomio seleccionado
								</Card.Title>
								<DataTable
									columns={carreraColumns}
									data={availableCarreras}
									selectableRows
									pagination
									responsive
									highlightOnHover
									striped
									selectableRowsNoSelectAll
									selectableRowsSingle
									onSelectedRowsChange={handleSelectCarrera}
									theme="dark"
								/>

								<Container className="mt-4">
									<Formik
										validationSchema={schema}
										onSubmit={values => {
											handleCreate(values);
										}}
										initialValues={{
											ins_ejemplar_favorito: "",
											ins_precio_reclamado: "",
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
												{/* Favorito y precio de reclamo */}
												<Row className="mb-3">
													{/* Favorito */}
													<Form.Group
														as={Col}
														md="6"
														controlId="ins_ejemplar_favorito">
														<Form.Label>
															Favorito (colcoar "true" si lo es, o dejar vacio)
														</Form.Label>
														<Form.Control
															type="text"
															name="ins_ejemplar_favorito"
															placeholder="Ej. true"
															value={values.ins_ejemplar_favorito}
															onChange={handleChange}
															isValid={
																touched.ins_ejemplar_favorito &&
																!errors.ins_ejemplar_favorito
															}
															isInvalid={!!errors.ins_ejemplar_favorito}
														/>
														<Form.Control.Feedback>
															Todo bien!
														</Form.Control.Feedback>
														<Form.Control.Feedback type="invalid">
															{errors.ins_ejemplar_favorito}
														</Form.Control.Feedback>
													</Form.Group>
													{/* precio de reclamo */}
													<Form.Group
														as={Col}
														md="6"
														controlId="ins_precio_reclamado">
														<Form.Label>Precio de reclamo</Form.Label>
														<Form.Control
															type="text"
															name="ins_precio_reclamado"
															placeholder="Ej. 2200"
															value={values.ins_precio_reclamado}
															onChange={handleChange}
															isValid={
																touched.ins_precio_reclamado &&
																!errors.ins_precio_reclamado
															}
															isInvalid={!!errors.ins_precio_reclamado}
														/>
														<Form.Control.Feedback>
															Todo bien!
														</Form.Control.Feedback>
														<Form.Control.Feedback type="invalid">
															{errors.ins_precio_reclamado}
														</Form.Control.Feedback>
													</Form.Group>
												</Row>

												{/* Buttons */}
												<Row className="px-3">
													<Col xs={6} className="ps-0">
														<div className="d-grid gap-2" type="submit">
															<Button
																variant="danger"
																onClick={() => navigate(-1)}>
																Cancelar
															</Button>
														</div>
													</Col>
													<Col xs={6} className="pe-0">
														<div className="d-grid gap-2" type="submit">
															<Button type="submit" variant="primary">
																Inscribir
															</Button>
														</div>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</Container>
							</Card.Body>
							<Card.Footer></Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
