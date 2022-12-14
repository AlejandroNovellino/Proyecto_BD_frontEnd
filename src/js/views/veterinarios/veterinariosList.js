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

export const VeterinariosList = () => {
	const veterinarios = [
		{
			name: "Carlos",
			lastName: "Perez",
			ci: "34.567.999",
			caballeriza: "60",
		},
		{
			name: "Julio",
			lastName: "Perez",
			ci: "34.567.345",
			caballeriza: "90",
		},
		{
			name: "Ruperto",
			lastName: "Lopez",
			ci: "34.345.999",
			caballeriza: "45",
		},
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={9}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de veterinarios en el sistema
						</Card.Header>
						<Card.Body>
							<Table striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th>CI</th>
										<th>Caballeriza</th>
										<th>Actualizar</th>
										<th>Eliminar</th>
									</tr>
								</thead>
								<tbody>
									{veterinarios.map((veterinario, index) => {
										return (
											<tr key={index}>
												<td>{index}</td>
												<td>{veterinario?.name}</td>
												<td>{veterinario?.lastName}</td>
												<td>{veterinario?.ci}</td>
												<td>{veterinario?.caballeriza}</td>
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
