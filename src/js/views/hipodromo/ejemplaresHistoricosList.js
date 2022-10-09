import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// react-router-bootstrap import
import { LinkContainer } from "react-router-bootstrap";

export const EjemplaresHistoricosList = () => {
	const ejemplaresHistoricos = [
		{
			name: "Crimson",
			anoNacimiento: 1965,
			harasProcedencia: "Los juanitos",
			pelaje: "negro",
			sexo: "masculino",
			imagen: "",
			propietarios: ["prop_1", "prop_2"],
		},
		{
			name: "America",
			anoNacimiento: 1965,
			harasProcedencia: "Los juanitos",
			pelaje: "negro",
			sexo: "masculino",
			imagen: "",
			stud: "Stud 2",
			propietarios: ["prop_1", "prop_2"],
		},
	];

	return (
		<Container fluid>
			<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
				<Col md={12}>
					<Card bg={"secondary"} text={"white"}>
						<Card.Body>
							<Card.Title className="m-0">
								Ejemplares historicos registrados en el sistema
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row xs={3} md={3} className="justify-content-md-center p-4 g-4">
				{ejemplaresHistoricos.map((ejemplar, index) => {
					return (
						<Col key={index}>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									{ejemplar?.name}
								</Card.Header>
								<Card.Body>
									<Table striped bordered hover variant="dark">
										<thead>
											<tr></tr>
										</thead>
										<tbody>
											<tr>
												<td>{"Año nacimiento"}</td>
												<td>{ejemplar?.anoNacimiento}</td>
											</tr>
											<tr>
												<td>{"Pelaje"}</td>
												<td>{ejemplar?.pelaje}</td>
											</tr>
											<tr>
												<td>{"Haras procedencia"}</td>
												<td>{ejemplar?.harasProcedencia}</td>
											</tr>
											<tr>
												<td>{"Sexo"}</td>
												<td>{ejemplar?.sexo}</td>
											</tr>
										</tbody>
									</Table>
									<div className="d-grid gap-2">
										<LinkContainer to="/">
											<Button variant="warning">Modificar</Button>
										</LinkContainer>
										<LinkContainer to="/">
											<Button variant="danger">Eliminar</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};
