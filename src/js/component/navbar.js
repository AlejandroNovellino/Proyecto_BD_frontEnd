import React from "react";
import { Link } from "react-router-dom";
import inh_logo from "../../img/inh_logo.png";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const MyNavbar = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">
					<img
						alt=""
						src={inh_logo}
						width="50"
						height="30"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};
