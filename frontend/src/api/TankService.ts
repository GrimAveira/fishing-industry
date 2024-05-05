import axios from "axios";
import { IDataFetch, ITankUpdate } from "../interfaces";
import { hostIp } from "../constants";

export default class TankService {
	static async getAll() {
		try {
			const response = await axios.get<IDataFetch[]>(`http://${hostIp}:3000/api/tank`, {
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
	static async add(tank: string) {
		try {
			const response = await axios.post(
				`http://${hostIp}:3000/api/tank`,
				{ tank },
				{ withCredentials: true },
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
	static async update(payload: ITankUpdate) {
		try {
			const response = await axios.patch(`http://${hostIp}:3000/api/list-property`, payload, {
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
