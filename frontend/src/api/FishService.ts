import axios from "axios";
import { IFishAdd, IFishFetch, IFishUpdate } from "../interfaces";
import { hostIp } from "../constants";

export default class RoleService {
	static async getAll() {
		try {
			const response = await axios.get<IFishFetch[]>(`http://${hostIp}:3000/api/fish`, {
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
	static async add(fish: IFishAdd) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/fish`, fish, {
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
	static async update(payload: IFishUpdate) {
		try {
			const response = await axios.patch(`http://${hostIp}:3000/api/fish`, payload, {
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
