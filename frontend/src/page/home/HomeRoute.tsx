import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomLink from "../../components/custom-link/CustomLink";
import MainForm from "../../components/main-form/MainForm";
import styles from "./HomeRoute.module.css";

function HomeRoute() {
	const { role, isAuth } = useContext(AuthContext);

	if (!isAuth)
		return (
			<div className={styles.containter}>
				<div className={styles.form}>
					{" "}
					<p className={styles.p}>Необходимо войти в систему</p>
					<CustomLink href={"/login"}>Вход</CustomLink>
				</div>
			</div>
		);

	return (
		<MainForm>
			<CustomLink href={"/data"}>Добавить новые данные</CustomLink>
			<CustomLink href={"/editHistory"}>Вести учёт</CustomLink>
			<CustomLink href={"/viewHistory"}>Посмотреть историю</CustomLink>
			<CustomLink href={"/chart"}>Посмотреть график</CustomLink>
			{role == "1" && <CustomLink href={"/registration"}>Зарегистрировать</CustomLink>}
			<CustomLink onClick={() => console.log("exit")} href={"/"}>
				Выйти
			</CustomLink>
		</MainForm>
	);
}

export default HomeRoute;
