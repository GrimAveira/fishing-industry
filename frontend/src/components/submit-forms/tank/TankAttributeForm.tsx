import { SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import MyButton from "../../button/MyButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../../functions/toastTrigger";
import styles from "./TankAttributeForm.module.css";
import { ITankUpdate } from "../../../interfaces";
import CustomError from "../../custom-error/CustomError";
import Loader from "../../loader/Loader";
import SelectMui from "../../select-mui/SelectMui";
import TankService from "../../../api/TankService";
import PropertyService from "../../../api/PropertyService";
import ListPropertyService from "../../../api/ListPropertyService";

function updateTank(data: ITankUpdate) {
	return TankService.update(data);
}

function TankAttributeForm() {
	const {
		isError: isTanksError,
		isLoading: isTanksLoading,
		data: tanksFetch,
	} = useQuery({
		queryKey: ["tank"],
		queryFn: () => TankService.getAll(),
	});
	const {
		isError: isPropertiesError,
		isLoading: isPropertiesLoading,
		data: propertiesFetch,
	} = useQuery({ queryKey: ["properties"], queryFn: () => PropertyService.getAll() });
	const {
		isError: isListPropertiesError,
		isLoading: isListPropertiesLoading,
		data: listPropertiesFetch,
	} = useQuery({ queryKey: ["list-properties"], queryFn: () => ListPropertyService.getAll() });

	const [property, setProperty] = useState<ITankUpdate>({
		tankID: "",
		attributeID: "",
		value: "",
	});

	useEffect(() => {
		if (tanksFetch) setProperty((prev) => ({ ...prev, tankID: tanksFetch[0].id }));
	}, [tanksFetch]);
	useEffect(() => {
		if (propertiesFetch) setProperty((prev) => ({ ...prev, attributeID: propertiesFetch[0].id }));
	}, [propertiesFetch]);
	useEffect(() => {
		if (listPropertiesFetch)
			setProperty((prev) => ({
				...prev,
				value:
					listPropertiesFetch?.find((record) => {
						return record.tank == property.tankID && record.property == property.attributeID;
					})?.value || "",
			}));
	}, [property.tankID, property.attributeID, listPropertiesFetch]);

	const changeSelectHandler = (event: SelectChangeEvent<string>) => {
		setProperty((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};
	const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setProperty((prev) => ({ ...prev, value: event.target.value }));
	};

	function submitHandler(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		mutationTank.mutate(property);
	}

	const mutationTank = useMutation({
		mutationFn: updateTank,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (isPropertiesError || isTanksError || isListPropertiesError)
		return (
			<CustomError description={`${isPropertiesError || isTanksError || isListPropertiesError}`} />
		);
	if (isPropertiesLoading || isTanksLoading || isListPropertiesLoading) return <Loader />;

	const selects = [
		{
			label: "Резервуар",
			name: "tankID",
			value: property.tankID,
			items: tanksFetch
				?.sort((a, b) => Number(a.id) - Number(b.id))
				.map(({ id, name }) => ({
					value: id,
					label: name,
				})),
		},
		{
			label: "Характеристика",
			name: "attributeID",
			value: property.attributeID,
			items: propertiesFetch
				?.sort((a, b) => Number(a.id) - Number(b.id))
				.map(({ id, name }) => ({
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
			<TextField
				label={"Значение характеристики"}
				value={property.value}
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

export default TankAttributeForm;
