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

// import document
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export const MainReports = () => {
	// use context
	const { store, actions } = useContext(Context);
	// file generated
	const [fileGenerated, setFileGenerated] = useState(false);
	// file url
	const [report, setReport] = useState("");
	// file viewer
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
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
		{
			fileName: "CarrerasMasFrecuentes",
			label: "Carreras mas frecuentes",
		},
		{
			fileName: "EjemplaresRematadores400mt",
			label: "Ejemplares remtadores 400mt",
		},
		{
			fileName: "EjemplarGanador15Carrera",
			label: "Ejemplares Ganadores 15 Carreras",
		},
		{
			fileName: "EjemplarGanadorClasico",
			label: "Ejemplares Ganadores de Clasicos",
		},
		{
			fileName: "JineteGanoEjemplar",
			label: "Victorias ejemplar/jinete",
		},
		{
			fileName: "JinetePesoPromedio25Carrera",
			label: "Peso Promedio 25 ultimas carreras",
		},
		{
			fileName: "MejorMachoHembraNumHijos",
			label: "Mejor macho/hembra por hijos",
		},
		{
			fileName: "PromedioEjemplarSegunPelaje",
			label: "Prom ejemplar pelaje",
		},
		{
			fileName: "PromedioEjemplarSexo",
			label: "Prom ejemplar sexo",
		},
		{
			fileName: "PromImpleOrdenado",
			label: "Prom implemento",
		},
		{
			fileName: "ResultadoPorCarrera",
			label: "Resultado Carrera",
		},
		{
			fileName: "TotalApuestaPorTaquiCarreraTipo",
			label: "Total apuestas taquilla tipo Carrera",
		},
		{
			fileName: "TotalApuestaPorTaquilla",
			label: "Total apuestas taquilla",
		},
		{
			fileName: "TotalApuestaPorTaquillaTipoA",
			label: "Total apuestas taquilla tipo A",
		},
		{
			fileName: "UsoImplemento25Carreras",
			label: "Uso implemento ultimas 25 carreras",
		},
		{
			fileName: "VentasEntradas",
			label: "Ventas de entradas",
		},
	];

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	// handle create report
	const handleCreateReport = fileName => {
		const createReport = async filename => {
			let response = await actions.createReportTest(filename);

			if (!response) {
				setErrorMessage(`No se pudo crear el reporte "${filename}"`);
				setAlertShow(true);
			} else {
				setSuccessMessage(`Se creo el reporte "${filename}" exitosamente`);
				setSuccessShow(true);
				// show the report
				setFileGenerated(true);
				// set the url
				console.log(typeof response);
				setReport(response);
			}
		};

		createReport(fileName);
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={5} className="">
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
				<Col xs={7}>
					<Row className="px-4">
						<Card bg={"dark"} text={"white"}>
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

								{
									<Container>
										{fileGenerated && (
											<Container>
												<Row className="justify-content-center">
													<Col xs={12}>
														<Document
															file={report}
															onLoadSuccess={onDocumentLoadSuccess}>
															<Page pageNumber={pageNumber} />
														</Document>
													</Col>
												</Row>
												<Row className="justify-content-center">
													<Col xs={4}>
														<div className="d-grid gap-2">
															<Button
																variant="secondary"
																onClick={() => {
																	setPageNumber(pageNumber - 1);
																}}>
																Anterior
															</Button>
														</div>
													</Col>
													<Col xs={4}>{`${pageNumber} of ${numPages}`}</Col>
													<Col xs={4}>
														<div className="d-grid gap-2">
															<Button
																variant="secondary"
																onClick={() => {
																	setPageNumber(pageNumber + 1);
																}}>
																Siguiente
															</Button>
														</div>
													</Col>
												</Row>
											</Container>
										)}
									</Container>
								}
							</Card.Body>
						</Card>
					</Row>
					{/* Report viewer */}
					<Row></Row>
				</Col>
			</Row>
		</Container>
	);
};
