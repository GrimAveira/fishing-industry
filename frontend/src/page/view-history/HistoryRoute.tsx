import CustomLink from "../../components/custom-link/CustomLink";
import styles from "./ViewHistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";

function ViewHistoryRoute() {
	return (
		<MainForm>
			<CustomLink className={styles.link} href={"history/fish"}>
				История по рыбам
			</CustomLink>
			<CustomLink className={styles.link} href={"history/tank"}>
				История по резервуарам
			</CustomLink>
		</MainForm>
	);
}

export default ViewHistoryRoute;
