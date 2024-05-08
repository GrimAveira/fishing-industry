import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./FishTankForm.module.css";
import { IFishUpdate } from "../../../interfaces";
import CustomError from "../../custom-error/CustomError";
import Loader from "../../loader/Loader";
import FishService from "../../../api/FishService";
import SelectMui from "../../select-mui/SelectMui";
import TankService from "../../../api/TankService";

function updateFish(data: IFishUpdate) {
	return FishService.update({ ...data, attribute: "Резервуар" });
}

function FishTankForm() {
	const {
		isError: isFishError,
		isLoading: isFishLoading,
		data: fishFetch,
	} = useQuery({
		queryKey: ["fish"],
		queryFn: () => FishService.getAll(),
	});

	const {
		isError: isTanksError,
		isLoading: isTanksLoading,
		data: tanksFetch,
	} = useQuery({ queryKey: ["tanks"], queryFn: () => TankService.getAll() });

	const [fish, setFish] = useState<IFishUpdate>({
		id: "",
		value: "",
	});

	useEffect(() => {
		if (fishFetch) setFish((prev) => ({ ...prev, id: fishFetch[0].id }));
	}, [fishFetch]);
	useEffect(() => {
		if (fishFetch)
			setFish((prev) => ({
				...prev,
				value:
					fishFetch.find(({ id }) => {
						return id == fish.id;
					})?.tank || "1",
			}));
	}, [fish.id, fishFetch]);

	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setFish((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationFish.mutate(fish);
	}

	const mutationFish = useMutation({
		mutationFn: updateFish,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (isTanksError || isFishError)
		return <CustomError description={`${isTanksError || isFishError}`} />;
	if (isTanksLoading || isFishLoading) return <Loader />;

	const selects = [
		{
			label: "ID Рыбы",
			name: "id",
			value: fish.id,
			items: fishFetch
				?.sort((a, b) => Number(a.id) - Number(b.id))
				.map(({ id }) => ({
					value: id,
					label: id || "",
				})),
		},
		{
			label: "Резервуар",
			name: "value",
			value: fish.value,
			items: tanksFetch?.map(({ id, name }) => ({
				value: id,
				label: name,
			})),
		},
	];

	return (
		<form className={styles.form} onSubmit={submitHandler}>
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
			<MyButton>Добавить</MyButton>
		</form>
	);
}

export default FishTankForm;
