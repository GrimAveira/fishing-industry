import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { TankRecordDTO } from "./dto/tank-record.dto";

@Injectable()
export class TankHistoryService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add({ attribute, user, value, tankID }: TankRecordDTO) {
		try {
			const date = new Date();
			await this.pg.query(
				`INSERT INTO tank_history ("user", tank, date, attribute, value) VALUES ('${user}', '${tankID}', '${date.toLocaleString("ru")}', '${attribute}', '${value}')`,
			);
		} catch (error) {
			console.log(error);
		}
	}
}
