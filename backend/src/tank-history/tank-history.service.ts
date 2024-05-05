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
			const prev_value = await this.pg.query(
				`SELECT value, id FROM tank_history WHERE tank = '${tankID}' and attribute = '${attribute}' ORDER BY id DESC LIMIT 1`,
			);
			await this.pg.query(
				`INSERT INTO tank_history ("user", tank, date, attribute, value, prev_value) VALUES ('${user}', '${tankID}', '${date.toLocaleString("ru")}', '${attribute}', '${value}', '${prev_value.rows[0]?.value || 0}')`,
			);
		} catch (error) {
			console.log(error);
		}
	}
	async getView() {
		try {
			const view = await this.pg.query(`SELECT * from tank_history_view`);
			return view.rows;
		} catch (error) {
			console.log(error);
		}
	}
}
