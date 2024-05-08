import { SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./FishForm.module.css";
import TankService from "../../../api/TankService";
import { IFishAdd } from "../../../interfaces";
import WeightCategoryService from "../../../api/WeightCategoryService";
import TypeService from "../../../api/TypeService";
import CustomError from "../../custom-error/CustomError";
import Loader from "../../loader/Loader";
import FishService from "../../../api/FishService";
import SelectMui from "../../select-mui/SelectMui";

function addFish(fish: IFishAdd) {
	return FishService.add(fish);
}

function FishForm() {
	const [fish, setFish] = useState<IFishAdd>({
		category: "1",
		tank: "1",
		type: "1",
		weight: "1.0",
		age: "0",
	});

	const {
		isError: isCategoryError,
		isLoading: isCategoryLoading,
		data: categoriesFetch,
	} = useQuery({ queryKey: ["categories"], queryFn: () => WeightCategoryService.getAll() });
	const {
		isError: isTanksError,
		isLoading: isTanksLoading,
		data: tanksFetch,
	} = useQuery({ queryKey: ["tanks"], queryFn: () => TankService.getAll() });
	const {
		isError: isTypesError,
		isLoading: isTypesLoading,
		data: typesFetch,
	} = useQuery({ queryKey: ["shifts"], queryFn: () => TypeService.getAll() });

	function changeInputHandler(event: ChangeEvent<HTMLInputElement>) {
		setFish((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}
	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setFish((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationFish.mutate(fish);
	}

	const mutationFish = useMutation({
		mutationFn: addFish,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (isCategoryError || isTypesError || isTanksError)
		return <CustomError description={`${isCategoryError || isTypesError || isTanksError}`} />;
	if (isCategoryLoading || isTypesLoading || isTanksLoading) return <Loader />;

	const inputs = [
		{
			label: "Масса в килограммах",
			name: "weight",
			value: fish.weight,
			inputProps: {
				pattern: "^[0-9]{1,5}\\.[0-9]{1,5}$",
				title: "Запишите в формате: число.число (2.5)",
			},
		},
		{
			label: "Возраст в днях",
			name: "age",
			value: fish.age,
			inputProps: {
				pattern: "^[0-9]{1,3}",
				title: "Поле включает может включать только от 1 до 3 символов цифр",
			},
		},
	];

	const selects = [
		{
			label: "Вид",
			name: "type",
			value: fish.type,
			items: typesFetch?.map(({ id, name }) => ({
				value: id,
				label: name,
			})),
		},
		{
			label: "Весовая категория",
			name: "category",
			value: fish.category,
			items: categoriesFetch?.map(({ id, name, start_range, finish_range }) => ({
				value: id,
				label: `${name}: от ${start_range}кг до ${finish_range}кг`,
			})),
		},
		{
			label: "Резервуар",
			name: "tank",
			value: fish.tank,
			items: tanksFetch?.map(({ id, name }) => ({
				value: id,
				label: `${name}`,
			})),
		},
	];

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			{inputs.map((textField) => {
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
						onChange={changeSelectHandler}
						items={items}
					/>
				);
			})}
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default FishForm;
