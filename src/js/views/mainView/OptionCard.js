import React, { useContext, useState } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// react router imports
import { useNavigate, Link } from "react-router-dom";

// import context
import { Context } from "../../store/appContext";

export const OptionCard = props => {
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();

	return (
		<Card bg={"dark"} text={"white"}>
			<Card.Header className="fs-5 fw-bold">{props.cardTitle}</Card.Header>
			<Card.Body>
				<Card.Text>{props.cardText}</Card.Text>
				<div className="d-grid gap-2">
					{props?.permissions.map((element, index) => {
						return (
							<Button
								key={index}
								variant={element.color}
								onClick={e => {
									navigate(element.toURL, {
										...element?.navigateState,
									});
								}}>
								{element.buttonText}
							</Button>
						);
					})}
				</div>
			</Card.Body>
		</Card>
	);
};
