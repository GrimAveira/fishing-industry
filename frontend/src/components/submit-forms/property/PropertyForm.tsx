import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./PropertyForm.module.css";
import PropertyService from "../../../api/PropertyService";

function addProperty(property: string) {
	return PropertyService.add(property);
}

function PropertyForm() {
	const [property, setProperty] = useState<string>("");

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setProperty(() => event.target.value);
	}

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationType.mutate(property);
	}

	const mutationType = useMutation({
		mutationFn: addProperty,
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
				label={"Характеристика резервуара"}
				value={property}
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

export default PropertyForm;
