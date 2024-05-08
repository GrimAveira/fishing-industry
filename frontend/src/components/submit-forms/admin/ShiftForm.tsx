import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./ShiftForm.module.css";
import { IShiftAdd } from "../../../interfaces";
import ShiftService from "../../../api/ShiftService";

function patchWeight(shift: IShiftAdd) {
	return ShiftService.add(shift);
}

function ShiftForm() {
	const [shift, setShift] = useState<IShiftAdd>({
		time_start: "10:00:00",
		time_end: "12:00:00",
	});

	const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setShift((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationShift.mutate(shift);
	}

	const mutationShift = useMutation({
		mutationFn: patchWeight,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const textFields = [
		{
			label: "Начальное значение диапазона",
			name: "time_start",
			value: shift.time_start,
			inputProps: {
				pattern: "[0-9]{2}:[0-9]{2}:[0-9]{2}",
				title: "Запишите в формате 00:00:00",
			},
		},
		{
			label: "Начальное значение диапазона",
			name: "time_end",
			value: shift.time_end,
			inputProps: {
				pattern: "[0-9]{2}:[0-9]{2}:[0-9]{2}",
				title: "Запишите в формате 00:00:00",
			},
		},
	];

	return (
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
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default ShiftForm;
