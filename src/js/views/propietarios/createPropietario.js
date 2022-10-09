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

export const CreatePropietario = () => {
	// states
	let navigate = useNavigate();
	let numbers = ["0414-569-9922", "0416-569-5555"];
	// date picker
	const [dateValue, setDateValue] = React.useState();

	const returnHome = () => {
		navigate("/home");
	};

	const addNumber = () => {};

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Nuevo propietario
						</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos del nuevo propietario a registrar:
							</Card.Title>
							<Form>
								<Row className="mb-2">
									<Col xs={6} md={6}>
										<Form.Control placeholder="Nombre" />
									</Col>
									<Col xs={6} md={6}>
										<Form.Control placeholder="Apellido" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={6} md={6}>
										<Form.Control placeholder="Cedula identidad" />
									</Col>
									<Col xs={6} md={6}>
										<Form.Control placeholder="Correo electronico" />
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={6} md={6}>
										<p className="fs-5 m-0">Fecha de nacimiento:</p>
									</Col>
									<Col xs={6} md={6} className="text-white">
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												renderInput={props => <TextField {...props} />}
												label="DateTimePicker"
												value={dateValue}
												onChange={newValue => {
													setDateValue(newValue);
												}}
											/>
										</LocalizationProvider>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col md={6}>
										<p className="fs-5 m-0">Numero de telefono:</p>
									</Col>
									<Col md={5}>
										<Form.Control placeholder="Numero telefono" />
									</Col>
									<Col md={1}>
										<div className="d-grid gap-2" type="submit">
											<Button variant="success" onClick={addNumber}>
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
											{numbers.map((number, index) => {
												return (
													<tr key={index}>
														<td>{index}</td>
														<td>{number}</td>
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
								<Row className="mb-2">
									<Col>
										<p className="fs-5 m-0">Direccion de habitacion:</p>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col xs={4} md={4}>
										<Form.Select aria-label="Default select example">
											<option>Estado</option>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</Form.Select>
									</Col>
									<Col xs={4} md={4}>
										<Form.Select aria-label="Default select example">
											<option>Municipio</option>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</Form.Select>
									</Col>
									<Col xs={4} md={4}>
										<Form.Select aria-label="Default select example">
											<option>Parroquia</option>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</Form.Select>
									</Col>
								</Row>
								<Row className="mb-2">
									<Col md={12}>
										<Form.Control
											as="textarea"
											placeholder="Direccion"
											rows={3}
										/>
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
