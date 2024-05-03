import { useState } from "react";
import styles from "./RegistrationRoute.module.css";
import { IUserRegData } from "../../interfaces";
import { SelectChangeEvent, TextField } from "@mui/material";
import RoleService from "../../api/RoleService";
import { useMutation, useQuery } from "@tanstack/react-query";
import ShiftService from "../../api/ShiftService";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";
import UserService from "../../api/UserService";
import MyButton from "../../components/button/MyButton";
import CustomError from "../../components/custom-error/CustomError";
import Loader from "../../components/loader/Loader";
import SelectMui from "../../components/select-mui/SelectMui";

const createUser = async (userData: IUserRegData) => {
	return await UserService.registration(userData);
};

function RegistrationRoute() {
	const [userData, setUserData] = useState<IUserRegData>({
		login: "24512",
		password: "sgh24",
		confirmPassword: "sgh24",
		firstName: "Даниил",
		secondName: "Костючик",
		patronymic: "Юрьевич",
		role: "2",
		shift: "1",
	});

	const {
		isError: isRolesError,
		isLoading: isRolestLoading,
		data: rolesFetch,
	} = useQuery({ queryKey: ["roles"], queryFn: () => RoleService.getAll() });

	const {
		isError: isShiftsError,
		isLoading: isShiftsLoading,
		data: shiftsFetch,
	} = useQuery({ queryKey: ["shifts"], queryFn: () => ShiftService.getAll() });

	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};
	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setUserData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutationUser.mutate(userData);
	};

	const mutationUser = useMutation({
		mutationFn: createUser,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (isRolesError || isShiftsError)
		return <CustomError description={`${isRolesError || isShiftsError}`} />;
	if (isRolestLoading || isShiftsLoading) return <Loader />;

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
		{
			label: "Подтверждение пароля",
			name: "confirmPassword",
			value: userData.confirmPassword,
			type: "password",
			inputProps: {
				pattern: `${userData.password}`,
				title: "Поле должно совпадать с паролем",
			},
		},
		{
			label: "Имя",
			name: "firstName",
			value: userData.firstName,
			inputProps: {
				pattern: "[а-яА-Я]{2,20}",
				title: "Имя может включать только символы кириллицы и иметь длинну от 2 до 20 символов",
			},
		},
		{
			label: "Фамилия",
			name: "secondName",
			value: userData.secondName,
			inputProps: {
				pattern: "[а-яА-Я]{2,30}",
				title: "Фамилия может включать только символы кириллицы и иметь длинну от 2 до 30 символов",
			},
		},
		{
			label: "Отчество",
			name: "patronymic",
			value: userData.patronymic,
			inputProps: {
				pattern: "[а-яА-Я]{2,30}",
				title:
					"Отчество может включать только символы кириллицы и иметь длинну от 2 до 30 символов",
			},
		},
	];

	const selects = [
		{
			label: "Роль",
			name: "role",
			value: userData.role,
			items: rolesFetch?.map(({ id, name }) => ({ value: id, label: name })),
		},
		{
			label: "Смена",
			name: "shift",
			value: userData.shift,
			items: shiftsFetch?.map(({ id, time_start, time_end }) => ({
				value: id,
				label: `${time_start} - ${time_end}`,
			})),
		},
	];

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
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
				{selects.map(({ label, name, value, items }) => {
					return (
						<SelectMui
							key={name}
							label={label}
							name={name}
							value={value}
							items={items}
							onChange={changeSelectHandler}
						/>
					);
				})}
				<MyButton className={styles.button}>Зарегистрировать</MyButton>
			</form>
		</div>
	);
}

export default RegistrationRoute;
