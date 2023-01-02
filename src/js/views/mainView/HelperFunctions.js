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

		default:
			return "";
	}
};
