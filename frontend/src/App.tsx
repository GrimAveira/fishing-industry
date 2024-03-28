import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginRoute from "./page/login/LoginRoute";
import RegistrationRoute from "./page/register/RegistrationRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function App() {
	return (
		<>
			{" "}
			<RouterProvider router={routerShell} />
			<ToastContainer />
		</>
	);
}

export default App;
