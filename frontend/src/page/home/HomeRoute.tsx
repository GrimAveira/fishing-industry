import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomLink from "../../components/custom-link/CustomLink";
import MainForm from "../../components/main-form/MainForm";
import styles from "./HomeRoute.module.css";
import UserService from "../../api/UserService";
import { useMutation } from "@tanstack/react-query";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/button/MyButton";

async function logout() {
	return await UserService.logout();
}

function HomeRoute() {
	const { role, isAuth, setIsAuth, setLogin, setRole, isShift } = useContext(AuthContext);

	const navigator = useNavigate();

	const onExit = () => {
		mutationUser.mutate();
		setIsAuth(false);
		setLogin("");
		setRole("");
		navigator("/");
	};

	const mutationUser = useMutation({
		mutationFn: logout,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	if (!isAuth)
		return (
			<MainForm>
				<p className={styles.p}>Необходимо войти в систему</p>
				<CustomLink href={"/login"}>Вход</CustomLink>
			</MainForm>
		);

	return (
		<MainForm>
			{isShift ? (
				<>
					<CustomLink href={"/data"}>Добавить новые данные</CustomLink>
					<CustomLink href={"/editHistory"}>Вести учёт</CustomLink>
				</>
			) : (
				<>
					<MyButton
						onClick={() => {
							promiseFail("Ваша смена окончена");
						}}
					>
						Добавить новые данные
					</MyButton>
					<MyButton
						onClick={() => {
							promiseFail("Ваша смена окончена");
						}}
					>
						Вести учёт
					</MyButton>
				</>
			)}
			{isShift}
			<CustomLink href={"/history"}>Посмотреть историю</CustomLink>
			{role == "1" && <CustomLink href={"/admin"}>Админская панель</CustomLink>}
			<MyButton onClick={onExit}>Выйти</MyButton>
		</MainForm>
	);
}

export default HomeRoute;
