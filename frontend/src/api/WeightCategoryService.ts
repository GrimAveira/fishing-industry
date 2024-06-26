import axios from "axios";
import { IWeightCategory } from "../interfaces";
import { hostIp } from "../constants";

export default class WeightCategoryService {
	static async getAll() {
		try {
			const response = await axios.get<IWeightCategory[]>(`http://${hostIp}:3000/api/category`, {
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
	static async add(category: IWeightCategory) {
		try {
			const response = await axios.post(
				`http://${hostIp}:3000/api/category`,
				{ category },
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
}
