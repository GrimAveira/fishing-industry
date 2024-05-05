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

	const {
		isError: isFishHistoryError,
		isLoading: isFishHistoryLoading,
		data: fishHistoryFetch,
	} = useQuery({
		queryKey: ["fishHistory"],
		queryFn: () => FishHistoryService.getAll(),
	});

	const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
		event.preventDefault();
		setPage(value);
	};

	useEffect(() => {
		if (fishHistoryFetch) setRecords(pagination(fishHistoryFetch));
	}, [fishHistoryFetch]);

	if (isFishHistoryError) return <CustomError description={`${isFishHistoryError}`} />;
	if (isFishHistoryLoading) return <Loader />;

	return (
		<MainForm>
			{records[page - 1]?.map(
				({ attribute, date, first_name, fish, id, patronymic, second_name, value, prev_value }) => {
					return attribute == "Масса" ? (
						<div className={styles.record} key={id}>
							<div className={styles.userInfo}>
								<p
									className={`${styles.p} ${styles.block}`}
								>{`${second_name} ${first_name[0]}.${patronymic[0]}.`}</p>
								<p className={`${styles.p} ${styles.block}`}>{` ${new Date(date).toLocaleDateString(
									"ru-RU",
								)}`}</p>
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
								<p className={`${styles.p} ${styles.block}`}>{` ${new Date(date).toLocaleDateString(
									"ru-RU",
								)}`}</p>
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
				count={Math.floor((fishHistoryFetch?.length || 1) / 6 + 1)}
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
				size="large"
				color="primary"
			/>
		</MainForm>
	);
}

export default FishHistoryForm;
