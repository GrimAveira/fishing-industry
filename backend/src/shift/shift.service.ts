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
}
