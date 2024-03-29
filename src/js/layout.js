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
import { SignIn } from "./views/signin";
//import { MainView } from "./views/mainView/MainView";
import { MainHome } from "./views/mainView/MainHome";
import { MainReports } from "./views/Reports/MainReports";
// ejemplares
import { CreateEjemplar } from "./views/ejemplares/createEjemplar";
import { UpdateEjemplar } from "./views/ejemplares/updateEjemplar";
import { EjemplaresList } from "./views/ejemplares/ejemplaresList";
import { EjemplaresUpdate } from "./views/ejemplares/ejemplaresUpdate";
import { EjemplaresDelete } from "./views/ejemplares/ejemplaresDelete";
// studs
import { CreateStud } from "./views/studs/createStud";
import { UpdateStud } from "./views/studs/updateStud";
import { StudsList } from "./views/studs/studsList";
import { StudsDelete } from "./views/studs/studsDelete";
import { StudsUpdate } from "./views/studs/studsUpdate";
// propietarios
import { CreatePropietario } from "./views/propietarios/createPropietario";
import { UpdatePropietario } from "./views/propietarios/updatePropietario";
import { PropietariosList } from "./views/propietarios/propietariosList";
import { PropietariosUpdate } from "./views/propietarios/propietariosUpdate";
import { PropietariosDelete } from "./views/propietarios/propietariosDelete";
// jinetes
import { CreateJinete } from "./views/jinetes/createJinete";
import { UpdateJinete } from "./views/jinetes/updateJinete";
import { JinetesList } from "./views/jinetes/jinetesList";
import { JinetesUpdate } from "./views/jinetes/jinetesUpdate";
import { JinetesDelete } from "./views/jinetes/jinetesDelete";
// entrenadores
import { CreateEntrenador } from "./views/entrenadores/createEntrenador";
import { UpdateEntrenador } from "./views/entrenadores/updateEntrenador";
import { EntrenadoresList } from "./views/entrenadores/entrenadoresList";
import { EntrenadoresUpdate } from "./views/entrenadores/entrenadoresUpdate";
import { EntrenadoresDelete } from "./views/entrenadores/entrenadoresDelete";
// historicos entrenadores
import { CreateHistoricoEntrenador } from "./views/entrenadores_historico/createHistoricoEntrenador";
import { DeleteHistoricoEntrenador } from "./views/entrenadores_historico/deleteHistoricoEntrenador";
// binomios
import { CreateBinomio } from "./views/binomios/createBinomio";
import { BinomiosList } from "./views/binomios/binomiosList";
import { BinomiosDelete } from "./views/binomios/binomiosDelete";
// carreras
import { CreateCarrera } from "./views/carreras/createCarrera";
import { UpdateCarrera } from "./views/carreras/updateCarrera";
import { CarrerasList } from "./views/carreras/carrerasList";
import { CarrerasUpdate } from "./views/carreras/carrerasUpdate";
import { CarrerasDelete } from "./views/carreras/carrerasDelete";
// inscripciones
import { AvailableBinomios } from "./views/inscripciones/availableBinomios";
import { InscripcionesList } from "./views/inscripciones/inscripcionesList";
// retiros
import { RetiroCreate } from "./views/retiros/retiroCreate";
import { RetirosList } from "./views/retiros/retirosList";
// resultados carrera
import { CarrerasCerrarList } from "./views/resultadoEjemplar/carrerasCerrarList";
import { CreateResultadosEjemplares } from "./views/resultadoEjemplar/createResultadosEjemplares";
import { Tablero } from "./views/resultadoEjemplar/tablero";
// tipo usuario
import { TipoUsuarioCreate } from "./views/tiposUsuario/tipoUsuarioCreate";
import { UpdateTipoUsuario } from "./views/tiposUsuario/updateTipoUsuario";
import { TiposUsuarioList } from "./views/tiposUsuario/tiposUsuarioList";
import { TiposUsuarioUpdate } from "./views/tiposUsuario/tiposUsuarioUpdate";
import { TiposUsuarioDelete } from "./views/tiposUsuario/tiposUsuarioDelete";
// usuario
import { CreateUsuario } from "./views/usuarios/createUsuario";
import { UsuariosList } from "./views/usuarios/usuariosList";
import { UsuariosDelete } from "./views/usuarios/usuariosDelete";
// tipo de apuesta
import { CreateTipoApuesta } from "./views/tipoApuesta/createTipoApuesta";
import { UpdateTipoApuesta } from "./views/tipoApuesta/updateTipoApuesta";
import { TiposApuestaList } from "./views/tipoApuesta/tipoApuestaList";
import { TiposApuestaUpdate } from "./views/tipoApuesta/tiposApuestaUpdate";
import { TiposApuestaDelete } from "./views/tipoApuesta/tiposApuestaDelete";
// apuesta
import { SelectTipoApuesta } from "./views/apuestas/selectTipoApuesta";
import { RealizarApuesta } from "./views/apuestas/realizarApuesta";
// gaceta
import { Gaceta } from "./views/gaceta/gaceta";
// veterinarios
import { CreateVeterinario } from "./views/veterinarios/createVeterinario";
import { VeterinariosList } from "./views/veterinarios/veterinariosList";
import { CreateImplemento } from "./views/implementos/createImplemento";
import { ImplementosList } from "./views/implementos/listImplementos";
import { CreateHerida } from "./views/heridas/createHerida";
import { HeridasList } from "./views/heridas/heridasList";
import { Historia } from "./views/hipodromo/historia";
import { Estructura } from "./views/hipodromo/estructura";
import { CreateEjemplarHistorico } from "./views/hipodromo/createEjemplarHistorico";
import { EjemplaresHistoricosList } from "./views/hipodromo/ejemplaresHistoricosList";
import { AjustarPrecios } from "./views/entradas/ajustarPrecios";
import { RealizarSolicitud } from "./views/implementos/realizarSolicitud";
import { SolicitudesList } from "./views/implementos/solicitudesList";

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
						<Route path="/signIn" element={<SignIn />} />
						{/*<Route path="/home" element={<MainView />} />*/}
						<Route path="/home" element={<MainHome />} />
						<Route path="/reports" element={<MainReports />} />
						{/* Ejemplares */}
						<Route path="/ejemplar/create" element={<CreateEjemplar />} />
						<Route path="/ejemplar/update" element={<UpdateEjemplar />} />
						<Route path="/ejemplares" element={<EjemplaresList />} />
						<Route path="/ejemplares/update" element={<EjemplaresUpdate />} />
						<Route path="/ejemplares/delete" element={<EjemplaresDelete />} />
						{/* studs */}
						<Route path="/stud/create" element={<CreateStud />} />
						<Route path="/stud/update" element={<UpdateStud />} />
						<Route path="/studs" element={<StudsList />} />
						<Route path="/studs/update" element={<StudsUpdate />} />
						<Route path="/studs/delete" element={<StudsDelete />} />
						{/* Propietarios */}
						<Route path="/propietario/create" element={<CreatePropietario />} />
						<Route path="/propietario/update" element={<UpdatePropietario />} />
						<Route path="/propietarios" element={<PropietariosList />} />
						<Route
							path="/propietarios/update"
							element={<PropietariosUpdate />}
						/>
						<Route
							path="/propietarios/delete"
							element={<PropietariosDelete />}
						/>
						{/* Jinetes */}
						<Route path="/jinete/create" element={<CreateJinete />} />
						<Route path="/jinete/update" element={<UpdateJinete />} />
						<Route path="/jinetes" element={<JinetesList />} />
						<Route path="/jinetes/update" element={<JinetesUpdate />} />
						<Route path="/jinetes/delete" element={<JinetesDelete />} />
						{/* Entrenadores */}
						<Route path="/entrenador/create" element={<CreateEntrenador />} />
						<Route path="/entrenador/update" element={<UpdateEntrenador />} />
						<Route path="/entrenadores" element={<EntrenadoresList />} />
						<Route
							path="/entrenadores/update"
							element={<EntrenadoresUpdate />}
						/>
						<Route
							path="/entrenadores/delete"
							element={<EntrenadoresDelete />}
						/>
						{/* Historico entrenador */}
						<Route
							path="/historico/entrenador/create"
							element={<CreateHistoricoEntrenador />}
						/>
						<Route
							path="/historicos/entrenadores/delete"
							element={<DeleteHistoricoEntrenador />}
						/>
						{/* Binomios */}
						<Route path="/binomio/create" element={<CreateBinomio />} />
						<Route path="/binomios" element={<BinomiosList />} />
						<Route path="/binomios/delete" element={<BinomiosDelete />} />
						{/* Carreras */}
						<Route path="/carrera/create" element={<CreateCarrera />} />
						<Route path="/carrera/update" element={<UpdateCarrera />} />
						<Route path="/carreras" element={<CarrerasList />} />
						<Route path="/carreras/update" element={<CarrerasUpdate />} />
						<Route path="/carreras/delete" element={<CarrerasDelete />} />
						{/* Inscripciones */}
						<Route
							path="/inscripcion/available/binomios"
							element={<AvailableBinomios />}
						/>
						<Route path="/inscripciones" element={<InscripcionesList />} />
						{/* Retiros */}
						<Route path="/retiro/create" element={<RetiroCreate />} />
						<Route path="/retiros" element={<RetirosList />} />
						{/* Resultados */}
						<Route
							path="/carreras/to/close/list"
							element={<CarrerasCerrarList />}
						/>
						<Route
							path="/create/resultados/ejemplares"
							element={<CreateResultadosEjemplares />}
						/>
						<Route path="/tablero/resultados" element={<Tablero />} />
						{/* TipoUsuario */}
						<Route
							path="/tipo/usuario/create"
							element={<TipoUsuarioCreate />}
						/>
						<Route
							path="/tipo/usuario/update"
							element={<UpdateTipoUsuario />}
						/>
						<Route path="/tipos/usuarios/" element={<TiposUsuarioList />} />
						<Route
							path="/tipos/usuario/update"
							element={<TiposUsuarioUpdate />}
						/>
						<Route
							path="/tipo/usuario/delete"
							element={<TiposUsuarioDelete />}
						/>
						{/* Apuesta */}
						<Route
							path="/select/tipo/apuesta"
							element={<SelectTipoApuesta />}
						/>
						<Route path="/realizar/apuesta" element={<RealizarApuesta />} />
						{/* Usuario */}
						<Route path="/usuario/create" element={<CreateUsuario />} />
						<Route path="/usuarios" element={<UsuariosList />} />
						<Route path="/usuarios/delete" element={<UsuariosDelete />} />
						{/* Tipo apuesta */}
						<Route
							path="/tipo/apuesta/create"
							element={<CreateTipoApuesta />}
						/>
						<Route
							path="/tipo/apuesta/update"
							element={<UpdateTipoApuesta />}
						/>
						<Route path="/tipos/apuesta" element={<TiposApuestaList />} />
						<Route
							path="/tipos/apuesta/update"
							element={<TiposApuestaUpdate />}
						/>
						<Route
							path="/tipos/apuesta/delete"
							element={<TiposApuestaDelete />}
						/>
						{/* Gaceta */}
						<Route path="/gaceta" element={<Gaceta />} />
						{/* Veterinarios */}
						<Route path="/veterinario-create" element={<CreateVeterinario />} />
						<Route path="/veterinarios" element={<VeterinariosList />} />
						<Route path="/implemento-create" element={<CreateImplemento />} />
						<Route path="/implementos" element={<ImplementosList />} />
						<Route path="/realizar-solicitud" element={<RealizarSolicitud />} />
						<Route path="/solicitudes" element={<SolicitudesList />} />
						<Route path="/herida-create" element={<CreateHerida />} />
						<Route path="/heridas" element={<HeridasList />} />
						<Route path="/historia" element={<Historia />} />
						<Route path="/infraestructura" element={<Estructura />} />
						<Route
							path="/ejemplar-historico-create"
							element={<CreateEjemplarHistorico />}
						/>
						<Route
							path="/ejemplares-historicos"
							element={<EjemplaresHistoricosList />}
						/>
						<Route path="/ajustar-precios" element={<AjustarPrecios />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
