import React, { useContext, useState } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react-router-bootstrap import
import { LinkContainer } from "react-router-bootstrap";

// import context
import { Context } from "../../store/appContext";

export const MainView = () => {
	// use context
	const { store, actions } = useContext(Context);

	return (
		<>
			{store.user.tipo_usuario.tu_nombre == "Administrador" && (
				<Container fluid>
					{/* Cards relacionadas a carreras */}
					<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
						<Col md={12}>
							<Card bg={"secondary"} text={"white"}>
								<Card.Body>
									<Card.Title className="m-0">
										Opciones relacionadas a las carreras
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Carreras</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de carreras. Para eliminar o
										modificar una carrera es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/">
											<Button variant="success">Crear nueva carrera</Button>
										</LinkContainer>
										<LinkContainer to="/">
											<Button variant="primary">Listar carreras</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Inscripciones a carreras
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de carreras. Para eliminar o
										modificar una carrera es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/">
											<Button variant="success">
												Registrar nueva inscripcion
											</Button>
										</LinkContainer>
										<LinkContainer to="/">
											<Button variant="primary">Listar inscipciones</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Ejemplares</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de ejemplares. Para eliminar o
										modificar un ejemplar es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/ejemplar-create">
											<Button variant="success">Crear nuevo ejemplar</Button>
										</LinkContainer>
										<LinkContainer to="/ejemplares">
											<Button variant="primary">Listar ejemplares</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Studs</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de studs. Para eliminar o modificar
										un ejemplar es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/stud-create">
											<Button variant="success">Crear stud</Button>
										</LinkContainer>
										<LinkContainer to="/studs">
											<Button variant="primary">Listar studs</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Propietarios</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de propietarios. Para eliminar o
										modificar un propietario es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/propietario-create">
											<Button variant="success">Crear propietario</Button>
										</LinkContainer>
										<LinkContainer to="/propietarios">
											<Button variant="primary">Listar propietarios</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Jinetes</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de jinetes. Para eliminar o
										modificar un jinete es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/jinete-create">
											<Button variant="success">Crear jinete</Button>
										</LinkContainer>
										<LinkContainer to="/jinetes">
											<Button variant="primary">Listar jinetes</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Entrenadores</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de entrenadores. Para eliminar o
										modificar un entrenador es necesario ver el listado. A la
										hora de crear un entrenador es necesario asignar el mismo a
										una caballeriza
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/entrenador-create">
											<Button variant="success">Crear entrenador</Button>
										</LinkContainer>
										<LinkContainer to="/entrenadores">
											<Button variant="primary">Listar entrenadores</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Veterinarios de cuadras
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de veterinarios. Para eliminar o
										modificar un veterianrio es necesario ver el listado. A la
										hora de crear un veterinario es necesario asignar el mismo a
										una caballeriza
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/veterinario-create">
											<Button variant="success">Crear veterinario</Button>
										</LinkContainer>
										<LinkContainer to="/veterinarios">
											<Button variant="primary">Listar veterinarios</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Implementos</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de implementos. Para eliminar o
										modificar un implemento es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/implemento-create">
											<Button variant="success">Crear implemento</Button>
										</LinkContainer>
										<LinkContainer to="/implementos">
											<Button variant="primary">Listar implementos</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Solicitudes implementos
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de implementos. Para eliminar o
										modificar un implemento es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/realizar-solicitud">
											<Button variant="success">Realizar solicitud</Button>
										</LinkContainer>
										<LinkContainer to="/solicitudes">
											<Button variant="primary">Listar solicitudes</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Heridas</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de jinetes. Para eliminar o
										modificar una herida es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/herida-create">
											<Button variant="success">Crear tipo de herida</Button>
										</LinkContainer>
										<LinkContainer to="/heridas">
											<Button variant="primary">Listar heridas</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Cards relacioandas a apuestas */}
					<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
						<Col md={12}>
							<Card bg={"secondary"} text={"white"}>
								<Card.Body>
									<Card.Title className="m-0">
										Opciones relacionadas a las apuestas
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Apuestas</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para las apuestas que se han realizado en el
										sistema. Para eliminar o actualizar una apuesta es necesario
										ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/users">
											<Button variant="primary">Registrar apuesta</Button>
										</LinkContainer>
										<LinkContainer to="/users">
											<Button variant="primary">Listar apuestas</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Cards relacioandas a usuarios */}
					<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
						<Col md={12}>
							<Card bg={"secondary"} text={"white"}>
								<Card.Body>
									<Card.Title className="m-0">
										Opciones relacionadas a los usuarios
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">Usuarios</Card.Header>
								<Card.Body>
									<Card.Text>Opciones para la gestion de usuarios</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/user-create">
											<Button variant="success">Crear usuario</Button>
										</LinkContainer>
										<LinkContainer to="/users">
											<Button variant="primary">Listar usuarios</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Actividades de usuarios
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para las actividades de los usuarios en el sistema
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/users">
											<Button variant="primary">Listar actividades</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Cards relacioandas a las ventas realizadas en el hipodromo */}
					<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
						<Col md={12}>
							<Card bg={"secondary"} text={"white"}>
								<Card.Body>
									<Card.Title className="m-0">
										Opciones relacionadas a las ventas dentro del hipodromo
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Ventas de entradas en taquilla
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de ventas de entradas
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/">
											<Button variant="primary">Registrar venta</Button>
										</LinkContainer>
										<LinkContainer to="/">
											<Button variant="primary">Listar ventas</Button>
										</LinkContainer>
										<LinkContainer to="/ajustar-precios">
											<Button variant="warning">Ajustar precios</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Venta en restaurantes
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de ventas realizadas en
										restaurantes.
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/users">
											<Button variant="primary">Registrar venta</Button>
										</LinkContainer>
										<LinkContainer to="/users">
											<Button variant="primary">Listar ventas</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{/* Cards relacioandas a la estructura e historia del hipodromo */}
					<Row xs={4} md={4} className="justify-content-md-center pt-4 px-4">
						<Col md={12}>
							<Card bg={"secondary"} text={"white"}>
								<Card.Body>
									<Card.Title className="m-0">
										Opciones relacionadas al hipodromo como entidad
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Historia del hipodromo
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de la informacion historica del
										hipodromo
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/historia">
											<Button variant="success">Actualizar informacion</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Ejemplares historicos
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion de ejemplares historicos. Para
										eliminar o modificar un ejemplar es necesario ver el listado
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/ejemplar-historico-create">
											<Button variant="success">Crear nuevo ejemplar</Button>
										</LinkContainer>
										<LinkContainer to="/ejemplares-historicos">
											<Button variant="primary">Listar ejemplares</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card bg={"dark"} text={"white"}>
								<Card.Header className="fs-5 fw-bold">
									Estructura del hipodromo
								</Card.Header>
								<Card.Body>
									<Card.Text>
										Opciones para la gestion del hipodromo. Aqui se actualiza
										los datos de la estrutura del hipodromo
									</Card.Text>
									<div className="d-grid gap-2">
										<LinkContainer to="/infraestructura">
											<Button variant="success">Actualizar informacion</Button>
										</LinkContainer>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};
