import styles from "./AdminRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import ShiftForm from "../../components/submit-forms/admin/ShiftForm";
import RegistrationForm from "../registratioin/RegistrationRoute";
import CustomLink from "../../components/custom-link/CustomLink";
import RmUserForm from "../../components/submit-forms/admin/RmUserForm";

function AdminRoute() {
	const [activeShift, setShift] = useState(false);
	const [activeAddUser, setAddUser] = useState(false);
	const [activeRmUser, setRmUser] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setShift((prev) => !prev)}>
				Добавить смену
			</MyButton>
			<CustomLink href="/admin/registration">Добавить пользователя</CustomLink>
			<MyButton className={styles.button} onClick={() => setRmUser((prev) => !prev)}>
				Деактивировать пользователя
			</MyButton>

			<ModalForm active={activeShift} setActive={setShift}>
				<ShiftForm />
			</ModalForm>
			<ModalForm active={activeAddUser} setActive={setAddUser}>
				<RegistrationForm />
			</ModalForm>
			<ModalForm active={activeRmUser} setActive={setRmUser}>
				<RmUserForm />
			</ModalForm>
		</MainForm>
	);
}

export default AdminRoute;
