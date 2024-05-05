import axios from "axios";
import { IFishHistory } from "../interfaces";
import { hostIp } from "../constants";

export default class FishHistoryService {
	static async getAll() {
		try {
			const response = await axios.get<IFishHistory[]>(`http://${hostIp}:3000/api/fish-history`);
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
