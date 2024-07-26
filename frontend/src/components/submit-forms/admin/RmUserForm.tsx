import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./RmUserForm.module.css";
import CustomError from "../../custom-error/CustomError";
import Loader from "../../loader/Loader";
import SelectMui from "../../select-mui/SelectMui";
import UserService from "../../../api/UserService";

function patchWeight(user: string) {
	return UserService.delete(user);
}

function RmUserForm() {
	const { isError, isLoading, data } = useQuery({
		queryKey: ["users"],
		queryFn: () => UserService.getAll(),
	});

	const [user, setUser] = useState("");

	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setUser(event.target.value);
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationUser.mutate(user);
	}

	const mutationUser = useMutation({
		mutationFn: patchWeight,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (isError) return <CustomError description={`${isError}`} />;
	if (isLoading) return <Loader />;

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<SelectMui
				label="Пользователь"
				value={user}
				onChange={changeSelectHandler}
				items={data?.map(({ login, first_name, second_name, patronymic }) => ({
					value: login,
					label: `${login} ${second_name} ${first_name[0]}.${patronymic[0]}.`,
				}))}
			/>
			<MyButton>Деактивировать</MyButton>
		</form>
	);
}

export default RmUserForm;
