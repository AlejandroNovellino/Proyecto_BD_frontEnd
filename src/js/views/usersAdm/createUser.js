import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react router imports
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
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
						<Card.Header className="fs-5 fw-bold">Nuevo usuario</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos del nuevo usuario a registrar:
							</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="username">
									<Form.Control type="email" placeholder="Nombre de usuario" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="password">
									<Form.Control type="password" placeholder="Contrasena" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="password">
									<Form.Control
										type="password"
										placeholder="Confirme contrasena"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="password">
									<Form.Select aria-label="Default select example">
										<option value="1">Administrador</option>
										<option value="2">Regular</option>
									</Form.Select>
								</Form.Group>
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
											<Button variant="primary">Crear</Button>
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
