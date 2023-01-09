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

export const UsuariosList = () => {
	// use context
	const { store, actions } = useContext(Context);
	// state
	const [data, setData] = useState([]);
	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			let data = await actions.getUsuarios();
			setData(data);
		};

		fetchData();

		return () => {};
	}, []);

	const columns = [
		{
			name: "Clave",
			selector: row => row.u_clave,
			omit: true,
		},
		{
			name: "Correo",
			selector: row => row.u_correo_e,
			sortable: true,
		},
		{
			name: "Tipo usuario",
			selector: row => row.tipo_usuario.tu_nombre,
			sortable: true,
		},
	];

	return (
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
								pagination
								responsive
								highlightOnHover
								striped
								theme="dark"
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
