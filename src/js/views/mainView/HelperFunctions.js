export const colorPicker = accion => {
	switch (accion) {
		case "CREATE":
			return "success";

		case "READ":
			return "primary";

		case "UPDATE":
			return "warning";

		case "DELETE":
			return "danger";

		default:
			return "light";
	}
};

export const textPicker = accion => {
	switch (accion) {
		case "CREATE":
			return "Crear";

		case "READ":
			return "Listar";

		case "UPDATE":
			return "Actualizar";

		case "DELETE":
			return "Eliminar";

		default:
			return "light";
	}
};

export const urlPicker = (tabla, accion) => {
	// race options -------------------------------------------------------------------------------------
	switch (tabla) {
		case "Entrenador":
			switch (accion) {
				case "CREATE":
					return "/entrenador/create";

				case "READ":
					return "/entrenadores";

				case "UPDATE":
					return "/entrenadores/update";

				case "DELETE":
					return "/entrenadores/delete";

				default:
					return "/entrenadores";
			}

		case "Historico_Entrenador":
			switch (accion) {
				case "CREATE":
					return "/historico/entrenador/create";

				case "DELETE":
					return "/historicos/entrenadores/delete";

				default:
					return "/home";
			}

		case "Jinete":
			switch (accion) {
				case "CREATE":
					return "/jinete/create";

				case "READ":
					return "/jinetes";

				case "UPDATE":
					return "/jinetes/update";

				case "DELETE":
					return "/jinetes/delete";

				default:
					return "/jinetes";
			}

		case "Propietario":
			switch (accion) {
				case "CREATE":
					return "/propietario/create";

				case "READ":
					return "/propietarios";

				case "UPDATE":
					return "/propietarios/update";

				case "DELETE":
					return "/propietarios/delete";

				default:
					return "/propietarios";
			}

		case "Stud":
			switch (accion) {
				case "CREATE":
					return "/stud/create";

				case "READ":
					return "/studs";

				case "UPDATE":
					return "/studs/update";

				case "DELETE":
					return "/studs/delete";

				default:
					return "/studs";
			}

		case "Ejemplar":
			switch (accion) {
				case "CREATE":
					return "/ejemplar/create";

				case "READ":
					return "/ejemplares";

				case "UPDATE":
					return "/ejemplares/update";

				case "DELETE":
					return "/ejemplares/delete";

				default:
					return "/ejemplares";
			}

		case "Binomio":
			switch (accion) {
				case "CREATE":
					return "/binomio/create";

				case "READ":
					return "/binomios";

				case "DELETE":
					return "/binomios/delete";

				default:
					return "/binomios";
			}

		case "Carrera":
			switch (accion) {
				case "CREATE":
					return "/carrera/create";

				case "READ":
					return "/carreras";

				case "UPDATE":
					return "/carreras/update";

				case "DELETE":
					return "/carreras/delete";

				default:
					return "/carreras";
			}

		case "Inscripcion":
			switch (accion) {
				case "CREATE":
					return "/inscripcion/available/binomios";

				case "READ":
					return "/inscripciones";

				default:
					return "";
			}

		case "Retiro":
			switch (accion) {
				case "CREATE":
					return "/retiro/create";

				case "READ":
					return "/retiros";

				default:
					return "";
			}

		// user options -------------------------------------------------------------------------------------
		case "Tipo_Usuario":
			switch (accion) {
				case "CREATE":
					return "/tipo/usuario/create";

				case "READ":
					return "/tipos/usuarios";

				case "UPDATE":
					return "/tipos/usuario/update";

				case "DELETE":
					return "/tipo/usuario/delete";

				default:
					return "";
			}

		case "Usuario":
			switch (accion) {
				case "CREATE":
					return "/usuario/create";

				case "READ":
					return "/usuarios";

				default:
					return "";
			}

		default:
			return "";
	}
};
