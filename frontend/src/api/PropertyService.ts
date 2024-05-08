import axios from "axios";
import { IDataFetch, IPropertyAdd } from "../interfaces";
import { hostIp } from "../constants";

export default class PropertyService {
	static async getAll() {
		try {
			const response = await axios.get<IDataFetch[]>(`http://${hostIp}:3000/api/property`, {
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
	static async add(property: IPropertyAdd) {
		try {
			const response = await axios.post(
				`http://${hostIp}:3000/api/property`,
				{ property },
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
