import styles from "./TankRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import PropertyForm from "../../components/submit-forms/property/PropertyForm";
import TankForm from "../../components/submit-forms/tank/TankForm";

function TankRoute() {
	const [activeProperty, setProperty] = useState(false);
	const [activeTank, setTank] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setProperty((prev) => !prev)}>
				Добавить характеристику резервуара
			</MyButton>
			<MyButton className={styles.button} onClick={() => setTank((prev) => !prev)}>
				Добавить резервуар
			</MyButton>

			<ModalForm active={activeProperty} setActive={setProperty}>
				<PropertyForm />
			</ModalForm>
			<ModalForm active={activeTank} setActive={setTank}>
				<TankForm />
			</ModalForm>
		</MainForm>
	);
}

export default TankRoute;
