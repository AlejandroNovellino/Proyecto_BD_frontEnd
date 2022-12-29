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
			if (accion == "CREATE") return "/entrenador-create";
			return "/entrenadores";

		case "Jinete":
			if (accion == "CREATE") return "/jinete-create";
			return "/jinetes";

		default:
			return "";
	}
};
