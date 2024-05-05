import axios from "axios";
import { IListProperty } from "../interfaces";
import { hostIp } from "../constants";

export default class ListPropertyService {
	static async getAll() {
		try {
			const response = await axios.get<IListProperty[]>(`http://${hostIp}:3000/api/list-property`, {
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
