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

export const EjemplaresList = () => {
	const ejemplares = [
		{
			name: "Crimson",
			numeroPelaje: 1,
			pelaje: "negro",
			sexo: "masculino",
			nombrePadre: "",
			nombreMadre: "",
			numCaballeriza: 0,
			puestoCaballeriza: 0,
			imagen: "",
			stud: "Stud 1",
			propietarios: ["prop_1", "prop_2"],
		},
		{
			name: "America",
			numeroPelaje: 2,
			pelaje: "negro",
			sexo: "masculino",
			nombrePadre: "",
			nombreMadre: "",
			numCaballeriza: 0,
			puestoCaballeriza: 0,
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
								Ejemplares registrados en el sistema
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row xs={3} md={3} className="justify-content-md-center p-4 g-4">
				{ejemplares.map((ejemplar, index) => {
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
												<td>{"Numero pelaje"}</td>
												<td>{ejemplar?.numeroPelaje}</td>
											</tr>
											<tr>
												<td>{"Pelaje"}</td>
												<td>{ejemplar?.pelaje}</td>
											</tr>
											<tr>
												<td>{"Numero de caballeriza"}</td>
												<td>{ejemplar?.numCaballeriza}</td>
											</tr>
											<tr>
												<td>{"Puesto en la caballeriza"}</td>
												<td>{ejemplar?.puestoCaballeriza}</td>
											</tr>
											<tr>
												<td>{"Stud"}</td>
												<td>{ejemplar?.stud}</td>
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
