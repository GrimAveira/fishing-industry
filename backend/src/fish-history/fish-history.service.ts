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
			await this.pg.query(
				`INSERT INTO fish_history ("user", fish, date, attribute, value) VALUES ('${user}', '${fishID}', '${date.toLocaleString("ru")}', '${attribute}', '${value}')`,
			);
		} catch (error) {
			console.log(error);
		}
	}
}
