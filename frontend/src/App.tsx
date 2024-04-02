import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const routerShell = createBrowserRouter([
	{
		path: "/login",
		element: <LoginRoute />,
	},
	{
		path: "/registration",
		element: <RegistrationRoute />,
	},
]);

const checkIsAuth = async () => {
	const data = await UserService.isAuth();
	return data;
};

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [role, setRole] = useState<TRole>("");
	const [login, setLogin] = useState<TLogin>("");

	const mutationAuth = useMutation({
		mutationFn: checkIsAuth,
		onSuccess(response: IAuthInfo) {
			setIsAuth(true);
			setRole(response.role);
			setLogin(response.login);
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
			<RouterProvider router={routerShell} />
			<ToastContainer />
		</AuthContext.Provider>
	);
}

export default App;
