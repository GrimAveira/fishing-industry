import CustomLink from "../../components/custom-link/CustomLink";
import styles from "./DataRoute.module.css";
import MainForm from "../../components/main-form/MainForm";

function DataRoute() {
	return (
		<MainForm>
			<CustomLink className={styles.link} href={"data/fish"}>
				Добавить данные по рыбам
			</CustomLink>
			<CustomLink className={styles.link} href={"data/tank"}>
				Добавить данные по резервуарам
			</CustomLink>
		</MainForm>
	);
}

export default DataRoute;
