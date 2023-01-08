// axios import
const axios = require("axios").default;
const axiosInstance = axios.create({
	baseURL: "http://localhost:5000",
});
// uuid
const uuid = require("uuid");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			userPermissions: [],
			token: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setInfoFromStorage: (token, user, userPermissions) => {
				setStore({
					token,
					user,
					userPermissions,
				});
			},
			logOut: (token, user) => {
				// clear the store
				setStore({
					token,
					user: null,
					userPermissions: [],
				});

				// clear the local storage
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				localStorage.removeItem("userPermissions");
			},
			setUser: userForNow => {
				//get the store
				const store = getStore();
				//reset the global store
				setStore({
					...store,
					user: userForNow,
				});
			},
			logIn: async (email, password) => {
				try {
					const response = await axiosInstance.post("/login", {
						u_correo_e: email,
						u_password: password,
					});

					setStore({
						token: uuid.v4(),
						user: JSON.parse(response.data),
					});

					return true;
				} catch (error) {
					return null;
				}
			},
			getPermissions: async userTypeId => {
				try {
					const response = await axiosInstance.get(
						"/permisos-tipo-usuario/" + userTypeId
					);
					//get the store
					const store = getStore();
					//reset the global store
					setStore({
						...store,
						userPermissions: JSON.parse(response.data),
					});

					return true;
				} catch (error) {
					return null;
				}
			},
			updateLocalStorage: () => {
				// get the store
				const store = getStore();

				// save the info in the local storage
				localStorage.setItem("token", store.token);
				localStorage.setItem("user", JSON.stringify(store.user));
				localStorage.setItem(
					"userPermissions",
					JSON.stringify(store.userPermissions)
				);
			},
			//Entrenador -----------------------------------------------------------------------------------
			getEntrenadores: async () => {
				try {
					const response = await axiosInstance.get("/entrenadores");
					// return the data

					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createEntrenador: async values => {
				try {
					const response = await axiosInstance.post("/entrenadores", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			updateEntrenador: async values => {
				try {
					let { p_cedula, ...data } = values;
					const response = await axiosInstance.put(
						"/entrenadores/" + p_cedula,
						{
							...data,
						}
					);

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteEntrenador: async entrenador_id => {
				try {
					const response = await axiosInstance.delete(
						"/entrenadores/" + entrenador_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//Jinete -----------------------------------------------------------------------------------
			getJinetes: async () => {
				try {
					const response = await axiosInstance.get("/jinetes");

					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createJinete: async values => {
				try {
					const response = await axiosInstance.post("/jinetes", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			updateJinete: async values => {
				try {
					let { p_cedula, ...data } = values;
					const response = await axiosInstance.put("/jinetes/" + p_cedula, {
						...data,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteJinete: async element_id => {
				try {
					const response = await axiosInstance.delete("/jinetes/" + element_id);

					return true;
				} catch (error) {
					return false;
				}
			},
			//Lugares -----------------------------------------------------------------------------------
			getLugaresByType: async () => {
				try {
					const response = await axiosInstance.get("/lugares");
					// get data
					let lugares = response.data;

					let estados = lugares.filter(lugar => lugar.l_tipo == "Estado");
					let municipios = lugares.filter(lugar => lugar.l_tipo == "Municipio");
					let parroquias = lugares.filter(lugar => lugar.l_tipo == "Parroquia");

					return {
						estados,
						municipios,
						parroquias,
					};
				} catch (error) {
					return {};
				}
			},
			//Historico entrenador -----------------------------------------------------------------------------------
			createHistoricoEntrenador: async values => {
				try {
					const response = await axiosInstance.post(
						"/historicos/entrenadores",
						{
							...values,
						}
					);

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			getHistoricoEntrenador: async () => {
				try {
					const response = await axiosInstance.get("/historicos/entrenadores");
					// get data
					return response.data.map(element => {
						let jsonElement = JSON.parse(element);
						return {
							...jsonElement,
							he_activo: jsonElement.he_activo ? "Activo" : "Inactivo",
						};
					});
				} catch (error) {
					return {};
				}
			},
			deleteHistoricoEntrenador: async historico_id => {
				try {
					const response = await axiosInstance.delete(
						"/historico/entrenador/" + historico_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			// Stud -----------------------------------------------------------------------------------
			getStuds: async () => {
				try {
					const response = await axiosInstance.get("/studs");
					// return the data

					return response.data;
				} catch (error) {
					return [];
				}
			},
			createStud: async values => {
				try {
					const response = await axiosInstance.post("/studs", {
						...values,
					});

					return response.data;
				} catch (error) {
					return null;
				}
			},
			updateStud: async values => {
				try {
					let { s_clave, ...data } = values;
					const response = await axiosInstance.put("/studs/" + s_clave, {
						...data,
					});

					return response.data;
				} catch (error) {
					return null;
				}
			},
			deleteStud: async stud_id => {
				try {
					const response = await axiosInstance.delete("/studs/" + stud_id);

					return true;
				} catch (error) {
					return false;
				}
			},
			getColores: async () => {
				try {
					const response = await axiosInstance.get("/colors");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			//Propietarios -----------------------------------------------------------------------------------
			getPropietarios: async () => {
				try {
					const response = await axiosInstance.get("/propietarios");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createPropietario: async values => {
				try {
					const response = await axiosInstance.post("/propietarios", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			updatePropietario: async values => {
				try {
					let { p_cedula, ...data } = values;
					const response = await axiosInstance.put(
						"/propietarios/" + p_cedula,
						{
							...data,
						}
					);

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deletePropietario: async propietario_id => {
				try {
					const response = await axiosInstance.delete(
						"/propietarios/" + propietario_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//StudPropietario -----------------------------------------------------------------------------------
			createStudPropietario: async values => {
				try {
					const response = await axiosInstance.post("/propietarios/studs", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			//StudColor -----------------------------------------------------------------------------------
			createStudColor: async values => {
				try {
					const response = await axiosInstance.post("/colores/studs", {
						...values,
					});

					return response.data;
				} catch (error) {
					return null;
				}
			},
			//Haras -----------------------------------------------------------------------------------
			getHaras: async () => {
				try {
					const response = await axiosInstance.get("/haras");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			//Caballerizas -----------------------------------------------------------------------------------
			getCaballerizas: async () => {
				try {
					const response = await axiosInstance.get("/caballerizas");
					// get data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return {};
				}
			},
			//Puestos -----------------------------------------------------------------------------------
			getCaballerizaPuestos: async caballeriza_id => {
				try {
					const response = await axiosInstance.get(
						"/puestos/" + caballeriza_id
					);
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//Ejemplares -----------------------------------------------------------------------------------
			getEjemplares: async () => {
				try {
					const response = await axiosInstance.get("/ejemplares");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createEjemplares: async values => {
				try {
					const response = await axiosInstance.post("/ejemplares", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			updateEjemplar: async values => {
				try {
					let { e_tatuaje_labial, ...data } = values;
					const response = await axiosInstance.put(
						"/ejemplares/" + e_tatuaje_labial,
						{
							...data,
						}
					);

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteEjemplar: async ejemplar_id => {
				try {
					const response = await axiosInstance.delete(
						"/ejemplares/" + ejemplar_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//Historico puesto -----------------------------------------------------------------------------------
			getHistoricoPuesto: async () => {
				try {
					const response = await axiosInstance.get("/historicos/puestos");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			updateHistoricoPuesto: async puesto_id => {
				try {
					const response = await axiosInstance.put(
						"/historico/puesto/" + puesto_id,
						{}
					);

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			createHistoricoPuesto: async values => {
				try {
					const response = await axiosInstance.post("/historicos/puestos", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteHistoricoPuesto: async element_id => {
				try {
					const response = await axiosInstance.delete(
						"/historico/puesto/" + element_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//Binomios -----------------------------------------------------------------------------------
			getBinomios: async () => {
				try {
					const response = await axiosInstance.get("/binomios");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createBinomios: async values => {
				try {
					const response = await axiosInstance.post("/binomios", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteBinomio: async binomio_id => {
				try {
					const response = await axiosInstance.delete(
						"/binomios/" + binomio_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//Carreras -----------------------------------------------------------------------------------
			getCarreras: async () => {
				try {
					const response = await axiosInstance.get("/carreras");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createCarrera: async values => {
				try {
					const response = await axiosInstance.post("/carreras", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			updateCarrera: async values => {
				try {
					let { c_clave, ...data } = values;
					const response = await axiosInstance.put("/carreras/" + c_clave, {
						...data,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			deleteCarrera: async carrera_id => {
				try {
					const response = await axiosInstance.delete(
						"/carreras/" + carrera_id
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//get numero de llamada -----------------------------------------------------------------------------------
			getNumLlamadoCarrera: async date => {
				try {
					const response = await axiosInstance.get(
						"/carrera/cun/llamado/" + date
					);
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//TipoCarrera -----------------------------------------------------------------------------------
			getTipoCarrera: async () => {
				try {
					const response = await axiosInstance.get("/tipos/carrera");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//CategoriaCarrera -----------------------------------------------------------------------------------
			getCategoriaCarrera: async () => {
				try {
					const response = await axiosInstance.get("/categorias/carrera");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			//Pista -----------------------------------------------------------------------------------
			getPista: async () => {
				try {
					const response = await axiosInstance.get("/pistas");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//PorcentajeDividendo -----------------------------------------------------------------------------------
			getPorcentajeDividendo: async () => {
				try {
					const response = await axiosInstance.get("/porcentajes/dividendo");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//PorcentajeDividendo -----------------------------------------------------------------------------------
			createCarreraPorcentajeDividendo: async data => {
				try {
					const response = await axiosInstance.post(
						"/carrera/porcentaje/dividendo",
						{
							...data,
						}
					);
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			//Inscripciones -----------------------------------------------------------------------------------
			getVictories: async ejemplar_id => {
				try {
					const response = await axiosInstance.get("/victories/" + ejemplar_id);
					// return the data
					return JSON.parse(response.data);
				} catch (error) {
					return [];
				}
			},
			getEjemplarBinomiosVictories: async _ => {
				try {
					const response = await axiosInstance.get("/ejemplares/victories");
					// return the data
					return JSON.parse(response.data);
				} catch (error) {
					return [];
				}
			},
			getCarrerasForEjemplar: async (
				ejemplar_id,
				ejemplar_age,
				ejemplar_wins
			) => {
				try {
					const response = await axiosInstance.get(
						`/carreras/ejemplar/${ejemplar_id}/${ejemplar_age}/${ejemplar_wins}`
					);
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createInscripcion: async values => {
				try {
					const response = await axiosInstance.post("/inscripciones", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			getInscripciones: async () => {
				try {
					const response = await axiosInstance.get("/inscripciones");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			getInscripcionesActivas: async () => {
				try {
					const response = await axiosInstance.get("/inscripciones/activas");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			getCausasRetiro: async () => {
				try {
					const response = await axiosInstance.get("/causas/retiros");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			getRetiros: async () => {
				try {
					const response = await axiosInstance.get("/retiros");
					// return the data
					return response.data.map(element => {
						return JSON.parse(element);
					});
				} catch (error) {
					return [];
				}
			},
			createRetiro: async values => {
				try {
					const response = await axiosInstance.post("/retiros", {
						...values,
					});

					return JSON.parse(response.data);
				} catch (error) {
					return null;
				}
			},
			//Acciones -----------------------------------------------------------------------------------
			getAcciones: async () => {
				try {
					const response = await axiosInstance.get("/acciones");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			//TipoUsuario -----------------------------------------------------------------------------------
			getTiposUsuarios: async () => {
				try {
					const response = await axiosInstance.get("/tipos-usuarios");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			createTipoUsuario: async values => {
				try {
					const response = await axiosInstance.post("/tipos-usuarios", {
						...values,
					});

					return response.data;
				} catch (error) {
					return null;
				}
			},
			updateTipoUsuario: async values => {
				try {
					let { tu_clave, ...data } = values;
					const response = await axiosInstance.put(
						"/tipos-usuarios/" + tu_clave,
						{
							...data,
						}
					);

					return response.data;
				} catch (error) {
					return null;
				}
			},
			deleteTipoUsuario: async tu_clave => {
				try {
					const response = await axiosInstance.delete(
						"/tipos-usuarios/" + tu_clave
					);

					return true;
				} catch (error) {
					return false;
				}
			},
			//AccionTipoUsuario -----------------------------------------------------------------------------------
			getAccionesTipoUsuario: async () => {
				try {
					const response = await axiosInstance.get("/acciones/tipo/usuario");
					// return the data
					return response.data;
				} catch (error) {
					return [];
				}
			},
			createAccionTipoUsuario: async values => {
				try {
					const response = await axiosInstance.post("/acciones/tipo/usuario", {
						...values,
					});

					return response.data;
				} catch (error) {
					return null;
				}
			},
		},
	};
};

export default getState;
