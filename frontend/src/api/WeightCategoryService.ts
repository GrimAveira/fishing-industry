import axios from "axios";
import { IDataFetch, IWeightCatecoryPost } from "../interfaces";
import { hostIp } from "../constants";

export default class WeightCategoryService {
	// static async getAll() {
	// 	try {
	// 		const response = await axios.get<IDataFetch[]>(`http://${hostIp}:3000/api/role/all`);
	// 		return response.data;
	// 	} catch (error) {
	// 		if (axios.isAxiosError(error)) {
	// 			throw error.response?.data;
	// 		} else if (error instanceof Error) {
	// 			throw error.message;
	// 		}
	// 	}
	// }
	static async add(category: IWeightCatecoryPost) {
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
