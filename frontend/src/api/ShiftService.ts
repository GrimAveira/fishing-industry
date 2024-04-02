import axios from "axios";
import { IShiftFetch } from "../interfaces";
import { hostIp } from "../constants";

export default class ShiftService {
	static async getAll() {
		try {
			const response = await axios.get<IShiftFetch[]>(`http://${hostIp}:3000/api/shift/all`);
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
