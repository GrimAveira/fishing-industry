import CustomLink from "../../components/custom-link/CustomLink";
import styles from "./EditHistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";

function EditHistoryRoute() {
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

export default EditHistoryRoute;
