import { useContext, useState } from "react";
import styles from "./LoginRoute.module.css";
import { IUserLoginData } from "../../interfaces";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";
import UserService from "../../api/UserService";
import MyButton from "../../components/button/MyButton";
import { AuthContext, TRole } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const loginUser = async (userData: IUserLoginData) => {
	return await UserService.login(userData);
};

function LoginRoute() {
	const [userData, setUserData] = useState<IUserLoginData>({
		login: "24512",
		password: "sgh24",
	});

	const navigate = useNavigate();

	const { setIsAuth, setRole, setLogin } = useContext(AuthContext);

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutationUser.mutate(userData);
	};

	const mutationUser = useMutation({
		mutationFn: loginUser,
		onSuccess(response: { login: string; role: TRole; message: string }) {
			promiseSuccess(response.message);
			setIsAuth(true);
			setRole(response.role);
			setLogin(response.login);
			navigate("/login");
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const textFields = [
		{
			label: "Табельный номер",
			name: "login",
			value: userData.login,
			inputProps: {
				pattern: "[0-9]{2,20}",
				title: "Табельный номер должен состоять из 2-20 цифр",
			},
		},
		{
			label: "Пароль",
			name: "password",
			value: userData.password,
			type: "password",
			inputProps: {
				pattern: "[0-9a-z]{4,30}",
				title: "Пароль должен состоять из 2-20 символов латинского алфавита и может включать цифры",
			},
		},
	];

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				{textFields.map((textField) => {
					return (
						<TextField
							{...textField}
							key={textField.name}
							onChange={changeInputHandler}
							required
							margin="normal"
						></TextField>
					);
				})}
				<MyButton className={styles.button}>Войти</MyButton>
			</form>
		</div>
	);
}

export default LoginRoute;
