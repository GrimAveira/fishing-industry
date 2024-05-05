import styles from "./CustomError.module.css";

function CustomError({ description }: { description: string }) {
	return (
		<div className={styles.exContainer}>
			<a className={styles.back} href="/">
				<img src="/back.png" />
			</a>
			<div className={styles.inContainer}>
				<h3>{description}</h3>
			</div>
		</div>
	);
}

export default CustomError;
