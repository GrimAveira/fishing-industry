import axios from "axios";
import { hostIp } from "../constants";
import { IUserLoginData, IUserRegData } from "../interfaces/index";

export default class UserService {
	static async registration(data: IUserRegData) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/auth/registration`, data);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async login(data: IUserLoginData) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/auth/login`, data, {
				withCredentials: true,
			});
			console.log(response);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async isAuth() {
		try {
			const response = await axios.get(`http://${hostIp}:3000/api/auth/isAuth`, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
}
