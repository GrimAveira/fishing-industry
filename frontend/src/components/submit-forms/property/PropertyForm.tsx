import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./PropertyForm.module.css";
import PropertyService from "../../../api/PropertyService";
import { IPropertyAdd } from "../../../interfaces";

function addProperty(property: IPropertyAdd) {
	return PropertyService.add(property);
}

function PropertyForm() {
	const [property, setProperty] = useState<IPropertyAdd>({ optimal_value: "", name: "" });

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setProperty((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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

	const inputs = [
		{
			label: "Характеристика резервуара",
			name: "name",
			value: property.name,
			inputProps: {
				pattern: "^[а-я А-Я]{1,20}$",
				title: "Поле может включать от 1 до 20 символов кириллицы и пробелы",
			},
		},
		{
			label: "Оптимальное значение",
			name: "optimal_value",
			value: property.optimal_value,
			inputProps: {
				pattern: "^[0-9]+\\.[0-9]+$",
				title: "Поле может включать от 1 до 20 символов кириллицы и пробелы",
			},
		},
	];

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			{inputs.map((textField) => {
				return (
					<TextField
						{...textField}
						key={textField.name}
						onChange={changeHandler}
						required
						margin="normal"
					></TextField>
				);
			})}
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default PropertyForm;
