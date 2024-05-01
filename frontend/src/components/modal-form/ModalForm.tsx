import { HTMLAttributes } from "react";
import styles from "./ModalForm.module.css";

interface IModal extends HTMLAttributes<HTMLDivElement> {
	active: boolean;
	setActive: (flag: boolean) => void;
}

function ModalForm(props: IModal) {
	const { active, setActive, children } = props;

	return (
		<div
			className={`${styles.modal} ${active ? styles.modalActive : ""}`}
			onMouseDown={() => {
				setActive(false);
			}}
		>
			<div
				className={`${styles.modal__content} ${active ? styles.modal__contentActive : ""}`}
				onMouseDown={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

export default ModalForm;
