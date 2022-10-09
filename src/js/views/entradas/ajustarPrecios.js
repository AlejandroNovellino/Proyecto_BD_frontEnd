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

export const AjustarPrecios = () => {
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
							Precios de las entradas
						</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos a actualizar del sistema:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col xs={12} md={12}>
										<Row>
											<Form.Label>
												Precio del boleto para la Grada Central, butacas, playa
												y pasillos
											</Form.Label>
										</Row>
										<Row>
											<Col xs={6} md={6}>
												<Form.Control
													type="text"
													placeholder="80"
													disabled
													readOnly
												/>
												<Form.Text muted>Precio actual</Form.Text>
											</Col>
											<Col xs={6} md={6}>
												<Form.Control type="text" placeholder="" />
												<Form.Text muted>Nuevo precio</Form.Text>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={12} md={12}>
										<Row>
											<Form.Label>Precio del boleto zona mezzanina</Form.Label>
										</Row>
										<Row>
											<Col xs={6} md={6}>
												<Form.Control
													type="text"
													placeholder="200"
													disabled
													readOnly
												/>
												<Form.Text muted>Precio actual</Form.Text>
											</Col>
											<Col xs={6} md={6}>
												<Form.Control type="text" placeholder="" />
												<Form.Text muted>Nuevo precio</Form.Text>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={12} md={12}>
										<Row>
											<Form.Label>
												Precio del boleto palcos con pantalla privada
											</Form.Label>
										</Row>
										<Row>
											<Col xs={6} md={6}>
												<Form.Control
													type="text"
													placeholder="1500"
													disabled
													readOnly
												/>
												<Form.Text muted>Precio actual</Form.Text>
											</Col>
											<Col xs={6} md={6}>
												<Form.Control type="text" placeholder="" />
												<Form.Text muted>Nuevo precio</Form.Text>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={12} md={12}>
										<p className="text-start fs-6 mt-2">
											Todos los precios deben expresarse en Bolivares sin
											separacion con punto ( . ) para cifras como 1000 en
											adelante, los decimales se majena con coma ( , )
										</p>
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
