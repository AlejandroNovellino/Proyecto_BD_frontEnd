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
	const userRelated = ["Tipo_Usuario", "Usuario"];
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
			{/* Cards generados segun los permisos para carreras*/}
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
			{/* Cards relacionadas a usuarios */}
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
			{/* Cards generados segun los permisos para usuarios*/}
			<Row xs={4} md={4} className="justify-content-md-center p-4 g-4">
				{userRelated.map((element, index) => {
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
		</Container>
	);
};
