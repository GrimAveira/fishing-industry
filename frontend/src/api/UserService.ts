import axios from "axios";
import { hostIp } from "../constants";
import { IUserFetch, IUserLoginData, IUserRegData } from "../interfaces/index";

export default class UserService {
	static async registration(data: IUserRegData) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/auth/registration`, data, {
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
	static async login(data: IUserLoginData) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/auth/login`, data, {
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
	static async logout() {
		try {
			const response = await axios.delete(`http://${hostIp}:3000/api/auth/logout`, {
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
	static async getAll() {
		try {
			const response = await axios.get<IUserFetch[]>(`http://${hostIp}:3000/api/user`, {
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
	static async delete(user: string) {
		try {
			const response = await axios.post(
				`http://${hostIp}:3000/api/user`,
				{ login: user },
				{
					withCredentials: true,
				},
			);
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
