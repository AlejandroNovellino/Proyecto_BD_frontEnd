import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import "../styles/index.css";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { MyNavbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./views/login";
import { MainView } from "./views/mainView/MainView";
import { MainReports } from "./views/Reports/MainReports";
import { UserList } from "./views/usersAdm/userList";
import { CreateUser } from "./views/usersAdm/createUser";
import { CreateEjemplar } from "./views/ejemplares/createEjemplar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="mainBackgroundColor">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<MyNavbar />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={<MainView />} />
						<Route path="/reports" element={<MainReports />} />
						<Route path="/users" element={<UserList />} />
						<Route path="/user-create" element={<CreateUser />} />
						<Route path="/ejemplar-create" element={<CreateEjemplar />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
