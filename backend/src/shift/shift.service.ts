import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { ShiftDTO } from "./dto/shift.dto";

@Injectable()
export class ShiftService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll(res: Response) {
		try {
			const shifts = await this.pg.query<ShiftDTO[]>(`SELECT * FROM shift`);
			return res.status(200).send(shifts.rows);
		} catch (error) {
			console.log(error);
		}
	}
	async addShift({ time_end, time_start }: ShiftDTO) {
		try {
			const isExists = await this.pg.query(
				`SELECT * FROM shift WHERE time_start = '${time_start}' and time_end = '${time_end}'`,
			);
			if (isExists.rowCount) return true;
			await this.pg.query(`INSERT INTO shift (time_start, time_end) VALUES ('${time_start}', '${time_end}')`);
			return false;
		} catch (error) {
			console.log(error);
		}
	}
}
