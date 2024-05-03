import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class ListPropertyService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add(tank: string, property: string) {
		try {
			await this.pg.query(`INSERT INTO list_property (tank, property) VALUES ('${tank}', '${property}')`);
		} catch (error) {
			console.log(error);
		}
	}
}
