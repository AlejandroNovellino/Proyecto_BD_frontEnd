import React, { useContext, useState, useEffect } from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// import context
import { Context } from "../../store/appContext";

// table import
import DataTable from "react-data-table-component";

// react dom imports

export const TiposUsuarioList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	const [auxData, setAuxData] = useState([]);
	// fetch data
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

	const getCantidadPermisos = tipoUsuarioID => {
		return auxData.filter(
			element => element.tipo_usuario.tu_clave === tipoUsuarioID
		).length;
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
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={12}>
					<Card bg={"dark"} text={"white"} className="">
						<Card.Header className="fs-5 fw-bold">
							Lista de tipos de usuario en el sistema
						</Card.Header>
						<Card.Body>
							<DataTable
								columns={columns}
								data={data}
								pagination
								responsive
								highlightOnHover
								striped
								theme="dark"
								expandableRows
								expandableRowsComponent={ExpandedComponent}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
