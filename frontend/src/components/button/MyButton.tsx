import styles from "./MyButton.module.css";

function MyButton(props: React.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props} className={`${styles.button} ${props.className}`}>
			{props.children}
		</button>
	);
}

export default MyButton;
