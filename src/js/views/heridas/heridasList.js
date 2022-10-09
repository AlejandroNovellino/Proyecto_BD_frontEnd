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

export const HeridasList = () => {
	const heridas = [
		{
			name: "Tendonitis",
			duracion: "",
			intensidad: "Grave",
			viabilidad: "Incurable",
			descripcion: "La tendonitis se presenta con inflamación de los tendones.",
		},
		{
			name: "Castracion",
			duracion: "14",
			intensidad: "Leve",
			viabilidad: "Curable",
			descripcion:
				"Las nuevas técnicas veterinarias permiten una rápida recuperación luego de efectuarse la intervención.",
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
										<th>Nombre</th>
										<th>Duracion (dias)</th>
										<th>Intensidad</th>
										<th>Viabilidad</th>
										<th>Descripcion</th>
										<th>Actualizar</th>
										<th>Eliminar</th>
									</tr>
								</thead>
								<tbody>
									{heridas.map((herida, index) => {
										return (
											<tr key={index}>
												<td>{index}</td>
												<td>{herida?.name}</td>
												<td>{herida?.duracion}</td>
												<td>{herida?.intensidad}</td>
												<td>{herida?.viabilidad}</td>
												<td>{herida?.descripcion}</td>
												<td className="text-center">
													<Button variant="warning" className="px-4">
														<i class="fas fa-user-edit"></i>
													</Button>
												</td>
												<td className="text-center">
													<Button variant="danger" className="px-4">
														<i class="fas fa-trash"></i>
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
