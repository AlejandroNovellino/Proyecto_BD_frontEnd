import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Login = () => (
	<Container fluid>
		<Row className="justify-content-md-center py-4">
			<Col xs={6}>
				<Card>
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
								<Button variant="primary">Ingresar</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Container>
);
