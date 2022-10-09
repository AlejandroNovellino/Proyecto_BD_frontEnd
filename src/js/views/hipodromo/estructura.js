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

export const Estructura = () => {
	// states
	let navigate = useNavigate();

	const returnHome = () => {
		navigate("/home");
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Infraestructura del hipodromo
						</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos a actualizar del sistema:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col xs={4} md={4}>
										<Form.Group className="mb-3">
											<Form.Label>Numero total de caballerizas</Form.Label>
											<Form.Control type="text" placeholder="" />
										</Form.Group>
									</Col>
									<Col xs={8} md={8}>
										<Row>
											<Form.Label>Puestos por caballerizas</Form.Label>
										</Row>
										<Row>
											<Col xs={6} md={6}>
												<Form.Control
													type="text"
													placeholder="Cantidad minima"
												/>
												<Form.Text muted>Limite menor</Form.Text>
											</Col>
											<Col xs={6} md={6}>
												<Form.Control
													type="text"
													placeholder="Cantidad maxima"
												/>
												<Form.Text muted>Limite mayor</Form.Text>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row className="mb-3">
									<Col xs={6} md={6}>
										<Form.Group>
											<Form.Label>
												Capacidad del paddock (ejemplares)
											</Form.Label>
											<Form.Control type="text" placeholder="" />
										</Form.Group>
									</Col>
									<Col xs={6} md={6}>
										<Form.Group>
											<Form.Label>Metraje pista (Metros)</Form.Label>
											<Form.Control type="text" placeholder="" />
										</Form.Group>
									</Col>
								</Row>
								<Row className="mb-3">
									<Col xs={12} md={12}>
										<p className="fs-5 m-0">Grada central</p>
									</Col>
								</Row>
								<Row className="mb-3">
									<Col xs={6} md={6}>
										<Form.Group>
											<Form.Label>Capacidad nivel 1</Form.Label>
											<Form.Control type="text" placeholder="" />
										</Form.Group>
									</Col>
									<Col xs={6} md={6}>
										<Form.Group>
											<Form.Label>Capacidad nivel 2</Form.Label>
											<Form.Control type="text" placeholder="" />
										</Form.Group>
									</Col>
								</Row>
								<Row className="mb-3">
									<Col xs={12} md={12}>
										<Form.Group>
											<p className="fs-5 mb-2">Informacion adicional</p>
											<Form.Control as="textarea" rows={6} />
										</Form.Group>
									</Col>
								</Row>
							</Form>

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
											<Button variant="success">Guardar</Button>
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
