import { toast } from "react-toastify";
import styles from "./toast.module.css";

export const promiseSuccess = (message: string) =>
	toast.success(message, {
		position: "bottom-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		className: styles.container,
	});

export const promiseFail = (message: string) =>
	toast.error(message, {
		position: "bottom-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		className: styles.container,
	});
