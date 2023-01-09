import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react router imports
import { useNavigate } from "react-router-dom";

export const TiposUsuarioUpdate = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [auxData, setAuxData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	// alert state
	const [alertShow, setAlertShow] = useState(false);

	// navigate hook
	let navigate = useNavigate();

	// get entrenadores when component is mounted
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getTiposUsuarios();
			setData(data);

			data = await actions.getAccionesTipoUsuario();
			setAuxData(data);
		};

		fetchData();

		return () => {};
	}, []);

	// handle select in the table
	const handleSelect = ({ selectedRows }) => {
		// action to do when an element is selected
		setSelectedRows(selectedRows);
	};

	const getCantidadPermisos = tipoUsuarioID => {
		return auxData.filter(
			element => element.tipo_usuario.tu_clave === tipoUsuarioID
		).length;
	};

	// handle update
	const handleUpdate = () => {
		console.log(selectedRows);
		if (selectedRows.length) {
			// navigate to UpdateEntrenador
			navigate("/tipo/usuario/update", {
				state: {
					tipoUsuario: selectedRows[0],
					permisos: auxData.filter(
						element =>
							element.tipo_usuario.tu_clave === selectedRows[0].tu_clave
					),
				},
			});
		} else {
			setAlertShow(true);
		}
	};

	const columns = [
		{
			name: "Nombre",
			selector: row => row.tu_nombre,
			sortable: true,
		},
		{
			name: "Cantidad de permisos",
			selector: row => getCantidadPermisos(row.tu_clave),
			sortable: true,
		},
	];

	const ExpandedComponent = ({ data }) => {
		let userActions = auxData.filter(
			element => element.tipo_usuario.tu_clave === data.tu_clave
		);

		const miniColumns = [
			{
				name: "Tabla",
				selector: row => row.accion.acc_tabla_objetivo,
				sortable: true,
			},
			{
				name: "Accion",
				selector: row => row.accion.acc_nombre,
				sortable: true,
			},
		];

		return (
			<Container className="p-3">
				<DataTable
					columns={miniColumns}
					data={userActions}
					responsive
					highlightOnHover
					striped
				/>
			</Container>
		);
	};

	return (
		<>
			{alertShow && (
				<Container className="mt-5">
					<Alert
						variant="danger"
						onClose={() => setAlertShow(false)}
						dismissible>
						<Alert.Heading>No se selecciono un elemento!</Alert.Heading>
						<p>Debe seleccionar un elemento para ser actualizado</p>
					</Alert>
				</Container>
			)}

			<Container fluid>
				<Row className="justify-content-md-center py-4">
					<Col xs={12}>
						<Card bg={"dark"} text={"white"} className="">
							<Card.Header className="fs-5 fw-bold">
								Lista de ejemplares en el sistema
							</Card.Header>
							<Card.Body>
								<DataTable
									columns={columns}
									data={data}
									selectableRows
									pagination
									responsive
									highlightOnHover
									striped
									selectableRowsNoSelectAll
									selectableRowsSingle
									onSelectedRowsChange={handleSelect}
									theme="dark"
									expandableRows
									expandableRowsComponent={ExpandedComponent}
								/>
							</Card.Body>
							<Card.Footer>
								<Container className="p-0">
									<Row>
										<Col xs={6} className="ps-0">
											<div className="d-grid gap-2" type="submit">
												<Button
													variant="secondary"
													onClick={() => navigate(-1)}>
													Cancelar
												</Button>
											</div>
										</Col>
										<Col xs={6} className="pe-0">
											<div className="d-grid gap-2" type="submit">
												<Button variant="warning" onClick={handleUpdate}>
													Actualizar
												</Button>
											</div>
										</Col>
									</Row>
								</Container>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
