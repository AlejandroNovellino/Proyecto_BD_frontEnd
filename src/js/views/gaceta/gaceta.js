import React, { useContext, useState, useEffect } from "react";
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

export const Gaceta = () => {
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
	];

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let filename = "GacetaLibro";

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
				setReport(response);
			}
		};

		fetchData();

		return () => {};
	}, []);

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
				<Col xs={12}>
					<Row className="px-4">
						<Card bg={"dark"} text={"white"}>
							<Card.Header className="fs-5 fw-bold">Gaceta</Card.Header>
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
				</Col>
			</Row>
		</Container>
	);
};
