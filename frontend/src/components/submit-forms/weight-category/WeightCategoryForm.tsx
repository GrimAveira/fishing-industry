import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./WeightCategoryForm.module.css";
import WeightCategoryService from "../../../api/WeightCategoryService";
import { IWeightCategory } from "../../../interfaces";

function addCategory(category: IWeightCategory) {
	return WeightCategoryService.add(category);
}

function WeightCategoryForm() {
	const [category, setCategory] = useState<IWeightCategory>({
		name: "Первая категория",
		start_range: "1.0",
		finish_range: "2.0",
	});

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		setCategory((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationType.mutate(category);
	}

	const mutationType = useMutation({
		mutationFn: addCategory,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const inputs = [
		{
			label: "Название",
			name: "name",
			value: category.name,
			inputProps: {
				pattern: "[а-я А-Я]{1,20}",
				title: "Поле может включать от 1 до 20 символов кириллицы и пробелы",
			},
		},
		{
			label: "Начальное значение диапазона",
			name: "start_range",
			value: category.start_range,
			inputProps: {
				pattern: "^[0-9]{1,5}\\.[0-9]{1,5}$",
				title: "Запишите в формате: число.число (2.5)",
			},
		},
		{
			label: "Конечное значение диапазона",
			name: "finish_range",
			value: category.finish_range,
			inputProps: {
				pattern: "^[0-9]{1,5}\\.[0-9]{1,5}$",
				title: "Запишите в формате: число.число (2.5)",
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

export default WeightCategoryForm;
