import React, { useContext } from "react";
import "../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react dom imports
import { Link } from "react-router-dom";

// import context
import { Context } from "../store/appContext";

export const Login = () => {
	// use context
	const { store, actions } = useContext(Context);

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

								<Link to="/home">
									<span>
										<div className="d-grid gap-2" type="submit">
											<Button variant="primary" onClick={manageLoginClick}>
												Ingresar
											</Button>
										</div>
									</span>
								</Link>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
