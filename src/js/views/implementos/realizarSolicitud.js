import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// react router imports
import { useNavigate } from "react-router-dom";

export const RealizarSolicitud = () => {
	// states
	let navigate = useNavigate();
	const races = [
		{
			raceNumber: 1,
			ejemplar: "Crimson America",
		},
		{
			raceNumber: 2,
			ejemplar: "Asian Rider",
		},
		{
			raceNumber: 3,
			ejemplar: "Justice Driver",
		},
		{
			raceNumber: 1,
			ejemplar: "Love Driver",
		},
	];

	const returnHome = () => {
		navigate("/home");
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">Nueva solicitud</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos de la solicitud
							</Card.Title>
							<Container fluid>
								<Row className="justify-content-md-center py-4">
									<Col xs={6} md={6}>
										<Form>
											{races.map((race, index) => {
												return (
													<>
														<Row key={index} className="mb-2">
															<Col xs={10} md={10}>
																<p className="text-start fs-6 m-0">
																	{"Carrera numero: " +
																		race?.raceNumber +
																		", ejemplar: " +
																		race?.ejemplar}
																</p>
															</Col>
															<Col xs={2} md={2}>
																<Form.Check type={"checkbox"} />
															</Col>
														</Row>
														<hr style={{ borderTop: "1px solid white" }} />
													</>
												);
											})}
										</Form>
									</Col>
									<Col xs={6} md={6}>
										<Form>
											<Row className="mb-2">
												<Col xs={12} md={12}>
													<Form.Group
														className="mb-3"
														controlId="exampleForm.ControlInput1">
														<Form.Label>Implemento a solicitar</Form.Label>
														<Form.Select>
															<option value="1">Vendas</option>
															<option value="2">Orejas tapadas</option>
														</Form.Select>
													</Form.Group>
												</Col>
											</Row>
											<Row className="mb-3">
												<Col xs={12} md={12}>
													<p className="fs-5 m-0">Descripcion:</p>
												</Col>
												<Col xs={12} md={12}>
													<Form.Control as="textarea" rows={6} />
												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
							</Container>

							<Container>
								<Row>
									<Col xs={6} className="ps-0">
										<div className="d-grid gap-2" type="submit">
											<Button variant="danger" onClick={returnHome}>
												Cancelar
											</Button>
										</div>
									</Col>
									<Col xs={6} className="pe-0">
										<div className="d-grid gap-2" type="submit">
											<Button variant="success">Solicitar</Button>
										</div>
									</Col>
								</Row>
							</Container>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
