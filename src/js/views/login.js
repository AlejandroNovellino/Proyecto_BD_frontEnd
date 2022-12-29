import React, { useContext, useState } from "react";
import "../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// react router imports
import { useNavigate, Link } from "react-router-dom";

// import context
import { Context } from "../store/appContext";
import { style } from "@mui/system";

export const Login = () => {
	// use context
	const { store, actions } = useContext(Context);
	// alert state
	const [show, setShow] = useState(false);
	// navigate
	let navigate = useNavigate();

	const manageLoginClick = async values => {
		//console.log(values);
		let response = await actions.logIn(values.u_correo_e, values.u_password);
		if (!response) {
			setShow(true);
		} else {
			let response = await actions.getPermissions(
				store.user?.tipo_usuario?.tu_clave
			);
			if (response) {
				navigate("/home");
			}
		}
	};

	// validator for data
	const schema = yup.object({
		u_correo_e: yup
			.string()
			.email()
			.max(45, "Longitud max 45 caracteres")
			.required("Es obligatorio"),
		u_password: yup
			.string()
			.max(45, "Longitud max 16 caracteres")
			.trim()
			.required("Es obligatorio"),
	});

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={6}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Body>
							<Card.Title className="text-center py-3">
								Bienvenido al sistema del hipodromo
							</Card.Title>
							<Formik
								validationSchema={schema}
								onSubmit={values => {
									manageLoginClick(values);
								}}
								initialValues={{
									u_correo_e: "",
									u_password: "",
								}}>
								{({
									handleSubmit,
									handleChange,
									handleBlur,
									values,
									touched,
									isValid,
									errors,
								}) => (
									<Form noValidate onSubmit={handleSubmit}>
										{/* Correo y contrasena */}
										<Row className="mb-3">
											<Form.Group as={Col} md="12" controlId="u_correo_e">
												<Form.Label>Correo</Form.Label>
												<Form.Control
													type="text"
													name="u_correo_e"
													placeholder="example@gmail.com"
													value={values.u_correo_e}
													onChange={handleChange}
													isValid={touched.u_correo_e && !errors.u_correo_e}
													isInvalid={!!errors.u_correo_e}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.u_correo_e}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										<Row>
											<Form.Group as={Col} md="12" controlId="u_password">
												<Form.Label>Contrasena</Form.Label>
												<Form.Control
													type="password"
													name="u_password"
													placeholder="Longitud max 45"
													value={values.u_password}
													onChange={handleChange}
													isValid={touched.u_password && !errors.u_password}
													isInvalid={!!errors.u_password}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.u_password}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										<Row className="px-3 mt-3">
											<Col xs={12} className="px-0">
												<div className="d-grid gap-2" type="submit">
													<Button type="submit" variant="primary">
														Ingresar
													</Button>
												</div>
											</Col>
										</Row>
									</Form>
								)}
							</Formik>
						</Card.Body>
						<Card.Footer className="text-muted">
							<Row>
								<Col md={6}>
									<p>No posee cuenta?</p>
								</Col>
								<Col md={6}>
									<Link to="/signIn">
										<div className="d-grid gap-2" type="submit">
											<Button variant="secondary">Registrarse</Button>
										</div>
									</Link>
								</Col>
								<Col md={12}>
									<Link to="/home">
										<div className="d-grid gap-2" type="submit">
											<Button variant="danger" onClick={manageLoginClick}>
												PRUEBA
											</Button>
										</div>
									</Link>
								</Col>
							</Row>
							<Row className="px-3 pt-4">
								{show && (
									<Alert
										variant="danger"
										onClose={() => setShow(false)}
										dismissible>
										<Alert.Heading>Oh no! Hay un error!</Alert.Heading>
										<p>Combinacion correo-clave erronea</p>
									</Alert>
								)}
							</Row>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
