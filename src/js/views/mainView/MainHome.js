import React, { useContext, useState } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// react-router-bootstrap import
import { LinkContainer } from "react-router-bootstrap";

// import context
import { Context } from "../../store/appContext";

// OptionCard
import { OptionCard } from "./OptionCard";

// helper function
import { colorPicker, urlPicker, textPicker } from "./HelperFunctions";

export const MainHome = () => {
	// use context
	const { store, actions } = useContext(Context);

	// const used
	const raceRelated = [
		"Carrera",
		"Inscripcion",
		"Retiro",
		"Ejemplar",
		"Binomio",
		"Stud",
		"Propietario",
		"Jinete",
		"Entrenador",
		"Historico_Entrenador",
		"Veterinario",
		"Implemento",
		"Solicitud_Implemento",
		"Herida",
	];
	const betRelated = ["Apuesta"];
	const ticketRelated = [];
	const racecourseRelated = [];

	return (
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
			{/* Cards generados segun los permisos */}
			<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
				{raceRelated.map((element, index) => {
					if (Object.keys(store.userPermissions).includes(element)) {
						let permissions = store.userPermissions[element].map(accion => {
							return {
								color: colorPicker(accion),
								toURL: urlPicker(element, accion),
								accion: accion,
								buttonText: textPicker(accion),
							};
						});
						return (
							<Col key={index}>
								<OptionCard
									cardTitle={element}
									cardText={"Opciones disponible segun su rol de usuario"}
									permissions={permissions}
								/>
							</Col>
						);
					} else {
						return null;
					}
				})}
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
								Opciones para las apuestas que se han realizado en el sistema.
								Para eliminar o actualizar una apuesta es necesario ver el
								listado
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
								Opciones para la gestion de ventas realizadas en restaurantes.
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
								Opciones para la gestion de ejemplares historicos. Para eliminar
								o modificar un ejemplar es necesario ver el listado
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
								Opciones para la gestion del hipodromo. Aqui se actualiza los
								datos de la estrutura del hipodromo
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
	);
};
