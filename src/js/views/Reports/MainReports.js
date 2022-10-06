import React from "react";
import "../../../styles/index.css";

// react bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// react dom imports
import { Link } from "react-router-dom";

export const MainReports = () => {
	const reportsType = [
		"Report_1",
		"Report_2",
		"Report_3",
		"Report_4",
		"Report_5",
		"Report_6",
		"Report_7",
		"Report_8",
		"Report_9",
	];

	return (
		<Container fluid>
			<Row className="justify-content-md-center py-4">
				<Col xs={3} className="">
					<Card bg={"dark"} text={"white"} className="ms-3">
						<Card.Header className="fs-5 fw-bold">
							Lista de reportes disponibles
						</Card.Header>
						<Card.Body>
							{reportsType &&
								reportsType.map((report, i) => {
									return (
										<div className="d-grid gap-2 mb-3">
											<Button variant="primary">{report}</Button>
										</div>
									);
								})}
						</Card.Body>
					</Card>
				</Col>
				<Col xs={9}>
					<Card bg={"dark"} text={"white"} className="ms-3">
						<Card.Header className="fs-5 fw-bold">
							Reporte seleccionado: Report_1
						</Card.Header>
						<Card.Body>
							<Table striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>#</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Username</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Jacob</td>
										<td>Thornton</td>
										<td>@fat</td>
									</tr>
									<tr>
										<td>3</td>
										<td colSpan={2}>Larry the Bird</td>
										<td>@twitter</td>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
