import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react router imports
import { useNavigate } from "react-router-dom";

export const CreateEjemplar = () => {
	// states
	let navigate = useNavigate();
	const studs = ["stud_1", "stud_2", "stud_3"];
	const propietarios = [
		{
			name: "propietario_1",
			selected: false,
			porcentaje: 0,
		},
		{
			name: "propietario_2",
			selected: false,
			porcentaje: 0,
		},
		{
			name: "propietario_3",
			selected: false,
			porcentaje: 0,
		},
	];

	const returnHome = () => {
		navigate("/home");
	};
	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">Nuevo ejemplar</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos del nuevo ejemplar a registrar:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col>
										<Form.Control placeholder="Nombre" />
									</Col>
									<Col>
										<Form.Control placeholder="Numero de pelaje labial" />
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
										<Form.Control placeholder="Nombre del padre" />
									</Col>
									<Col>
										<Form.Control placeholder="Nombre de la madre" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={6}>
										<Form.Control placeholder="Numero de caballeriza" />
									</Col>
									<Col xs={6}>
										<Form.Control placeholder="Puesto en la caballeriza" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={6}>
										<p class="text-end fs-5 mt-2">Elija un stud:</p>
									</Col>
									<Col xs={6}>
										<Form.Select>
											{studs.map((stud, index) => {
												return (
													<option key={index} value={index}>
														{stud}
													</option>
												);
											})}
										</Form.Select>
									</Col>
								</Row>
								<Row className="justify-content-md-center mb-2">
									<Col xs={12}>
										<p class="text-center fs-5 mt-2">
											Elija los propietarios y su porcentaje de posesion:
										</p>
									</Col>
								</Row>
								{propietarios.map((propietario, index) => {
									return (
										<Row key={index} className="justify-content-md-center mb-2">
											<Col xs={4}>
												<Form.Check
													type="switch"
													id={index}
													label={propietario?.name}
												/>
											</Col>
											<Col xs={4}>
												<Form.Control placeholder="Porcentaje de pertenencia" />
											</Col>
										</Row>
									);
								})}
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
