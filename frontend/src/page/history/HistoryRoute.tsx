import CustomLink from "../../components/custom-link/CustomLink";
import styles from "./HistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";

function HistoryRoute() {
	return (
		<MainForm>
			<CustomLink className={styles.link} href={"editHistory/fish"}>
				Вести учёт по рыбам
			</CustomLink>
			<CustomLink className={styles.link} href={"editHistory/tank"}>
				Вести учёт по резервуарам
			</CustomLink>
		</MainForm>
	);
}

export default HistoryRoute;
