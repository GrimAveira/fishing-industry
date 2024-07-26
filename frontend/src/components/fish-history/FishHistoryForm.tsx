import { useQuery } from "@tanstack/react-query";
import styles from "./FishHistoryForm.module.css";
import CustomError from "../custom-error/CustomError";
import Loader from "../loader/Loader";
import FishHistoryService from "../../api/FishHistoryService";
import MainForm from "../main-form/MainForm";
import { useEffect, useState } from "react";
import { IFishHistory } from "../../interfaces";
import { Pagination } from "@mui/material";
import { pagination } from "../../functions/pagination";

function FishHistoryForm() {
	const [page, setPage] = useState<number>(1);
	const [records, setRecords] = useState<IFishHistory[][]>([]);
	const [fishHistory, setFishHistory] = useState<IFishHistory[]>([]);
	const [range, setRange] = useState<{ start: string; finish: string }>({ start: "", finish: "" });

	const {
		isError: isFishHistoryError,
		isLoading: isFishHistoryLoading,
		data: fishHistoryFetch,
	} = useQuery({
		queryKey: ["fishHistory"],
		queryFn: () => FishHistoryService.getAll(),
	});

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRange((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
		event.preventDefault();
		setPage(value);
	};

	const onFilter = () => {
		if (fishHistoryFetch)
			setFishHistory(
				fishHistoryFetch.filter((fish) => {
					let start = new Date(range.start);
					const fishDate = new Date(fish.date);
					let finish = new Date(range.finish);
					if (!range.start) start = new Date("01.01.2024");
					if (!range.finish) finish = new Date();
					return start <= fishDate && fishDate <= finish ? true : false;
				}),
			);
	};
	const onClear = () => {
		if (fishHistoryFetch) setFishHistory(fishHistoryFetch);
	};

	useEffect(() => {
		if (fishHistoryFetch) setFishHistory(fishHistoryFetch);
	}, [fishHistoryFetch]);
	useEffect(() => {
		setRecords(pagination(fishHistory.sort((a, b) => Number(a.id) - Number(b.id))));
	}, [fishHistory]);

	if (isFishHistoryError) return <CustomError description={`${isFishHistoryError}`} />;
	if (isFishHistoryLoading) return <Loader />;

	return (
		<>
			<div className={styles.filter}>
				<div className={styles.filterOptions}>
					<div>
						<label className={styles.filterLabel} htmlFor="start">
							От
						</label>
						<input onChange={inputHandler} type="date" id="start" name="start" />
					</div>
					<div>
						<label className={styles.filterLabel} htmlFor="finish">
							До
						</label>
						<input onChange={inputHandler} type="date" id="finish" name="finish" />
					</div>
				</div>
				<div className={styles.filterButtons}>
					<img className={styles.filterButton} src="/refresh.png" onClick={onClear} />
					<img className={styles.filterButton} src="/confirm.png" onClick={onFilter} />
				</div>
			</div>
			<MainForm>
				{records[page - 1]?.map(
					({
						attribute,
						date,
						first_name,
						fish,
						id,
						patronymic,
						second_name,
						value,
						prev_value,
					}) => {
						return attribute == "Масса" ? (
							<div className={styles.record} key={id}>
								<div className={styles.userInfo}>
									<p
										className={`${styles.p} ${styles.block}`}
									>{`${second_name} ${first_name[0]}.${patronymic[0]}.`}</p>
									<p className={`${styles.p} ${styles.block}`}>{` ${new Date(
										date,
									).toLocaleDateString("ru-RU")}`}</p>
									<p className={`${styles.p} ${styles.block}`}>{`Рыба: ${fish}`}</p>
								</div>
								<div className={styles.userInfo}>
									<p className={`${styles.p} ${styles.block}`}>{`${attribute}`}</p>
									<p className={`${styles.p} ${styles.block}`}>
										{`${prev_value || ""} » ${value} ${attribute == "Масса" ? "кг" : ""}`}
									</p>
								</div>
							</div>
						) : (
							<div className={styles.record} key={id}>
								{" "}
								<div className={styles.userInfo}>
									<p
										className={`${styles.p} ${styles.block}`}
									>{`${second_name} ${first_name[0]}.${patronymic[0]}.`}</p>
									<p className={`${styles.p} ${styles.block}`}>{` ${new Date(
										date,
									).toLocaleDateString("ru-RU")}`}</p>
								</div>
								<div className={styles.userInfo}>
									<p className={`${styles.p} ${styles.block}`}>{`Рыба: ${fish}`}</p>
									<p className={`${styles.p} ${styles.block}`}>{`${attribute}`}</p>
								</div>
								<div className={styles.userInfo}>
									<p className={`${styles.p} ${styles.block}`}>
										{`${prev_value || ""} » ${value} ${attribute == "Масса" ? "кг" : ""}`}
									</p>
								</div>
							</div>
						);
					},
				)}
				<Pagination
					className={styles.pagination}
					count={Math.ceil((fishHistory.length || 1) / 6)}
					sx={{
						".MuiPaginationItem-text": {
							color: "#ffffff !important",
						},
						".Mui-selected": {
							backgroundColor: "#0e1927 !important",
						},
						".Mui-selected:hover": {
							backgroundColor: "#8898a6 !important",
						},
					}}
					page={page}
					onChange={paginationHandler}
					size="medium"
					color="primary"
				/>
			</MainForm>
		</>
	);
}

export default FishHistoryForm;
