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

// react date picker imports
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const CreateHerida = () => {
	// states
	let navigate = useNavigate();
	// date picker
	const [dateValue, setDateValue] = React.useState();

	const returnHome = () => {
		navigate("/home");
	};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">Nueva herida</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos de la herida a registrar:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col xs={3} md={3}>
										<Form.Control placeholder="Nombre" />
									</Col>
									<Col xs={3} md={3}>
										<Form.Control placeholder="Duracion en dias" />
									</Col>
									<Col xs={3} md={3}>
										<Form.Select>
											<option>Intensidad</option>
											<option value="1">Leve</option>
											<option value="2">Media</option>
											<option value="2">Grave</option>
										</Form.Select>
									</Col>
									<Col xs={3} md={3}>
										<Form.Select>
											<option>Viabilidad</option>
											<option value="1">Curable</option>
											<option value="2">Incurable</option>
										</Form.Select>
									</Col>
								</Row>
								<Row className="mb-3">
									<Col xs={12} md={12}>
										<p className="fs-5 m-0">Descripcion:</p>
									</Col>
									<Col xs={12} md={12}>
										<Form.Control as="textarea" rows={3} />
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
											<Button variant="success">Crear</Button>
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
