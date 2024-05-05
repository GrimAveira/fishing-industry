import { SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./FishWeightForm.module.css";
import { IFishUpdate } from "../../../interfaces";
import CustomError from "../../custom-error/CustomError";
import Loader from "../../loader/Loader";
import FishService from "../../../api/FishService";
import SelectMui from "../../select-mui/SelectMui";

function patchWeight(data: IFishUpdate) {
	return FishService.update({ ...data, attribute: "Масса" });
}

function FishWeightForm() {
	const { isError, isLoading, data } = useQuery({
		queryKey: ["fish"],
		queryFn: () => FishService.getAll(),
	});

	const [fish, setFish] = useState<IFishUpdate>({
		id: "",
		value: "",
	});

	useEffect(() => {
		if (data) setFish((prev) => ({ ...prev, id: data[0].id }));
	}, [data]);
	useEffect(() => {
		if (data)
			setFish((prev) => ({
				...prev,
				value:
					data.find(({ id }) => {
						return id == fish.id;
					})?.weight || "1.0",
			}));
	}, [fish.id, data]);

	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setFish((prev) => ({ ...prev, id: event.target.value }));
	};
	const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setFish((prev) => ({ ...prev, value: event.target.value }));
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationFish.mutate(fish);
	}

	const mutationFish = useMutation({
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
				label="ID Рыбы"
				name="id"
				value={fish.id}
				onChange={changeSelectHandler}
				items={data
					?.sort((a, b) => Number(a.id) - Number(b.id))
					.map(({ id }) => ({
						value: id,
						label: id || "",
					}))}
			/>
			<TextField
				label={"Масса в килограммах"}
				value={fish.value}
				inputProps={{
					pattern: "^[0-9]{1,5}\\.[0-9]{1,5}$",
					title: "Запишите в формате: число.число (2.5)",
				}}
				onChange={changeInputHandler}
				required
				margin="normal"
			/>
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default FishWeightForm;
