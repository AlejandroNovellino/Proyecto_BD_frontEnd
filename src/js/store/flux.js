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
		},
	};
};

export default getState;
