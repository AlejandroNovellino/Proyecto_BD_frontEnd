import React, { useContext, useState } from "react";
import "../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

// formik and yup import
import { Formik } from "formik";
import * as yup from "yup";

// react router imports
import { useNavigate, Link } from "react-router-dom";

// import context
import { Context } from "../store/appContext";

export const SignIn = () => {
	// use context
	const { store, actions } = useContext(Context);
	// navigate
	let navigate = useNavigate();

	const createUser = () => {
		actions.setUser("userForNow");
	};

	const returnMain = () => {
		navigate("/");
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
		u_fecha_registro: yup.date().default(() => new Date()),
		p_cedula: yup
			.number()
			.integer("Debe ser un numero")
			.positive("Solo puede ser positiva")
			.moreThan(1, "Debe ser mayor a 10")
			.lessThan(9999999999, "Debe poseer 10 numeros como maximo")
			.required("Es obligatorio"),
		p_primer_nombre: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		p_segundo_nombre: yup.string().max(20, "Longitud max 20 caracteres"),
		p_primer_apellido: yup
			.string()
			.max(20, "Longitud max 20 caracteres")
			.required("Es obligatorio"),
		p_segundo_apellido: yup.string().max(20, "Longitud max 20 caracteres"),
		p_sexo: yup
			.string()
			.oneOf(["M", "F"], "Sexo invalido")
			.required("Es obligatorio"),
		p_direccion: yup
			.string()
			.max(50, "Longitud max 50 caracteres")
			.required("Es obligatorio"),
		af_profesion: yup.string().max(30, "Longitud max 30 caracteres"),
		fk_lugar: yup.number().integer().positive().required("Es obligatorio"),
	});

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={8}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">Nuevo usuario</Card.Header>
						<Card.Body className="px-5">
							<Card.Title className="text-center py-3">
								Ingrese los datos solicitados:
							</Card.Title>

							<Formik
								validationSchema={schema}
								onSubmit={values => {
									console.log(values);
								}}
								initialValues={{
									u_correo_e: "",
									u_password: "",
									u_fecha_registro: null,
									p_cedula: null,
									p_primer_nombre: "",
									p_segundo_nombre: "",
									p_primer_apellido: "",
									p_segundo_apellido: "",
									p_sexo: "",
									p_direccion: "",
									af_profesion: "",
									fk_lugar: null,
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
											<Form.Group as={Col} md="6" controlId="u_correo_e">
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
											<Form.Group as={Col} md="6" controlId="u_password">
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
										{/* Primer y segundo nombre */}
										<Row className="mb-3">
											<Form.Group as={Col} md="6" controlId="p_primer_nombre">
												<Form.Label>Primer Nombre</Form.Label>
												<Form.Control
													type="text"
													name="p_primer_nombre"
													placeholder="Jhon"
													value={values.p_primer_nombre}
													onChange={handleChange}
													isValid={
														touched.p_primer_nombre && !errors.p_primer_nombre
													}
													isInvalid={!!errors.p_primer_nombre}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_primer_nombre}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="6" controlId="p_segundo_nombre">
												<Form.Label>Segundo nombre</Form.Label>
												<Form.Control
													type="text"
													name="p_segundo_nombre"
													placeholder="Smith"
													value={values.p_segundo_nombre}
													onChange={handleChange}
													isValid={
														touched.p_segundo_nombre && !errors.p_segundo_nombre
													}
													isInvalid={!!errors.p_segundo_nombre}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_segundo_nombre}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										{/* Primer y segundo apellido */}
										<Row className="mb-3">
											<Form.Group as={Col} md="6" controlId="p_primer_apellido">
												<Form.Label>Primer Apellido</Form.Label>
												<Form.Control
													type="text"
													name="p_primer_apellido"
													placeholder="Walker"
													value={values.p_primer_apellido}
													onChange={handleChange}
													isValid={
														touched.p_primer_apellido &&
														!errors.p_primer_apellido
													}
													isInvalid={!!errors.p_primer_apellido}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_primer_apellido}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group
												as={Col}
												md="6"
												controlId="p_segundo_apellido">
												<Form.Label>Segundo Apellido</Form.Label>
												<Form.Control
													type="text"
													name="p_segundo_apellido"
													placeholder="Wickings"
													value={values.p_segundo_apellido}
													onChange={handleChange}
													isValid={
														touched.p_segundo_apellido &&
														!errors.p_segundo_apellido
													}
													isInvalid={!!errors.p_segundo_apellido}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_segundo_apellido}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										{/* Cedula y genero */}
										<Row className="mb-3">
											<Form.Group as={Col} md="6" controlId="p_cedula">
												<Form.Label>Cedula Identidad</Form.Label>
												<Form.Control
													type="text"
													name="p_cedula"
													placeholder="Ej. 8908709"
													value={values.p_cedula}
													onChange={handleChange}
													isValid={touched.p_cedula && !errors.p_cedula}
													isInvalid={!!errors.p_cedula}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_cedula}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="6" controlId="p_sexo">
												<Form.Label>Genero</Form.Label>
												<Form.Select
													name="p_sexo"
													value={values.p_sexo}
													onChange={handleChange}
													isValid={touched.p_sexo && !errors.p_sexo}
													isInvalid={!!errors.p_sexo}>
													<option>Seleccione</option>
													<option value="F">Femenino</option>
													<option value="M">Masculino</option>
												</Form.Select>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_sexo}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										{/* Lugar y profesion */}
										<Row className="mb-3">
											<Form.Group as={Col} md="6" controlId="fk_lugar">
												<Form.Label>Lugar</Form.Label>
												<Form.Select
													name="fk_lugar"
													value={values.fk_lugar}
													onChange={handleChange}
													isValid={touched.fk_lugar && !errors.fk_lugar}
													isInvalid={!!errors.fk_lugar}>
													<option>Seleccione</option>
													<option value="F">Femenino</option>
													<option value="M">Masculino</option>
												</Form.Select>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.fk_lugar}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="6" controlId="af_profesion">
												<Form.Label>Profesion</Form.Label>
												<Form.Control
													type="text"
													name="af_profesion"
													placeholder="Etc"
													value={values.af_profesion}
													onChange={handleChange}
													isValid={touched.af_profesion && !errors.af_profesion}
													isInvalid={!!errors.af_profesion}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.af_profesion}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										{/* Direccion */}
										<Row className="mb-3">
											<Form.Group as={Col} md="12" controlId="p_direccion">
												<Form.Label>Direccion</Form.Label>
												<Form.Control
													as="textarea"
													name="p_direccion"
													placeholder="Direccion exacta"
													value={values.p_direccion}
													onChange={handleChange}
													isValid={touched.p_direccion && !errors.p_direccion}
													isInvalid={!!errors.p_direccion}
													rows={2}
												/>
												<Form.Control.Feedback>
													Todo bien!
												</Form.Control.Feedback>
												<Form.Control.Feedback type="invalid">
													{errors.p_direccion}
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										<Row className="px-3">
											<Col xs={6} className="ps-0">
												<div className="d-grid gap-2" type="submit">
													<Button variant="danger" onClick={returnMain}>
														Cancelar
													</Button>
												</div>
											</Col>
											<Col xs={6} className="pe-0">
												<div className="d-grid gap-2" type="submit">
													<Button type="submit" variant="primary">
														Crear
													</Button>
												</div>
											</Col>
										</Row>
									</Form>
								)}
							</Formik>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
