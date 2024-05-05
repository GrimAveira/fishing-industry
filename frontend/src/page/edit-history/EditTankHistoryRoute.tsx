import styles from "./EditTankHistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import TankAttributeForm from "../../components/submit-forms/tank/TankAttributeForm";

function EditTankHistoryRoute() {
	const [activeAttribute, setActiveAttribute] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setActiveAttribute((prev) => !prev)}>
				Добавить запись по характеристике
			</MyButton>
			<ModalForm active={activeAttribute} setActive={setActiveAttribute}>
				<TankAttributeForm />
			</ModalForm>
		</MainForm>
	);
}

export default EditTankHistoryRoute;
