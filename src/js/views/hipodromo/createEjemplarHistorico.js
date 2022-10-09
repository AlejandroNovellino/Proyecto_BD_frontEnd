import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// react router imports
import { useNavigate } from "react-router-dom";

export const CreateEjemplarHistorico = () => {
	// states
	let navigate = useNavigate();
	const studs = ["stud_1", "stud_2", "stud_3"];
	let propietarios = ["Prop_1", "Prop_2"];

	const returnHome = () => {
		navigate("/home");
	};

	const addPropietario = () => {};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Nuevo ejemplar historico
						</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos del nuevo ejemplar historico a registrar:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col>
										<Form.Control placeholder="Nombre" />
									</Col>
									<Col>
										<Form.Control placeholder="Año nacimiento" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col>
										<Form.Control placeholder="Pelaje" />
									</Col>
									<Col>
										<Form.Select>
											<option value="1">Masculino</option>
											<option value="2">Femenino</option>
										</Form.Select>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col>
										<Form.Control placeholder="Haras de procedencia" />
									</Col>
								</Row>
								<Row className="">
									<Col xs={6}>
										<p className="text-end fs-5 mt-2">Imagen del ejemplar:</p>
									</Col>
									<Col xs={6}>
										<Form.Control type="file" />
									</Col>
								</Row>

								<Row className="mb-2">
									<Col md={6}>
										<p className="fs-5 m-0">Duenos del ejemplar:</p>
									</Col>
									<Col md={5}>
										<Form.Control placeholder="Nombre" />
									</Col>
									<Col md={1}>
										<div className="d-grid gap-2" type="submit">
											<Button variant="success" onClick={addPropietario}>
												<i className="fas fa-check"></i>
											</Button>
										</div>
									</Col>
								</Row>
								<Row className="my-3">
									<Table striped bordered hover variant="dark">
										<thead>
											<tr>
												<th>#</th>
												<th>Telefono</th>
												<th>Eliminar</th>
											</tr>
										</thead>
										<tbody>
											{propietarios.map((propietario, index) => {
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{propietario}</td>
														<td className="text-center">
															<Button variant="danger" className="px-4">
																<i className="fas fa-trash"></i>
															</Button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</Row>
								<Row className="mb-3">
									<Col xs={12} md={12}>
										<Form.Group>
											<p className="fs-5 mb-2">Informacion adicional</p>
											<Form.Control as="textarea" rows={6} />
										</Form.Group>
									</Col>
								</Row>
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
