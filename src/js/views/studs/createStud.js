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

export const CreateStud = () => {
	// states
	let navigate = useNavigate();
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
						<Card.Header className="fs-5 fw-bold">Nuevo stud</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos del nuevo stud a registrar:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col>
										<Form.Control placeholder="Nombre" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col md={12}>
										<p className="text-start fs-5 ">
											Descripcion de los colores de la chaquetilla:
										</p>
									</Col>

									<Col>
										<Form.Control as="textarea" rows={3} />
									</Col>
								</Row>
								<Row className="justify-content-md-center mb-2">
									<Col xs={12}>
										<p className="text-start fs-5 mt-2">
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

							<Container className="mt-4">
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
