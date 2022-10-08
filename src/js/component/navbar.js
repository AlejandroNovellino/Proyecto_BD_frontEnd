import React, { useContext } from "react";
import inh_logo from "../../img/inh_logo.png";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// react router imports
import { useNavigate } from "react-router-dom";

// react-router-bootstrap import
import { LinkContainer } from "react-router-bootstrap";

// import context
import { Context } from "../store/appContext";

export const MyNavbar = () => {
	// use context
	const { store, actions } = useContext(Context);
	let navigate = useNavigate();

	// function to close session
	const logOut = () => {
		actions.setToken("", null);
		navigate("/");
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<LinkContainer to="/home">
					<Navbar.Brand>
						<img
							alt=""
							src={inh_logo}
							width="50"
							height="30"
							className="d-inline-block align-top"
						/>{" "}
						Hipodromo
					</Navbar.Brand>
				</LinkContainer>

				{store.user && (
					<>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link>Gaceta Hipica</Nav.Link>
								<LinkContainer to="/reports">
									<Nav.Link>Reportes</Nav.Link>
								</LinkContainer>
							</Nav>
							<Nav>
								<NavDropdown
									title="Perfil"
									id="collasible-nav-dropdown"
									menuVariant="dark"
									align="end">
									<NavDropdown.Item>Tu perfil</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={logOut}>
										Cerrar sesion
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</>
				)}
			</Container>
		</Navbar>
	);
};
