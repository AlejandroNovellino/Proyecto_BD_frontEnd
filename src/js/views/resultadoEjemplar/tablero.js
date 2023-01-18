import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react router imports
import { useNavigate } from "react-router-dom";

export const Tablero = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [carreras, setCarreras] = useState([]);
	const [carrerasInfo, setCarrerasInfo] = useState({});

	// navigate hook
	let navigate = useNavigate();

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let info = {};
			let carreras = await actions.getCarrerasTablero();
			console.log(carreras);

			for (let carrera of carreras) {
				let inscripciones = await actions.getInscripcionesCarrera(
					carrera.c_clave
				);
				info[carrera.c_clave] = [];

				for (let inscripcion of inscripciones) {
					console.log(inscripcion);
					let resultado = await actions.getResultadoInscripcion(
						inscripcion.ins_clave
					);
					console.log(resultado);
					let entrenador = await actions.getEntrenadorEjemplar(
						inscripcion.binomio.ejemplar.fk_caballeriza
					);
					console.log(entrenador);

					info[carrera.c_clave].push({
						posicion_llegada: resultado.res_orden_llegada,
						numero_gualdrapa: inscripcion.ins_num_gualdrapa,
						ejemplar: inscripcion.binomio.ejemplar.e_nombre,
						posicion_partida: inscripcion.ins_num_gualdrapa,
						jinete: `${inscripcion.binomio.jinete.p_primer_nombre} ,${inscripcion.binomio.jinete.p_primer_apellido}`,
						peso_jinete: inscripcion.binomio.bi_jinete_peso,
						entrenador: entrenador
							? `${entrenador.p_primer_nombre} ,${entrenador.p_primer_apellido}`
							: "",
					});
				}
			}
			// set states
			setCarreras(carreras);
			setCarrerasInfo(info);
		};

		fetchData();

		return () => {};
	}, []);

	const columns = [
		{
			name: "NO. Llegada",
			selector: row => row.posicion_llegada,
			omit: true,
		},
		{
			name: "No.",
			selector: row => row.numero_gualdrapa,
			sortable: true,
		},
		{
			name: "Ejemplar",
			selector: row => row.ejemplar,
			sortable: true,
		},
		{
			name: "P.P",
			selector: row => row.posicion_partida,
			sortable: true,
		},
		{
			name: "Jinete",
			selector: row => row.jinete,
			sortable: true,
		},
		{
			name: "Kg. Jinete",
			selector: row => row.peso_jinete,
			sortable: true,
		},
		{
			name: "Entrenador",
			selector: row => row.entrenador,
			sortable: true,
		},
	];

	return (
		<>
			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						{carreras &&
							carreras.map((carrera, index) => {
								return (
									<Card bg={"dark"} text={"white"} className="" key={index}>
										<Card.Header className="fs-5 fw-bold">
											{carrera.c_nombre}
										</Card.Header>
										<Card.Body>
											<Container>
												<Row>
													<Col xs={4}>Fecha: {carrera.c_fecha}</Col>
													<Col xs={4}>Hora: {carrera.c_hora}</Col>
													<Col xs={4}>Num. Llamado {carrera.c_num_llamado}</Col>
												</Row>
												<Row>
													<Col xs={3}>
														Pull dinero total{carrera.c_pull_dinero_total}
													</Col>
													<Col xs={3}>Distancia{carrera.c_distancia}</Col>
													<Col xs={3}>
														Tipo Carrera{carrera.tipo_carrera.tc_nombre}
													</Col>
													<Col xs={3}>
														Categoria Carrera
														{carrera.categoria_carrera.ca_nombre}
													</Col>
												</Row>
											</Container>
											<DataTable
												columns={columns}
												data={carrerasInfo[carrera.c_clave]}
												pagination
												responsive
												highlightOnHover
												striped
												theme="dark"
											/>
										</Card.Body>
									</Card>
								);
							})}
					</Col>
				</Row>
			</Container>
		</>
	);
};
