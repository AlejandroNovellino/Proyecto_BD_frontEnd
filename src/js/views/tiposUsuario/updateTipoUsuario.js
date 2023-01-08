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

// table import
import DataTable from "react-data-table-component";

export const UpdateTipoUsuario = props => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [acciones, setAcciones] = useState([]);
	const [selectedAcciones, setSelectedAcciones] = useState([]);
	// alert state
	const [alertShow, setAlertShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	// modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// navigate hook
	let navigate = useNavigate();
	// location
	let location = useLocation();
	let userType = location.state.tipoUsuario;
	let permisos = location.state.permisos;

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			//acciones
			let data = await actions.getAcciones();
			setAcciones(data);
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
	const handleUpdate = async values => {
		if (Object.keys(selectedAcciones).length === 0) {
			// show the alert
			setErrorMessage("Se debe elegir al menos una accion");
			setAlertShow(true);

			return false;
		}
		// set the nullable elements
		let params = setNullables(values);
		// set the key
		params.tu_clave = userType.tu_clave;

		// try to create
		let tipoUsuario = await actions.updateTipoUsuario(params);
		if (!tipoUsuario) {
			console.log(tipoUsuario);

			console.log("Hubo un error en la creacion");

			// show the alert
			setErrorMessage("Error en la creacion del retiro");
			setAlertShow(true);
			return false;
		} else {
			// create acciones tipo usuario
			for (let accion of selectedAcciones) {
				// create the tipo usuario accion
				let response = await actions.createAccionTipoUsuario({
					fk_tipousuario: tipoUsuario.tu_clave,
					fk_accion: accion.acc_clave,
				});

				if (!response) {
					console.log(response);

					console.log(
						"Hubo un error en la creacion de las relaciones tipo usuario accion"
					);

					// show the alert
					setErrorMessage(
						"Hubo un error en la creacion de las relaciones tipo usuario accion"
					);
					setAlertShow(true);
					return false;
				}
			}
			// success
			handleShow(true);
			await new Promise(r => setTimeout(r, 2000));
			navigate("/home");
		}
	};

	// handle select in the table
	const handleSelect = ({ selectedRows }) => {
		// action to do when an element is selected
		setSelectedAcciones(selectedRows);
	};

	const columns = [
		{
			name: "Clave",
			selector: row => row.acc_clave,
			omit: true,
		},
		{
			name: "Tabla objetivo",
			selector: row => row.acc_tabla_objetivo,
			sortable: true,
		},
		{
			name: "Accion",
			selector: row => row.acc_nombre,
			sortable: true,
		},
	];

	// validator for data
	const schema = yup.object({
		tu_nombre: yup
			.string()
			.max(45, "Longitud max 45 caracteres")
			.required("Es obligatorio"),
	});

	return (
		<>
			<Container className="mt-5">
				<Alert variant="info">
					<Alert.Heading>Info!</Alert.Heading>
					<p>
						No se meustran las acciones que ya tenia el tipo de usuario. Estas
						seran eliminadas y se volvera a crear las establecidas ahora.
						<br />
						<br />
						Se muestran todas las posibles acciones sobre las tablas que pueden
						ser modificadas en el sistema.
						<br />
						<br />
						Al presionar crear por favor espere un momento, la operacion puede
						llevar un tiempo.
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
					<Modal.Title>Tipo usuario actualizado</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Se ha actualizado el tipo de usuario exitosamente
				</Modal.Body>
			</Modal>

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={9}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Ingrese los datos del tipo de usuario a actualizar:
							</Card.Header>

							<Card.Body className="">
								<Container className="mt-4" fluid>
									<Formik
										validationSchema={schema}
										onSubmit={values => {
											handleUpdate(values);
										}}
										initialValues={{
											tu_nombre: userType.tu_nombre,
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
													<Form.Group as={Col} md="12" controlId="tu_nombre">
														<Form.Label>Nombre</Form.Label>
														<Form.Control
															type="text"
															name="tu_nombre"
															placeholder="Administrador"
															value={values.tu_nombre}
															onChange={handleChange}
															isValid={touched.tu_nombre && !errors.tu_nombre}
															isInvalid={!!errors.tu_nombre}
														/>
														<Form.Control.Feedback>
															Todo bien!
														</Form.Control.Feedback>
														<Form.Control.Feedback type="invalid">
															{errors.tu_nombre}
														</Form.Control.Feedback>
													</Form.Group>
												</Row>

												<Row className="mb-3">
													<Card.Title className="mb-3">
														Lista de posibles acciones en el sistema
													</Card.Title>
													<DataTable
														columns={columns}
														data={acciones}
														selectableRows
														pagination
														responsive
														highlightOnHover
														striped
														theme="dark"
														onSelectedRowsChange={handleSelect}
													/>
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
																Actualizar
															</Button>
														</div>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
