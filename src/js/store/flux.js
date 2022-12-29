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
			setToken: (token, user) => {
				setStore({
					token,
					user: JSON.parse(user),
				});
			},
			logOut: (token, user) => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setStore({
					token,
					user: JSON.parse(user),
				});
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
						userPermissions: response.data,
					});

					return true;
				} catch (error) {
					return null;
				}
			},
		},
	};
};

export default getState;
