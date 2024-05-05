import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { RecordDTO } from "./dto/record.dto";

@Injectable()
export class FishHistoryService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add({ attribute, fishID, user, value }: RecordDTO) {
		try {
			const date = new Date();
			const prev_value = await this.pg.query(
				`SELECT value, id FROM fish_history WHERE fish = '${fishID}' and attribute = '${attribute}' ORDER BY id DESC LIMIT 1`,
			);
			await this.pg.query(
				`INSERT INTO fish_history ("user", fish, date, attribute, value, prev_value) VALUES ('${user}', '${fishID}', '${date.toLocaleString("ru")}', '${attribute}', '${value}', '${prev_value.rows[0]?.value || "Новая запись"}')`,
			);
		} catch (error) {
			console.log(error);
		}
	}
	async getView() {
		try {
			const view = await this.pg.query(`SELECT * from fish_history_view`);
			return view.rows;
		} catch (error) {
			console.log(error);
		}
	}
}
