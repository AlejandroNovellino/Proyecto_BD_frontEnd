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
import { EjemplaresList } from "./views/ejemplares/ejemplaresList";
import { CreateStud } from "./views/studs/createStud";
import { StudList } from "./views/studs/studList";
import { CreatePropietario } from "./views/propietarios/createPropietario";
import { PropietariosList } from "./views/propietarios/propietariosList";
import { CreateJinete } from "./views/jinetes/createJinete";
import { JinetesList } from "./views/jinetes/jinetesList";
import { CreateEntrenador } from "./views/entrenadores/createEntrenador";
import { EntrenadoresList } from "./views/entrenadores/entrenadoresList";
import { CreateVeterinario } from "./views/veterinarios/createVeterinario";
import { VeterinariosList } from "./views/veterinarios/veterinariosList";
import { CreateImplemento } from "./views/implementos/createImplemento";
import { ImplementosList } from "./views/implementos/listImplementos";
import { CreateHerida } from "./views/heridas/createHerida";
import { HeridasList } from "./views/heridas/heridasList";

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
						<Route path="/ejemplares" element={<EjemplaresList />} />
						<Route path="/stud-create" element={<CreateStud />} />
						<Route path="/studs" element={<StudList />} />
						<Route path="/propietario-create" element={<CreatePropietario />} />
						<Route path="/propietarios" element={<PropietariosList />} />
						<Route path="/jinete-create" element={<CreateJinete />} />
						<Route path="/jinetes" element={<JinetesList />} />
						<Route path="/entrenador-create" element={<CreateEntrenador />} />
						<Route path="/entrenadores" element={<EntrenadoresList />} />
						<Route path="/veterinario-create" element={<CreateVeterinario />} />
						<Route path="/veterinarios" element={<VeterinariosList />} />
						<Route path="/implemento-create" element={<CreateImplemento />} />
						<Route path="/implementos" element={<ImplementosList />} />
						<Route path="/herida-create" element={<CreateHerida />} />
						<Route path="/heridas" element={<HeridasList />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
