import { HTMLAttributes } from "react";
import "../../constants/back.png";
import styles from "./MainForm.module.css";

function MainForm(props: HTMLAttributes<HTMLDivElement>) {
	const url = window.location.pathname
		.split("/")
		.slice(0, self.length - 1)
		.join("/");

	return (
		<div className={styles.containter}>
			<a className={styles.back} href={url || "/"}>
				<img src="/back.png" />
			</a>
			<div className={styles.form}>{props.children}</div>
		</div>
	);
}

export default MainForm;
