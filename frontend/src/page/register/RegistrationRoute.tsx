import { useState } from "react";
import styles from "./RegistrationRoute.module.css";
import { UserRegData } from "../../interfaces";

function RegistrationRoute() {
	const [userData, setUserData] = useState<UserRegData>({
		firstName: "",
		login: "",
		password: "",
		patronymic: "",
		role: "1",
		secondName: "",
		shift: "1",
	});

	return (
		<div className={styles.container}>
			<form className={styles.form}></form>
		</div>
	);
}

export default RegistrationRoute;
