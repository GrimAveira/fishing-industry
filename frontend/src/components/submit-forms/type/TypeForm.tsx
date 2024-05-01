import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import TypeService from "../../../api/TypeService";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./TypeForm.module.css";

function addType(type: string) {
	return TypeService.add(type);
}

function TypeForm() {
	const [type, setType] = useState<string>("");

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setType(() => event.target.value);
	}

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationType.mutate(type);
	}

	const mutationType = useMutation({
		mutationFn: addType,
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
				label={"Вид рыбы"}
				value={type}
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

export default TypeForm;
