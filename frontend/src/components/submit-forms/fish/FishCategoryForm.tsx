import { SelectChangeEvent } from "@mui/material";
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
import WeightCategoryService from "../../../api/WeightCategoryService";

function updateFish(data: IFishUpdate) {
	return FishService.update({ ...data, attribute: "Весовая категория" });
}

function FishCategoryForm() {
	const {
		isError: isFishError,
		isLoading: isFishLoading,
		data: fishFetch,
	} = useQuery({
		queryKey: ["fish"],
		queryFn: () => FishService.getAll(),
	});
	const {
		isError: isCategoryError,
		isLoading: isCategoryLoading,
		data: categoriesFetch,
	} = useQuery({ queryKey: ["categories"], queryFn: () => WeightCategoryService.getAll() });

	const [fish, setFish] = useState<IFishUpdate>({
		id: "",
		value: "",
	});

	useEffect(() => {
		if (fishFetch && categoriesFetch) setFish((prev) => ({ ...prev, id: fishFetch[0].id }));
	}, [fishFetch, categoriesFetch]);
	useEffect(() => {
		if (fishFetch)
			setFish((prev) => ({
				...prev,
				value:
					fishFetch.find(({ category }) => {
						return category == fish.id;
					})?.category || "1",
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

	if (isCategoryError || isFishError)
		return <CustomError description={`${isCategoryError || isFishError}`} />;
	if (isCategoryLoading || isFishLoading) return <Loader />;

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
			label: "Весовая категория",
			name: "value",
			value: fish.value,
			items: categoriesFetch?.map(({ id, name, start_range, finish_range }) => ({
				value: id,
				label: `${name}: от ${start_range}кг до ${finish_range}кг`,
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

export default FishCategoryForm;
