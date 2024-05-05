import axios from "axios";
import { ITankHistory } from "../interfaces";
import { hostIp } from "../constants";

export default class TankHistoryService {
	static async getAll() {
		try {
			const response = await axios.get<ITankHistory[]>(`http://${hostIp}:3000/api/tank-history`);
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
