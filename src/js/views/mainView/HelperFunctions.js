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
	switch (tabla) {
		case "Ejemplar":
			if (accion == "CREATE") return "/ejemplar-create";
			return "/ejemplares";

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

		default:
			return "";
	}
};
