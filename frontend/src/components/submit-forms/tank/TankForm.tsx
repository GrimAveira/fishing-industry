import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./TankForm.module.css";
import TankService from "../../../api/TankService";

function addTank(tank: string) {
	return TankService.add(tank);
}

function TankForm() {
	const [tank, setTank] = useState<string>("");

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setTank(() => event.target.value);
	}

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationTank.mutate(tank);
	}

	const mutationTank = useMutation({
		mutationFn: addTank,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<TextField
				label={"Название резервуара"}
				value={tank}
				inputProps={{
					pattern: "[а-яА-Я]{1,20}",
					title: "Поле может включать только символы кириллицы",
				}}
				onChange={changeHandler}
				required
				margin="normal"
			/>
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default TankForm;
