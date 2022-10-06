import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react dom imports
import { Link } from "react-router-dom";

export const MainView = () => (
	<Container fluid>
		<Row className="justify-content-md-center py-4">
			<Col xs={6}>
				<Card bg={"dark"} text={"white"} className="">
					<Card.Body>
						<Card.Title className="text-center py-3">
							Bienvenido al sistema del hipodromo
						</Card.Title>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Container>
);
