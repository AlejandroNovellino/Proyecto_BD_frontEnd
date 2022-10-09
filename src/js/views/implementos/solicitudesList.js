import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// react dom imports

export const SolicitudesList = () => {
	const solicitudes = [
		{
			raceNumber: 1,
			ejemplar: "Crimson America",
			entrenador: "Momo",
			implemento: "Vendas",
			descripcion: "",
		},
		{
			raceNumber: 2,
			ejemplar: "Asian Rider",
			entrenador: "Luis",
			implemento: "Orejas tapadas",
			descripcion: "A mi cabalo le da penita",
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={9}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de implementos en el sistema
						</Card.Header>
						<Card.Body>
							<Table striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>#</th>
										<th>Numero de carrera</th>
										<th>Entrenador</th>
										<th>Ejemplar</th>
										<th>Implemento</th>
										<th>Descripcion</th>
										<th>Negar</th>
										<th>Acaptar</th>
									</tr>
								</thead>
								<tbody>
									{solicitudes.map((solicitud, index) => {
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{solicitud?.raceNumber}</td>
												<td>{solicitud?.entrenador}</td>
												<td>{solicitud?.ejemplar}</td>
												<td>{solicitud?.implemento}</td>
												<td>{solicitud?.descripcion}</td>
												<td className="text-center">
													<Button variant="danger" className="px-4">
														<i className="fas fa-minus-circle"></i>
													</Button>
												</td>
												<td className="text-center">
													<Button variant="success" className="px-4">
														<i className="fas fa-trash"></i>
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
