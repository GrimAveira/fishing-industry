import { useQuery } from "@tanstack/react-query";
import styles from "./TankHistoryForm.module.css";
import CustomError from "../custom-error/CustomError";
import Loader from "../loader/Loader";
import MainForm from "../main-form/MainForm";
import { useEffect, useState } from "react";
import { ITankHistory } from "../../interfaces";
import { Pagination } from "@mui/material";
import TankHistoryService from "../../api/TankHistoryService";
import { pagination } from "../../functions/pagination";

function TankHistoryForm() {
	const [page, setPage] = useState<number>(1);
	const [records, setRecords] = useState<ITankHistory[][]>([]);

	const {
		isError: isTankHistoryError,
		isLoading: isTankHistoryLoading,
		data: tankHistoryFetch,
	} = useQuery({
		queryKey: ["tankHistory"],
		queryFn: () => TankHistoryService.getAll(),
	});

	const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
		event.preventDefault();
		setPage(value);
	};

	useEffect(() => {
		if (tankHistoryFetch)
			setRecords(pagination(tankHistoryFetch.sort((a, b) => Number(a.id) - Number(b.id))));
	}, [tankHistoryFetch]);

	if (isTankHistoryError) return <CustomError description={`${isTankHistoryError}`} />;
	if (isTankHistoryLoading) return <Loader />;

	return (
		<MainForm>
			{records[page - 1]?.map(
				({ attribute, date, first_name, tank, id, patronymic, second_name, value, prev_value }) => {
					return (
						<div className={styles.record} key={id}>
							<div className={styles.userInfo}>
								<p
									className={`${styles.p} ${styles.block}`}
								>{`${second_name} ${first_name[0]}.${patronymic[0]}.`}</p>
								<p className={`${styles.p} ${styles.block}`}>{` ${new Date(date).toLocaleDateString(
									"ru-RU",
								)}`}</p>
							</div>
							<div className={styles.userInfo}>
								<p className={`${styles.p} ${styles.block}`}>{`Резервуар: ${tank}`}</p>
							</div>
							<div className={styles.userInfo}>
								<p className={`${styles.p} ${styles.block}`}>{`${attribute}`}</p>
								<p className={`${styles.p} ${styles.block}`}>
									{`${prev_value} » ${value} ${attribute == "Масса" ? "кг" : ""}`}
								</p>
							</div>
						</div>
					);
				},
			)}
			<Pagination
				className={styles.pagination}
				count={Math.floor((tankHistoryFetch?.length || 1) / 6 + 1)}
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

export default TankHistoryForm;
