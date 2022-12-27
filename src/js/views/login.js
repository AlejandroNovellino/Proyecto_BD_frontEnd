import React, { useContext } from "react";
import "../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react router imports
import { useNavigate, Link } from "react-router-dom";

// import context
import { Context } from "../store/appContext";

export const Login = () => {
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();

	const manageLoginClick = () => {
		actions.setUser("userForNow");
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={6}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Body>
							<Card.Title className="text-center py-3">
								Bienvenido al sistema del hipodromo
							</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="username">
									<Form.Control type="email" placeholder="Nombre de usuario" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="password">
									<Form.Control type="password" placeholder="Contrasena" />
								</Form.Group>

								<div className="d-grid gap-2" type="submit">
									<Button variant="primary" onClick={manageLoginClick}>
										Iniciar Sesion
									</Button>
								</div>
							</Form>

							<footer className="footer"></footer>
						</Card.Body>
						<Card.Footer className="text-muted">
							<Row>
								<Col md={6}>
									<p>No posee cuenta?</p>
								</Col>
								<Col md={6}>
									<Link to="/signIn">
										<div className="d-grid gap-2" type="submit">
											<Button variant="secondary">Registrarse</Button>
										</div>
									</Link>
								</Col>
								<Col md={12}>
									<Link to="/home">
										<div className="d-grid gap-2" type="submit">
											<Button variant="danger" onClick={manageLoginClick}>
												PRUEBA
											</Button>
										</div>
									</Link>
								</Col>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
