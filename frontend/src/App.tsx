import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./page/login/LoginRoute";
import RegistrationRoute from "./page/register/RegistrationRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, TLogin, TRole } from "./context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { promiseFail } from "./functions/toastTrigger";
import { IAuthInfo } from "./interfaces";
import UserService from "./api/UserService";
import HomeRoute from "./page/home/HomeRoute";
import CustomError from "./components/custom-error/CustomError";
import DataRoute from "./page/data/DataRoute";
import FishRoute from "./page/fish/FishRoute";
import TankRoute from "./page/tank/TankRoute";
import HistoryRoute from "./page/history/HistoryRoute";
import FishHistoryRoute from "./page/fish-history/FishHistoryRoute";
import TankHistoryRoute from "./page/tank-history/TankHistoryRoute";

const checkIsAuth = async () => {
	return await UserService.isAuth();
};

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [role, setRole] = useState<TRole>("");
	const [login, setLogin] = useState<TLogin>("");

	const notAuthRoutes = [
		{
			path: "/",
			element: <HomeRoute />,
		},
		{
			path: "/login",
			element: <LoginRoute />,
		},
		{
			path: "*",
			element: <CustomError description="Несуществующий путь" />,
		},
	];

	const authRoutes = [
		{
			path: "/registration",
			element:
				role == "1" ? <RegistrationRoute /> : <CustomError description="Несуществующий путь" />,
		},
		{
			path: "/data",
			element: <DataRoute />,
		},
		{
			path: "/data/fish",
			element: <FishRoute />,
		},
		{
			path: "/data/tank",
			element: <TankRoute />,
		},
		{
			path: "/editHistory",
			element: <HistoryRoute />,
		},
		{
			path: "/editHistory/fish",
			element: <FishHistoryRoute />,
		},
		{
			path: "/editHistory/tank",
			element: <TankHistoryRoute />,
		},
	];

	const mutationAuth = useMutation({
		mutationFn: checkIsAuth,
		onSuccess({ login, role }: IAuthInfo) {
			setIsAuth(true);
			setRole(role);
			setLogin(login);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		mutationAuth.mutate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth, role, login, setIsAuth, setRole, setLogin }}>
			<BrowserRouter basename="/">
				<Routes>
					{notAuthRoutes.map(({ path, element }) => {
						return <Route key={path} path={path} element={element} />;
					})}
					{isAuth &&
						authRoutes.map(({ path, element }) => {
							return <Route key={path} path={path} element={element} />;
						})}
				</Routes>
				<ToastContainer />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
