import React, { useContext, useState } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// import context
import { Context } from "../../store/appContext";

export const MainReports = () => {
	// use context
	const { store, actions } = useContext(Context);
	// success state
	const [successShow, setSuccessShow] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	// alert state
	const [alertShow, setAlertShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const reportsType = [
		{
			fileName: "UsuarioRol",
			label: "Listado de usuarios con sus roles",
		},
		{
			fileName: "StudColor",
			label: "Listado de Studs con la descripción de su camisa y gorra",
		},
		{
			fileName: "StudPropietarios",
			label: "Listado de Studs con sus propietarios y porcentajes",
		},
		{
			fileName: "StudPropietarioEjemplar",
			label: "Listados de Studs con sus ejemplares y propietarios",
		},
		{
			fileName: "Ejemplar",
			label:
				"Listado de ejemplares, con sexo y tipo de pelaje clasificados por edad",
		},
		{
			fileName: "Implementos",
			label: "Listados de implementos",
		},
		{
			fileName: "EntrenadorCuadrilla",
			label: "Listado de Entrenadores, indicando su cuadra",
		},
		{
			fileName: "Jinete",
			label: "Listado de Jinete",
		},
		{
			fileName: "Restaurant",
			label: "Restaurantes del hipódromo",
		},
	];

	// handle create report
	const handleCreateReport = fileName => {
		const createReport = async filename => {
			let response = await actions.createReport(filename);

			if (!response) {
				setErrorMessage(`No se pudo crear el reporte "${filename}"`);
				setAlertShow(true);
			} else {
				setSuccessMessage(`Se creao el reporte "${filename}" exitosamente`);
				setSuccessShow(true);
			}
		};

		createReport(fileName);
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={6} className="">
					<Card bg={"dark"} text={"white"} className="ms-3">
						<Card.Header className="fs-5 fw-bold">
							Lista de reportes disponibles
						</Card.Header>
						<Card.Body>
							{reportsType &&
								reportsType.map((report, index) => {
									return (
										<div className="d-grid gap-2 mb-3" key={index}>
											<Button
												variant="primary"
												onClick={() => handleCreateReport(report.fileName)}>
												{report.label}
											</Button>
										</div>
									);
								})}
						</Card.Body>
					</Card>
				</Col>
				<Col xs={6}>
					<Card bg={"dark"} text={"white"} className="ms-3">
						<Card.Header className="fs-5 fw-bold">Informacion</Card.Header>
						<Card.Body>
							{successShow && (
								<Container className="mt-5">
									<Alert
										variant="success"
										onClose={() => setSuccessShow(false)}
										dismissible>
										<Alert.Heading>Creado el reporte!</Alert.Heading>
										<p>{successMessage}</p>
									</Alert>
								</Container>
							)}

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
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
